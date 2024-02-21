package logService

import (
	"atom24/definitions"
	"atom24/definitions/functionParameters"
	"atom24/definitions/globalConstants"
	"atom24/helpers/fmthelper"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"time"

	"github.com/sirupsen/logrus"
)

// Event stores messages to log later, from our standard interface
type Event struct {
	id      int
	message string
}

type logger struct {
	*logrus.Logger
}

// NewLogger initializes the standard logger
func ProvideLogger(connectionFactory definitions.ConnectionFactory, configService definitions.ConfigService) definitions.Logger {

	var logFolder = configService.GetCWD() + "Logs"
	newpath := filepath.Join(".", "Logs")
	//создадим каталог, если отсутствует
	err := os.Mkdir(newpath, os.ModePerm)

	var logPath = logFolder + string(os.PathSeparator) + "Logs.txt"
	f, err := os.OpenFile(logPath, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmthelper.WriteRedLine(fmt.Sprintf("error opening file: %v", err))
	}

	var baseLogger = logrus.New()
	var level = "info"
	var consoleWriter consoleWriter
	var dbWriter dbWriter
	dbWriter.factory = connectionFactory

	var multipleOutputWriter = io.MultiWriter(&consoleWriter, &dbWriter, f)
	baseLogger.SetOutput(multipleOutputWriter)

	var standardLogger = &logger{baseLogger}
	var configLevel = configService.GetStringKey("min-log-level")
	if configLevel == "" {
		fmthelper.WriteRedLine("\"min-log-level\" in configuration is empty")
	} else {
		level = configLevel
	}

	if level == globalConstants.LOG_LEVEL_DEBUG {
		baseLogger.SetLevel(logrus.DebugLevel)
	} else if level == globalConstants.LOG_LEVEL_INFO {
		baseLogger.SetLevel(logrus.InfoLevel)
	} else if level == globalConstants.LOG_LEVEL_WARN {
		baseLogger.SetLevel(logrus.WarnLevel)
	} else if level == globalConstants.LOG_LEVEL_ERROR {
		baseLogger.SetLevel(logrus.ErrorLevel)
	} else {
		fmthelper.WriteRedLine("\"min-log-level\" value couldn't find a match")
		baseLogger.SetLevel(logrus.InfoLevel)
	}

	standardLogger.Formatter = &logrus.JSONFormatter{}
	return standardLogger
}

func (logger *logger) Log(dto functionParameters.LogDTO) {
	var strToLog = ""
	var msg, err = json.Marshal(dto.Message)
	if err != nil {
		strToLog = err.Error()
	} else {
		strToLog = string(msg)
	}

	if dto.LogLevel == globalConstants.LOG_LEVEL_TRACE {
		logger.Trace(strToLog)
	}
	if dto.LogLevel == globalConstants.LOG_LEVEL_ERROR {
		logger.Error(strToLog)
	}
	if dto.LogLevel == globalConstants.LOG_LEVEL_DEBUG {
		logger.Debug(strToLog)
	}
	if dto.LogLevel == globalConstants.LOG_LEVEL_INFO {
		logger.Info(strToLog)
	}
	if dto.LogLevel == globalConstants.LOG_LEVEL_WARN {
		logger.Warn(strToLog)
	}
}

// Declare variables to store log messages as new Events
var (
	invalidArgMessage      = Event{1, "Invalid arg: %s"}
	invalidArgValueMessage = Event{2, "Invalid value for argument: %s: %v"}
	missingArgMessage      = Event{3, "Missing arg: %s"}
)

type consoleWriter struct {
}

func (mw *consoleWriter) Write(p []byte) (n int, err error) {
	var log logMessage
	var stringPresentation = string(p)
	json.Unmarshal([]byte(stringPresentation), &log)
	if log.Level == "error" {
		fmthelper.WriteRedLine(log.Message)
	} else {
		fmt.Println(log)
	}
	return len(p), nil
}

type dbWriter struct {
	factory definitions.ConnectionFactory
}
type logMessage struct {
	Time    time.Time `json:"time" db:"time"`
	Level   string    `json:"level" db:"level"`
	Message string    `json:"msg" db:"msg"`
}

func (dbWriter *dbWriter) Write(p []byte) (n int, err error) {
	var message logMessage
	var stringPresentation = string(p)
	json.Unmarshal([]byte(stringPresentation), &message)

	var sqlString = `
		insert into atom24.logging(d_time, s_level, s_message) values(:time, :level, :msg)
	`

	var conn = dbWriter.factory.GetConnection()
	nstmt, err := conn.PrepareNamed(sqlString)
	if err != nil {
		return len(p), err
	}
	_, err = nstmt.Exec(message)

	return len(p), err
}
