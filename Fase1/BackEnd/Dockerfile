FROM golang:1.16-alpine
WORKDIR /
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY *.go .
RUN go build -o /goBackend
EXPOSE 5000
CMD ["/goBackend"]

