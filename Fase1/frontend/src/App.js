import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import RamPage from './pages/RamPage/RamPage'
import CpuPage from './pages/CpuPage/CpuPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/ramPage" element={<RamPage/>}/>
          <Route path="/cpuPage" element={<CpuPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
