 
import { Route,Routes } from "react-router-dom";
import Indice from './components/indice/Indice'

import './App.css'
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
 import Form from "./components/form/Form";

function App() {
 
  return (<div>
    <Routes>
     <Route path="/form" element={<Form/>}/>
    <Route path="/" element={<Indice/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/detail/:id" element={<Detail/>} />
    </Routes>
   
  </div>
     
  );
}

export default App;
