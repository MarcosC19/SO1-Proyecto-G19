import './App.css';
import io from 'socket.io-client'
import { useEffect } from 'react'

function App() {

  const socket = io('http://localhost:5000')

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
