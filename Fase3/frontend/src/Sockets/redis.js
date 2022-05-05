import io from 'socket.io-client'

let socketRedis = io(`http://${process.env.REACT_APP_IPAPI}:80/resultRedis`)

export default socketRedis