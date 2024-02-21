package configService

import (
	"atom24/definitions"
	"atom24/helpers/fmthelper"
	"bytes"
	"io/ioutil"
	"os"
	"strings"

	"github.com/spf13/viper"
)

type configurationService struct {
	cwdCached string
}

func ProvideConfigurationService() definitions.ConfigService {
	var configService configurationService

	var cwd, err = os.Getwd()
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
	}
	cwd = cwd + string(os.PathSeparator)
	configService.cwdCached = cwd

	configService.Initialize(cwd)
	return configService
}

// Для тестирования cwd меняется на файл тестирования, необходимо искать конфигурацию ниже
func ProvideConfigurationServiceForTesting() definitions.ConfigService {
	var configService configurationService

	var configurationFolder string

	var cwd, err = os.Getwd()
	if err != nil {
		panic(err)
	}
	var pathArray = strings.Split(cwd, string(os.PathSeparator))

	for i := range pathArray {
		configurationFolder = configurationFolder + pathArray[i] + string(os.PathSeparator)
		if pathArray[i] == "ServerApp" {
			break
		}
	}
	configService.cwdCached = configurationFolder

	configService.Initialize(configurationFolder)
	return configService
}
func (service configurationService) GetCWD() string {
	return service.cwdCached
}
func (service configurationService) GetTMP() string {
	var path = os.TempDir() + string(os.PathSeparator) + "atom24tmp"
	_, err := os.Stat(path)
	if os.IsNotExist(err) {
		err = os.Mkdir(path, os.ModePerm)
	}
	return path
}
func (service configurationService) Initialize(configurationPath string) {
	viper.SetConfigType("yaml")

	var mainConfigPath = configurationPath + "configuration.yaml"
	contents, err := ioutil.ReadFile(mainConfigPath)
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
	}

	var stringContents = string(contents)
	err = viper.ReadConfig(bytes.NewBuffer([]byte(stringContents)))
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
	}
}
func (service configurationService) GetStringKey(key string) string {
	return viper.GetString(key)
}
func (service configurationService) GetBoolKey(key string) bool {
	return viper.GetBool(key)
}
func (service configurationService) GetIntKey(key string) int64 {
	return viper.GetInt64(key)
}
func (service configurationService) IsLocalMode() bool {
	return viper.GetBool("local_mode")
}
