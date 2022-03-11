package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"

	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
)

var VM_NAME = getEnv("VM_NAME", "1")
var CLOUD_FUNCTION_SERVER = getEnv("CF_URL", "https://us-central1-sopes1-341821.cloudfunctions.net/insertomongo")

const MONGO_DB = "SO_Practica1"
const MONGO_COLLETION_NAME = "operations"

func main() {
	fmt.Println("GoBackEnd Running in port: ", 5000)
	app := fiber.New()
	app.Use(cors.New())
	app.Get("/getRAMstatus/", getRAMstatus)
	app.Get("/getCPUstatus/", getCPUstatus)
	app.Get("/status/", getServerStatus)
	app.Listen(5000)
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
}

func getServerStatus(c *fiber.Ctx) {
	c.Status(200).Send("ok")
}

func getRAMstatus(c *fiber.Ctx) {
	file, err := os.Open("/hostProc/ram_grupo19")

	if err != nil {
		fmt.Println("Error leyendo proc")
		c.Status(400).Send("Error leyendo proc: %s", err)
		return
	}

	defer file.Close()
	data, err := ioutil.ReadAll(file)

	dataStr := string(data)
	jsonResponse := "{\n\t\"vm\": " + VM_NAME + ",\n\t\"data\":" + dataStr + "\n}"
	VM_NAME_INT, sterr := strconv.Atoi(VM_NAME)
	if sterr != nil {
		VM_NAME_INT = 1
	}

	toCloud := map[string]interface{}{"LogType": "RAM", "LogOrigin": VM_NAME_INT, "LogContent": dataStr}
	json_data, err := json.Marshal(toCloud)

	if err != nil {
		fmt.Println("Error parsing the data to json for cloud...")
		return
	}

	_, cerr := http.Post(CLOUD_FUNCTION_SERVER, "application/json", bytes.NewBuffer(json_data))

	if cerr != nil {
		fmt.Println("Error sending request to CloudFunctions: ", cerr)
	}

	c.Status(200).Send(jsonResponse)
}

func getCPUstatus(c *fiber.Ctx) {
	file, err := os.Open("/hostProc/cpu_grupo19")

	if err != nil {
		fmt.Println("Error leyendo proc")
		c.Status(400).Send("Error leyendo proc: %s", err)
		return
	}

	defer file.Close()
	data, err := ioutil.ReadAll(file)
	dataStr := string(data)
	jsonResponse := "{\n\t\"vm\": " + VM_NAME + ",\n\t\"data\":" + dataStr + "\n}"
	VM_NAME_INT, sterr := strconv.Atoi(VM_NAME)
	if sterr != nil {
		VM_NAME_INT = 1
	}

	toCloud := map[string]interface{}{"LogType": "CPU", "LogOrigin": VM_NAME_INT, "LogContent": dataStr}
	json_data, err := json.Marshal(toCloud)

	if err != nil {
		fmt.Println("Error parsing the data to json for cloud...")
		return
	}

	_, cerr := http.Post(CLOUD_FUNCTION_SERVER, "application/json", bytes.NewBuffer(json_data))

	if cerr != nil {
		fmt.Println("Error sending request to CloudFunctions: ", cerr)
	}

	c.Status(200).Send(jsonResponse)
}
