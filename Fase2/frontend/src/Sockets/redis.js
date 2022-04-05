import io from 'socket.io-client'

let socketRedis = io(`http://localhost:8080/resultRedis`)

export default socketRedis