import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Sensores from "./pages/sensores/sensores";
import Ambients from "./pages/ambients/ambient";
import Historic from "./pages/historic/historic";
import { Upload_ambients } from "./pages/upload/ambients/upload_ambients";
import { Upload_sensors } from "./pages/upload/sensores/sensores";

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/sensores" element={<Sensores/>}/>
        <Route path="/ambientes" element={<Ambients/>}/>
        <Route path="/historics" element={<Historic/>}/>
        <Route path="/upload_ambients" element={<Upload_ambients/>}/>
        <Route path="/upload_sensores" element={<Upload_sensors/>}/>
      </Routes>
    </Router>
  )
}