import io from 'socket.io-client'

let socket = io(`http://${process.env.REACT_APP_IPHOST}:8080/getLogs`)

export default socket