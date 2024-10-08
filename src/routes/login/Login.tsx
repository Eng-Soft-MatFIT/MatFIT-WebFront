import "./Login.css";
import weigth from "../../assets/peso-de-academia.png";
import {useNavigate} from "react-router-dom"
import { useLogin } from "../../hooks/useLogin";
import { useEffect } from "react";

interface User {
  username : string
}

function Login() {

  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useLogin();

  function loginUser(user : User){
    localStorage.setItem("username", user.username);
    navigate("/aluno");
  }

  useEffect(() => {
    const token : string | null = localStorage.getItem("username");

    if(token) {
      navigate("/aluno");
    }
  }, []);

  return (
    <form className="login" onSubmit={handleSubmit(loginUser)}>
      <h2>MatFIT</h2>

      <div className="login-container">
        <img src={weigth} alt="logo" width={150} height={150} />

        <div className="login-form">
          <span>Nome</span>
          <input
            type="text"
            placeholder="Digite seu nome"
            {...register("username")}
          />
          <p>{errors.username?.message}</p>
        </div>

        <button type="submit">
          Entrar
        </button>
      </div>
    </form>
  );
}

export default Login;
