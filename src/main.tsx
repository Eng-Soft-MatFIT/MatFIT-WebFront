import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './routes/login/Login.tsx'
import Aluno from './routes/aluno/Aluno.tsx'
import Equipamento from './routes/equipamento/Equipamento.tsx'
import Funcionario from './routes/funcionario/Funcionario.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index path='/'element={<Login />}/>
          <Route path='/aluno'element={<Aluno />}/>
          <Route path='/equipamento'element={<Equipamento />}/>
          <Route path='/funcionario'element={<Funcionario />}/>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
