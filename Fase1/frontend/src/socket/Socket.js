import io from 'socket.io-client'

let socket = io(`https://so1-proyecto-342902.uc.r.appspot.com/getLogs`)

export default socket