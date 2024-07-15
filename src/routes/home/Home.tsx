import React, { useState, useEffect } from 'react';
import './Home.css';
import { AlunoService } from '../../service/AlunoService';
import { BsPersonFillAdd } from 'react-icons/bs';
import { User } from '../../types/User';

function Home() {
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunos, setAlunos] = useState<User[]>([]); // Estado para armazenar a lista de alunos
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [esporte, setEsporte] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    carregarAlunos(); // Carrega a lista de alunos ao carregar a página inicial
  }, []);

  const alunoService = new AlunoService();

  const carregarAlunos = async () => {
    try {
      const response = await alunoService.findAllUsers(); // Chama o método da service para buscar os alunos
      setAlunos(response); // Atualiza o estado 'alunos' com os dados recebidos da API
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  const cadastrarAluno = () => {
    const aluno: User = {
      cpf: cpf,
      nome: nome,
      esporte: esporte,
      dataPagamento: dataPagamento
    };
    alunoService.insertUser(aluno);
    fecharModal();
    carregarAlunos(); // Recarrega a lista de alunos após cadastrar um novo aluno
  };

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    // Limpar os campos do modal ao fechar
    setCpf('');
    setNome('');
    setEsporte('');
    setDataPagamento('');
  };

  return (
    <div className='home'>
      {/* Topo da tela com o nome de usuário */}
      <div className='topo'>
        <span>Olá, {username}</span>
      </div>

      {/* Ícone de menu no lado esquerdo */}
      <div className='menu-icon' onClick={() => alert('Menu aberto!')}>
        <i className='fa fa-bars'></i>
      </div>

      {/* Lista de alunos */}
      <div className='lista-alunos'>
        <h2>Lista de Alunos</h2>
        <div>
          {alunos && alunos.map((aluno) => (
            <div key={aluno.cpf}>
              <span>{aluno.cpf}</span>
              <span>{aluno.nome}</span>
              <span>{aluno.esporte}</span>
              <span>{aluno.dataPagamento}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ícone de adicionar aluno na parte inferior */}
      <div className='adicionar-aluno' onClick={abrirModal}>
        <BsPersonFillAdd />
      </div>

      {/* Modal para cadastrar aluno */}
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

              <label>Data do Pagamento:</label>
              <input type='date' value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)} required />

              <div className='button-container'>
                <button type='button' onClick={fecharModal}>Cancelar</button>
                <button type='submit'>Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;