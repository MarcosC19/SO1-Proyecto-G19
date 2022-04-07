import io from 'socket.io-client'

let socketTidb = io(`${process.env.REACT_APP_IPAPI}/resultTiDB`)

export default socketTidb