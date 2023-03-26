 
import { Route,Routes } from "react-router-dom";
import Indice from './components/indice/Indice'

import './App.css'
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";


function App() {
 
  return (<div>
    <Routes>
    <Route path="/" element={<Indice/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/detail/:id" element={<Detail/>} />
    </Routes>
   
  </div>
     
  );
}

export default App;
