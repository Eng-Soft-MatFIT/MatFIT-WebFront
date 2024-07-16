import React, { useState, useEffect } from "react";
import "./Aluno.css";
import { AlunoService } from "../../service/AlunoService";
import {
  BsCashCoin,
  BsFillTrashFill,
  BsMenuButton,
  BsPencilSquare,
  BsPersonFillAdd,
} from "react-icons/bs";
import { User, UserResponse, UserUpdate } from "../../types/User";
import Menu from "../../components/Menu";
import CadastroModalAluno from "../../components/CadastroModalAluno";
import EditModalAluno from "../../components/EditModalAluno";
import PaymentModal from "../../components/PaymentModal";
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";

function Aluno() {
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunos, setAlunos] = useState<UserResponse[]>([]);
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [esporte, setEsporte] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    carregarAlunos();
  }, []);

  const alunoService = new AlunoService();

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      const response = await alunoService.findAllUsers();
      setAlunos(response);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarAluno = async (e: React.FormEvent) => {
    e.preventDefault();
    const aluno: User = { cpf, nome, esporte };

    setLoading(true);
    await alunoService.insertUser(aluno);
    setLoading(false);

    fecharModal();
    carregarAlunos();
  };

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => {
    setIsModalOpen(false);
    setCpf("");
    setNome("");
    setEsporte("");
  };

  const removerAluno = async (cpf: string) => {
    if (window.confirm("Você realmente quer remover este aluno?")) {
      setLoading(true);
      await alunoService.removeUser(cpf);
      setLoading(false);

      carregarAlunos();
    }
  };

  const abrirEditModal = (aluno: UserResponse) => {
    setSelectedAluno(aluno);
    setNome(aluno.nome);
    setEsporte(aluno.esporte);
    setIsEditModalOpen(true);
  };

  const fecharEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAluno(null);
    setNome("");
    setEsporte("");
  };

  const atualizarAluno = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAluno) {
      const alunoAtualizado: UserUpdate = { nome, esporte };
      setLoading(true);
      await alunoService.updateUser(selectedAluno.cpf, alunoAtualizado);
      setLoading(false);

      fecharEditModal();
      carregarAlunos();
    }
  };

  const abrirPaymentModal = async (aluno: UserResponse) => {
    const data = await alunoService.verifyPayment(aluno.cpf);
    if (data) {
      setSelectedAluno(aluno);
      setIsPaymentModalOpen(true);
    }
  };

  const fecharPaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedAluno(null);
  };

  const confirmarPagamento = async () => {
    if (selectedAluno) {
      if (!selectedAluno.pagamentoAtrasado) {
        alert("Seu pagamento está EM DIA");
        return;
      }

      setLoading(true);
      await alunoService.confirmPayment(selectedAluno.cpf);
      setLoading(false);
      fecharPaymentModal();
      carregarAlunos();
    }
  };

  const [menu, setMenu] = useState(false);

  function showLoading (){
    return <Loading />;
  }

  return (
    <div className="home">
      {menu && <Menu onClose={() => setMenu(false)} />}
      <div className="topo">
        <BsMenuButton className="btn-menu" onClick={() => setMenu(true)} />
        <span>Olá, {username}</span>
      </div>
      <div className="lista-alunos">
        <h2>Lista de Alunos</h2>
        <div className="aluno-grid">
          {alunos &&
            alunos.map((aluno) => (
              <div key={aluno.cpf} className="aluno-card">
                <div className="aluno-atributo">
                  <strong>CPF:</strong> {aluno.cpf}
                </div>
                <div className="aluno-atributo">
                  <strong>Nome:</strong> {aluno.nome}
                </div>
                <div className="aluno-atributo">
                  <strong>Esporte:</strong> {aluno.esporte}
                </div>
                <div className="aluno-atributo">
                  <strong>Data de Pagamento:</strong> {aluno.dataPagamento}
                </div>
                <div className="aluno-acoes">
                  <BsFillTrashFill
                    onClick={() => removerAluno(aluno.cpf)}
                    className="btn-acoes"
                  />
                  <BsPencilSquare
                    onClick={() => abrirEditModal(aluno)}
                    className="btn-acoes"
                  />
                  <BsCashCoin
                    onClick={() => abrirPaymentModal(aluno)}
                    className="btn-acoes"
                  />
                </div>
              </div>
            ))}

          {alunos && alunos.length === 0 && <NotFound title="Nenhum aluno cadastrado"/>}
        </div>
      </div>
      <div className="adicionar-aluno" onClick={abrirModal}>
        <BsPersonFillAdd />
      </div>
      {isModalOpen && (
        <CadastroModalAluno
          cpf={cpf}
          nome={nome}
          esporte={esporte}
          setCpf={setCpf}
          setNome={setNome}
          setEsporte={setEsporte}
          cadastrarAluno={cadastrarAluno}
          fecharModal={fecharModal}
        />
      )}
      {isEditModalOpen && (
        <EditModalAluno
          nome={nome}
          esporte={esporte}
          setNome={setNome}
          setEsporte={setEsporte}
          atualizarAluno={atualizarAluno}
          fecharEditModal={fecharEditModal}
        />
      )}
      {isPaymentModalOpen && selectedAluno && (
        <PaymentModal
          selectedAluno={selectedAluno}
          confirmarPagamento={confirmarPagamento}
          fecharPaymentModal={fecharPaymentModal}
        />
      )}
      {loading && showLoading()}
    </div>
  );
}

export default Aluno;
