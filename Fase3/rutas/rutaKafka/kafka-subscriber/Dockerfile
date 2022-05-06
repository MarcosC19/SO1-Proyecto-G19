FROM golang:1.16.14-alpine

WORKDIR /

COPY go.mod go.sum ./

RUN go mod download

COPY . .

ENV HOSTIP_MONGO=35.222.117.133

ENV HOSTIP_REDIS=35.193.54.132

ENV HOSTIP_TIDB=34.68.145.193

ENV HOSTIP_KAFKA=host.docker.internal:9092

RUN go build -o /goConsumer

CMD ["/goConsumer"]
#docker build -t rocket1530/subscriber_kafka .