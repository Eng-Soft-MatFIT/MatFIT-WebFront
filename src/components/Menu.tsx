import { useNavigate } from "react-router-dom";
import "./Menu.css";

interface MenuProps {
  onClose: () => void;
}

function Menu({ onClose }: MenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="menu">
      <div className="menu-close">
        <span className="icon-close" onClick={onClose}>
          X
        </span>
      </div>
      <div className="menu-dropdown">
        <button onClick={() => handleNavigation("/aluno")}>Aluno</button>
        <button onClick={() => handleNavigation("/equipamento")}>
          Equipamento
        </button>
        <button onClick={() => handleNavigation("/funcionario")}>
          Funcionário
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            handleNavigation("/");
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default Menu;
