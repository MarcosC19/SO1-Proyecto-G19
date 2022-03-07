// Package p contains an HTTP Cloud Function.
package p

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

const MONGO_USER = "mongotest" //"mongoadminG19"
const MONGO_PASS = "mongo1234" //"proyectof1g19"
const MONGO_HOST = "cluster0.7hnxv.mongodb.net"
const MONGO_PORT = "27017"

const MONGO_DB = "F1_ProyectoG19"
const MONGO_COLLETION_NAME = "registros"

type Log struct {
	LogType    string    `json:Logtype,omitempty`
	LogOrigin  int       `json:LogOrigin,omitempty`
	LogContent string    `json:LogContent,omitempty`
	Timestamp  time.Time `json:timestamp,omitempty`
}

func AddOperation(w http.ResponseWriter, r *http.Request) {

	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI("mongodb+srv://"+MONGO_USER+":"+MONGO_PASS+"@"+MONGO_HOST+"/?retryWrites=true&w=majority"))

	if err != nil {
		fmt.Println(err)
		return
	}

	err = client.Ping(context.Background(), readpref.Primary())

	if err != nil {
		fmt.Println(err)
		return
	}

	collection := client.Database(MONGO_DB).Collection(MONGO_COLLETION_NAME)

	if err != nil {
		fmt.Println(err)
		return
	}

	var newlog Log
	buf := new(bytes.Buffer)
	buf.ReadFrom(r.Body)
	str := buf.String()
	json.Unmarshal([]byte(str), &newlog)
	newlog.Timestamp = time.Now()

	res, err := collection.InsertOne(context.Background(), newlog)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Fprint(w, res)
	return
}
