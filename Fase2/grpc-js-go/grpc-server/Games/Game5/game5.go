package Game5

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

func startRoulette(players []int) int {
	var outPlayer = int(math.Round(rand.Float64() * float64(len(players)-1)))
	players = append(players[:outPlayer], players[outPlayer+1:]...)

	if len(players) == 1 {
		return players[0]
	}

	return startRoulette(players)
}

// JUEGO RULETA
func Roulette(players int) int {
	fmt.Println("Starting roulette for", players, "players")
	rand.Seed(time.Now().UTC().UnixNano())
	var playerList []int
	for i := 1; i <= players; i++ {
		playerList = append(playerList, i)
	}
	var winner = startRoulette(playerList)

	return winner
}
