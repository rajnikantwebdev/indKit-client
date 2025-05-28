import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import AuthenticationPage from './component/Login.jsx';
import Dashboard from './component/Dashboard.jsx';
import RegisterPage from './component/Register.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/login' element={<AuthenticationPage/>}/>
      <Route path='/dashboard' element={<Dashboard/> }/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
