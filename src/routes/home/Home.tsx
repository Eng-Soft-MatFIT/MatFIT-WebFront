import { useState, useEffect } from 'react';
import './Home.css';
import { AlunoService } from '../../service/AlunoService';
import { BsCashCoin, BsFillTrashFill, BsPencilSquare, BsPersonFillAdd } from 'react-icons/bs';
import { User, UserResponse, UserUpdate } from '../../types/User';

function Home() {
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunos, setAlunos] = useState<UserResponse[]>([]);
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [esporte, setEsporte] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<UserResponse | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    carregarAlunos();
  }, []);

  const alunoService = new AlunoService();

  const carregarAlunos = async () => {
    try {
      const response = await alunoService.findAllUsers();
      setAlunos(response);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  const cadastrarAluno = async () => {
    const aluno: User = {
      cpf: cpf,
      nome: nome,
      esporte: esporte,
    };
    await alunoService.insertUser(aluno);
    fecharModal();
    carregarAlunos();
  };

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setCpf('');
    setNome('');
    setEsporte('');
  };

  const removerAluno = async (cpf: string) => {
    if (window.confirm('Você realmente quer remover este aluno?')) {
      await alunoService.removeUser(cpf);
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
    setNome('');
    setEsporte('');
  };

  const atualizarAluno = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAluno) {
      const alunoAtualizado: UserUpdate = {
        nome: nome,
        esporte: esporte,
      };
      await alunoService.updateUser(selectedAluno.cpf, alunoAtualizado);
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
      if(!selectedAluno.pagamentoAtrasado) {
        alert("Seu pagamento está EM DIA")
        return;
      }
      await alunoService.confirmPayment(selectedAluno.cpf);
      fecharPaymentModal();
      carregarAlunos();
    }
  };

  return (
    <div className='home'>
      <div className='topo'>
        <span>Olá, {username}</span>
      </div>
      <div className='menu-icon' onClick={() => alert('Menu aberto!')}>
        <i className='fa fa-bars'></i>
      </div>
      <div className='lista-alunos'>
        <h2>Lista de Alunos</h2>
        <div className='aluno-grid'>
          {alunos && alunos.map((aluno) => (
            <div key={aluno.cpf} className='aluno-card'>
              <div className='aluno-atributo'>
                <strong>CPF:</strong> {aluno.cpf}
              </div>
              <div className='aluno-atributo'>
                <strong>Nome:</strong> {aluno.nome}
              </div>
              <div className='aluno-atributo'>
                <strong>Esporte:</strong> {aluno.esporte}
              </div>
              <div className='aluno-atributo'>
                <strong>Data de Pagamento:</strong> {aluno.dataPagamento}
              </div>
              <div className='aluno-acoes'>
                <BsFillTrashFill onClick={() => removerAluno(aluno.cpf)} className='btn-acoes'/>
                <BsPencilSquare onClick={() => abrirEditModal(aluno)} className='btn-acoes'/>
                <BsCashCoin onClick={() => abrirPaymentModal(aluno)} className='btn-acoes'/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='adicionar-aluno' onClick={abrirModal}>
        <BsPersonFillAdd />
      </div>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={fecharModal}>&times;</span>
            <h2>Cadastrar Aluno</h2>
            <form onSubmit={cadastrarAluno}>
              <label>CPF:</label>
              <input type='text' value={cpf} onChange={(e) => setCpf(e.target.value)} required />
              <label>Nome:</label>
              <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
              <label>Esporte:</label>
              <input type='text' value={esporte} onChange={(e) => setEsporte(e.target.value)} required />
              <div className='button-container'>
                <button type='button' onClick={fecharModal}>Cancelar</button>
                <button type='submit'>Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={fecharEditModal}>&times;</span>
            <h2>Atualizar Aluno</h2>
            <form onSubmit={atualizarAluno}>
              <label>Nome:</label>
              <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
              <label>Esporte:</label>
              <input type='text' value={esporte} onChange={(e) => setEsporte(e.target.value)} required />
              <div className='button-container'>
                <button type='button' onClick={fecharEditModal}>Cancelar</button>
                <button type='submit'>Atualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isPaymentModalOpen && selectedAluno && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={fecharPaymentModal}>&times;</span>
            <h2>Confirmar Pagamento</h2>
            <div className='aluno-atributo'>
              <strong>CPF:</strong> {selectedAluno.cpf}
            </div>
            <div className='aluno-atributo'>
              <strong>Nome:</strong> {selectedAluno.nome}
            </div>
            <div className='aluno-atributo'>
              <strong>Esporte:</strong> {selectedAluno.esporte}
            </div>
            <div className='aluno-atributo'>
              <strong>Data do Pagamento:</strong> {selectedAluno.dataPagamento}
            </div>
            <div className='aluno-atributo'>
              <strong>Status:</strong> {selectedAluno.pagamentoAtrasado ? <span>ATRASADO</span> : <span>EM DIA</span>}
            </div>
            <div className='button-container'>
              <button type='button' onClick={fecharPaymentModal}>Cancelar</button>
              <button type='button' onClick={confirmarPagamento}>Pagar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;