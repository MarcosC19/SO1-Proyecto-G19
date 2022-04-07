import io from 'socket.io-client'

let socketRedis = io(`${process.env.REACT_APP_IPAPI}/resultRedis`)

export default socketRedis