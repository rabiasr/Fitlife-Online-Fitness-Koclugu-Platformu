// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kayit from './pages/Kayit';
import Giris from './pages/Giris';
import Home from './pages/Home';

import { Toaster } from 'react-hot-toast';
import Egzersiz from "./pages/Egzersiz";
import EgzersizDetay0 from './pages/EgzersizDetay0';
import EgzersizDetay1 from './pages/EgzersizDetay1';
import EgzersizDetay2 from './pages/EgzersizDetay2';
import Beslenme from "./pages/Beslenme";
import BeslenmeDetay0 from './pages/BeslenmeDetay0';
import BeslenmeDetay1 from './pages/BeslenmeDetay1';
 import BeslenmeDetay2 from './pages/BeslenmeDetay2';
import Sifre from './pages/Sifre';



function App() {
  return (
     <div>
  <Router>
       <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kayit" element={<Kayit />} />
          <Route path="/giris" element={<Giris />} />
          
          <Route path="/sifre" element={<Sifre/>}/>
          <Route path="/Egzersiz" element={<Egzersiz />} />
          <Route path="/EgzersizDetay/0" element={<EgzersizDetay0/>} />
          <Route path="/EgzersizDetay/1" element={<EgzersizDetay1/>} />
          <Route path="/EgzersizDetay/2" element={<EgzersizDetay2/>} />
          <Route path="/Beslenme" element={<Beslenme />} />
          <Route path="/BeslenmeDetay/0" element={<BeslenmeDetay0/>} />
          <Route path="/BeslenmeDetay/1" element={<BeslenmeDetay1/>} />
          <Route path="/BeslenmeDetay/2" element={<BeslenmeDetay2/>} />
        </Routes>
      </Router>
  

     </div>
    
  )
}

export default App;
