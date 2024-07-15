import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './routes/login/Login.tsx'
import Home from './routes/home/Home.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index path='/'element={<Login />}/>
          <Route path='/home'element={<Home />}/>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
