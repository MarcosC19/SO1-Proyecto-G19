package TiDB

import (
	"database/sql"
	"os"

	"github.com/MarcosC19/SO1-Proyecto-G19/Fase2/grpc-js-go/kafka-subscriber/Mongo"
	_ "github.com/go-sql-driver/mysql"
)

func SavetiDB(logsData Mongo.Logs) {
	host, defined := os.LookupEnv("HOSTIP_TIDB")
	if !defined {
		host = "localhost"
	}
	db, err := sql.Open("mysql", "grupo19:grupo19-f2@tcp("+host+")/sopes1f2")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	insert, err := db.Prepare("INSERT INTO fase2(game_id, players, game_name, winner, queue) VALUES(?, ?, ?, ?, ?)")

	if err != nil {
		panic(err.Error())
	}

	insert.Exec(int(logsData.Game_id), int(logsData.Players), logsData.Game_name, int(logsData.Winner), logsData.Queue)

	defer insert.Close()

}
