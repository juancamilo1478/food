 
import { Route,Routes } from "react-router-dom";
import Indice from './components/indice/Indice'

import './App.css'
import Home from "./components/home/Home";



function App() {
 
  return (<div>
    <Routes>
    <Route path="/" element={<Indice/>} />
    <Route path="/home" element={<Home/>} />
    </Routes>
   
  </div>
     
  );
}

export default App;
