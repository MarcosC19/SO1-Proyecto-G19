package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
)

var MONGO_USER = getEnv("MONGO_USER", "userp1")
var MONGO_PASS = getEnv("MONGO_PASS", "userp1password")
var MONGO_HOST = getEnv("MONGO_HOST", "192.168.1.12")
var MONGO_PORT = getEnv("MONGO_PORT", "27017")

const MONGO_DB = "SO_Practica1"
const MONGO_COLLETION_NAME = "operations"

type Operation struct {
	Left      float64   `json:left,omitempty`
	Right     float64   `json:right,omitempty`
	Operator  string    `json:operator,omitempty`
	Timestamp time.Time `json:timestamp,omitempty`
}

func main() {
	fmt.Println("GoBackEnd Running in port: ", 5000)
	app := fiber.New()
	app.Use(cors.New())
	app.Get("/getRAMstatus/", getRAMstatus)
	app.Get("/getCPUstatus/", getCPUstatus)
	app.Listen(5000)
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
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
	c.Status(200).Send(data)
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
	c.Status(200).Send(data)
}
