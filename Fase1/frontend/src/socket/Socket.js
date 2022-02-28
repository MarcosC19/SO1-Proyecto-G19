import io from 'socket.io-client'

let socket = io(`http://${process.env.REACT_APP_IPHOST}:5000`)

export default socket