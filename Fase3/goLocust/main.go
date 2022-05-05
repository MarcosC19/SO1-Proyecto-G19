package main

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

const (
	DEFAULT_GAME        = 1
	DEFAULT_PLAYERS     = 10
	DEFAULT_CONCURRENCE = 10
	DEFAULT_RUNS        = 100
	DEFAULT_TIMEOUT     = 1

	PROCESS_START    = "# Traffic Generator, SOPES1, USAC 2022 - - - "
	COMMAND_RUNGAME  = "RUNGAME"
	COMMAND_SETHOST  = "SETHOST"
	COMMAND_SHOWHOST = "SHOWHOST"
	COMMAND_EXIT     = "EXIT"

	COMMAND_HELP      = "--HELP"
	PARAM_GAMESID     = "--GAMESID"
	PARAM_PLAYERS     = "--PLAYERS"
	PARAM_RUNGAMES    = "--RUNGAMES"
	PARAM_CONCURRENCE = "--CONCURRENCE"
	PARAM_TIMEOUT     = "--TIMEOUT"
)

var (
	HOST = "localhost"

	GAMES       [5]int32
	GAMESLEN    = 1
	PLAYERS     = DEFAULT_PLAYERS
	CONCURRENCE = DEFAULT_CONCURRENCE
	RUNS        = DEFAULT_RUNS
	TIMEOUT     = DEFAULT_TIMEOUT

	SUCCESS = 0
	FAILED  = 0
	RUNNING = false
)

func main() {
	GAMES[0] = DEFAULT_GAME
	commandReader := bufio.NewReader(os.Stdin)
	fmt.Println(PROCESS_START)
	for {
		input, _, err := commandReader.ReadLine()
		if err != nil {
			fmt.Println("# Error parsing the command: ", err)
			continue
		} else {
			command := string(input)
			command = strings.ToUpper(command)
			commands := strings.Split(command, " ")

			switch commands[0] {
			case COMMAND_RUNGAME:
				for i := 1; i < len(commands); i++ {
					if i+1 == len(commands) {
						break
					}
					if commands[i+1][0] == '-' {
						fmt.Println("Unexpected token [ - ] -> waiting option value")
						goto wrongCommand
					}
					parseCommand(commands[i], commands[i+1])
					i++
				}
				startTraffic()
			wrongCommand:
				break
			case COMMAND_SETHOST:
				if len(commands) > 1 {
					if len([]rune(commands[1])) == 0 {
						fmt.Println("Host cannot be empty string")
					} else {
						HOST = strings.ToLower(commands[1])
					}
				} else {
					fmt.Println("Error: Host name was expected sethost [VALUE]")
				}
				break
			case COMMAND_SHOWHOST:
				fmt.Println(fmt.Sprintf("HOST URL: http://%s", HOST))
				break
			case COMMAND_HELP:
				fmt.Println("TrafficGenerator: [COMMAND] [OPTION VALUE]+")
				fmt.Println("\t Commands:")
				fmt.Println("\t  sethost: set the host IP/domainname WITHOUT http/https NOR last /")
				fmt.Println("\t  showhost: prints the current host url (formatted)")
				fmt.Println("\t  rungame: starts the traffic generation to the server")
				fmt.Println("\t  --help: displays the command help")
				fmt.Println("")
				fmt.Println("\t Options:")
				fmt.Println("\t  --gamesid 1,2...5   [specify the IDs of the games]")
				fmt.Println("\t  --players 1...Inf   [specify the max number of players per game]")
				fmt.Println("\t  --rungames 1...Inf   [specify the total of requests to be placed]")
				fmt.Println("\t  --concurrence 1...Inf   [specify the number simultaneous requests]")
				fmt.Println("\t  --timeout 1...Inf   [specify the max waiting time before terminating the task]")
				fmt.Println("\t  --help: displays the command help")

			case COMMAND_EXIT:
				goto exitLabel
			default:
				fmt.Printf("TrafficGenerator: Unknown command [%s]\n type --help to check how it works", command)
				fmt.Println("")
			}
		}
	}

exitLabel:
	fmt.Println("Goodbye...")
}

func startTraffic() {

	ctx, cancel := context.WithCancel(context.Background())
	c1 := make(chan string, 1)

	RUNNING = true
	go requestLoop(ctx, c1)

	select {
	case <-c1:
		RUNNING = false
		cancel()
		break
	case <-time.After(time.Duration(20) * time.Second):
		RUNNING = false
		cancel()
		break
	}

	fmt.Println("Process done with:", FAILED+SUCCESS, "requests completed")
	fmt.Println("Success: ", (SUCCESS/(FAILED+SUCCESS))*100, "%")
	fmt.Println("Fail: ", (FAILED/(FAILED+SUCCESS))*100, "%")
}

func requestLoop(ctx context.Context, c1 chan string) {
	for i := 0; i < CONCURRENCE; i++ {
		go sendRequest(ctx, c1)
	}
}

func sendRequest(ctx context.Context, c1 chan string) {
	if FAILED+SUCCESS < RUNS {
		//randomGame and players
		gameId := rand.Intn(GAMESLEN-1) + 1
		players := rand.Intn(PLAYERS-1) + 1

		// Dummy Data
		dummy := map[string]interface{}{}
		jsonData, _ := json.Marshal(dummy)

		if RUNNING {
			fmt.Println("Request:", fmt.Sprintf("http://%s/gameid/%d/players/%d", HOST, gameId, players))
		}

		_, err := http.Post(fmt.Sprintf("http://%s/gameid/%d/players/%d", HOST, gameId, players), "application/json", bytes.NewBuffer(jsonData))

		select {
		case <-ctx.Done():
			return
		default:
		}

		if err != nil {
			FAILED++
		} else {
			SUCCESS++
		}

		if RUNNING {
			go sendRequest(ctx, c1)
		}
	} else {
		c1 <- "done"
	}
}

func parseCommand(param string, value string) {
	switch param {
	case PARAM_GAMESID:
		value = strings.ReplaceAll(value, ",", "")
		GAMESLEN = len([]rune(value))
		for x := 0; x < 5; x++ {
			if x >= GAMESLEN {
				GAMES[x] = -1
			} else {
				v, err := strconv.Atoi(string(value[x]))

				if err != nil {
					GAMES[x] = 1
				} else {
					if v < 6 {
						GAMES[x] = int32(v)
					}
				}
			}
		}
		break
	case PARAM_RUNGAMES:
		v, err := strconv.Atoi(value)
		if err != nil {
			fmt.Printf("Invalid rungames amount: [%s], default value will be used\n", value)
		} else {
			RUNS = v
		}
		break
	case PARAM_PLAYERS:
		v, err := strconv.Atoi(value)
		if err != nil {
			fmt.Printf("Invalid players amount: [%s], default value will be used\n", value)
		} else {
			PLAYERS = v
		}
		break
	case PARAM_CONCURRENCE:
		v, err := strconv.Atoi(value)
		if err != nil {
			fmt.Printf("Invalid concurrence amount: [%s], default value will be used\n", value)
		} else {
			CONCURRENCE = v
		}
		break
	case PARAM_TIMEOUT:
		v, err := strconv.Atoi(value)
		if err != nil {
			fmt.Printf("Invalid timeout amount: [%s], default value will be used\n", value)
		} else {
			TIMEOUT = v
		}
		break
	}
}
