import io from 'socket.io-client'

let socketTidb = io(`https://so1-proyecto-342902.uc.r.appspot.com/resultTiDB`)

export default socketTidb