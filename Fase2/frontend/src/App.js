import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Redis from './pages/Redis';
import TiDB from './pages/TiDB'
import Logs from './pages/Logs'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/resultsRedis' element={<Redis/>}/>
          <Route path='/resultsTiDB' element={<TiDB/>}/>
          <Route path='/logs' element={<Logs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
