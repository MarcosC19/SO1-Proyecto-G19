import io from 'socket.io-client'

let socketRedis = io(`https://so1-proyecto-342902.uc.r.appspot.com/resultRedis`)

export default socketRedis