package Game2

import (
	"math/rand"
	"time"

	"github.com/MarcosC19/SO1-Proyecto-G19/Fase2/grpc-js-go/grpc-server/Games/helpers"
)

// JUEGO CARA O ESCUDO
func Flip(players int) int {
	rand.Seed(time.Now().UTC().UnixNano())
	var playerList []int
	for i := 1; i <= players; i++ {
		playerList = append(playerList, i)
	}
	var list = helpers.PairPlayers(playerList, 2)
	var winner = helpers.ProcessPairsFlip(list)
	return winner
}
