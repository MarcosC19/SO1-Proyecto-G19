import io from 'socket.io-client'

let socketTidb = io(`http://localhost:8080/resultTiDB`)

export default socketTidb