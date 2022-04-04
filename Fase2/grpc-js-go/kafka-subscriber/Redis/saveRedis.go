package Redis

import (
	"context"
	"fmt"
	"os"

	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()

func SaveRedis(logsData string) {
	host := os.Getenv("HOSTIP_REDIS")

	if len(host) == 0 {
		host = "localhost"
	}
	rdb := redis.NewClient(&redis.Options{
		Addr:     string(host) + ":6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	val, err := rdb.Do(ctx, "keys", "*").StringSlice()
	if err != nil {
		panic(err)
	}

	var cont = len(val)

	var keyName = fmt.Sprint("result", cont)

	err = rdb.Set(ctx, keyName, logsData, 0).Err()
	if err != nil {
		panic(err)
	}
}
