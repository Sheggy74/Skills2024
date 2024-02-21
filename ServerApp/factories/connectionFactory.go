package factories

import (
	"atom24/definitions"
	"atom24/helpers/fmthelper"
	"context"
	"strconv"
	"strings"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	_ "github.com/lib/pq/auth/kerberos"
)

type connectionFactory struct {
	DB            *sqlx.DB
	configService definitions.ConfigService
}

var mcLabel int = 0

func ProvideConnectionFactory(configServiceLocal definitions.ConfigService) definitions.ConnectionFactory {
	var factory connectionFactory
	factory.configService = configServiceLocal

	var connectionString = configServiceLocal.GetStringKey("connection-string")
	if connectionString == "" {
		fmthelper.WriteRedLine("connection-string empty")
	}

	db, err := sqlx.Open("postgres", connectionString)
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
	}
	db = db.Unsafe()
	db.SetMaxOpenConns(100)

	var result int

	err = db.Get(&result, `select 1`)
	if err != nil {
		fmthelper.WriteRedLine("Unable to select 1 from opened connection: " + err.Error())
	}

	var mcLabelString string
	err = db.Get(&mcLabelString, `select current_setting('ac_session_maclabel')`)
	if err != nil {
		if strings.Contains(err.Error(), "нераспознанный параметр конфигурации") {
			mcLabel = 0
		} else {
			mcLabel, err = strconv.Atoi(mcLabelString[1:1])
			if err != nil {
				fmthelper.WriteErrorToFMT(err)
			}
		}
	} else {
		fmthelper.WriteErrorToFMT(err)
	}

	factory.DB = db
	return factory
}

func (c connectionFactory) GetConnection() *sqlx.DB {
	return c.DB
}

func (c connectionFactory) GetMacLabel() int {
	return mcLabel
}
func (c connectionFactory) CreateTxx() (*sqlx.Tx, error) {
	var ctx = context.TODO()
	var conn = c.GetConnection()
	tx, err := conn.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}
	return tx, err
}
