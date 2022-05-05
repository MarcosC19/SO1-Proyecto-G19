import io from 'socket.io-client'

let socketTidb = io(`http://${process.env.REACT_APP_IPAPI}:80/resultTiDB`)

export default socketTidb