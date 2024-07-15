import "./Login.css";
import weigth from "../../assets/peso-de-academia.png";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

function Login() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function loginUser(){
    localStorage.setItem("username", name);
    navigate("/home");
  }
  return (
    <div className="login">
      <h2>Login</h2>

      <div className="login-container">
        <img src={weigth} alt="logo" width={150} height={150} />

        <div className="login-form">
          <span>Nome</span>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="button" onClick={loginUser}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
