package bDataService

import (
	"atom24/definitions"
	"atom24/definitions/functionParameters"
	"bytes"
	"errors"
	"image"
	"image/png"
	"io/ioutil"
	"strings"

	"github.com/nfnt/resize"
)

type bDataService struct {
	connectionFactory definitions.ConnectionFactory
}

// NewLogger initializes the standard logger
func ProvideBDataService(cf definitions.ConnectionFactory) definitions.BDataService {
	var service bDataService
	service.connectionFactory = cf
	return service
}
func (service bDataService) UploadFile(dto functionParameters.UploadFileDTO) error {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	if dto.ID.Valid == false {
		return errors.New("invalid ID")
	}

	// extracting byte data
	fileContent, err := dto.File.Open()
	if err != nil {
		return err
	}
	defer fileContent.Close()
	buffer, err := ioutil.ReadAll(fileContent) // you may want to handle the error
	if err != nil {
		return err
	}
	//
	lowQualityBuffer, err := service.getLowQualityIfImage(dto.File.Filename, buffer)
	if err != nil {
		return err
	}

	var args = map[string]interface{}{
		"id":             dto.ID,
		"data":           buffer,
		"name":           dto.File.Filename,
		"lowQualityData": lowQualityBuffer,
	}

	var query = `insert into pff07.big_data(id, b_data,s_name, b_low_quality_data) values(:id, :data, :name, :lowQualityData)`

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return err
	}
	_, err = nstmt.Exec(args)

	return err
}
func (service bDataService) getLowQualityIfImage(fileName string, buffer []byte) ([]byte, error) {
	var smallImageByteArray []byte
	var extension = service.getExtension(fileName)
	if service.isImageExtension(extension) == false {
		return smallImageByteArray, nil
	}

	image, _, err := image.Decode(bytes.NewReader(buffer))
	if err != nil {
		return smallImageByteArray, err
	}
	newImage := resize.Resize(50, 50, image, resize.Bicubic)

	var smallImageBuffer = bytes.NewBuffer(smallImageByteArray)
	err = png.Encode(smallImageBuffer, newImage)
	if err != nil {
		return smallImageByteArray, err
	}
	smallImageByteArray = smallImageBuffer.Bytes()
	// Если не уменьшилось
	if len(smallImageByteArray) > len(buffer) {
		return buffer, nil
	}
	return smallImageByteArray, err
}
func (service bDataService) isImageExtension(extension string) bool {
	var imageExtensions []string = []string{"jpg", "png", "jpeg"}

	for _, value := range imageExtensions {
		if value == extension {
			return true
		}
	}
	return false
}
func (service bDataService) getExtension(fileName string) string {
	if strings.Contains(fileName, ".") == false {
		return ""
	}
	var extensionArray = strings.Split(fileName, ".")
	return strings.ToLower(extensionArray[len(extensionArray)-1])
}
