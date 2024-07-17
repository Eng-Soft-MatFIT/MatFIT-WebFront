import React, { useState, useEffect } from 'react';
import './Funcionario.css';
import { FuncionarioService } from '../../service/FuncionarioService';
import { BsFillTrashFill, BsPencilSquare, BsPersonFillAdd, BsMenuButton } from 'react-icons/bs';
import Menu from '../../components/Menu';
import CadastroModalFuncionario from '../../components/CadastroModalFuncionario';
import EditModalFuncionario from '../../components/EditModalFuncionario';
import { FuncionarioResponse, FuncionarioUpdate } from '../../types/Funcionario';
import NotFound from '../../components/NotFound';
import Loading from '../../components/Loading';

function Funcionario() {
  const [username, setUsername] = useState('');
  const [funcionarios, setFuncionarios] = useState<FuncionarioResponse[]>([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [funcao, setFuncao] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState<FuncionarioResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    carregarFuncionarios();
  }, []);

  const funcionarioService = new FuncionarioService();

  const carregarFuncionarios = async () => {
    try {
      setLoading(true);
      const response = await funcionarioService.findAllFuncionario();
      setFuncionarios(response);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarFuncionario = async (e: React.FormEvent) => {
    e.preventDefault();
    const funcionario: FuncionarioResponse = { cpf, nome, funcao, cargaHoraria };
    setLoading(true);
    await funcionarioService.insertFuncionario(funcionario);
    setLoading(false);
    fecharModal();
    carregarFuncionarios();
  };

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => {
    setIsModalOpen(false);
    setNome('');
    setCpf('');
    setFuncao('');
    setCargaHoraria(0);
  };

  const removerFuncionario = async (cpf: string) => {
    if (window.confirm('Você realmente quer remover este funcionário?')) {
      setLoading(true);
      await funcionarioService.removeFuncionario(cpf);
      setLoading(false);
      carregarFuncionarios();
    }
  };

  const abrirEditModal = (funcionario: FuncionarioResponse) => {
    setSelectedFuncionario(funcionario);
    setNome(funcionario.nome);
    setCpf(funcionario.cpf);
    setFuncao(funcionario.funcao);
    setCargaHoraria(funcionario.cargaHoraria);
    setIsEditModalOpen(true);
  };

  const fecharEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedFuncionario(null);
    setNome('');
    setCpf('');
    setFuncao('');
    setCargaHoraria(0);
  };

  const atualizarFuncionario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFuncionario) {
      const funcionarioAtualizado: FuncionarioUpdate = { nome, funcao, cargaHoraria };
      setLoading(true);
      await funcionarioService.updateFuncionario(selectedFuncionario.cpf, funcionarioAtualizado);
      setLoading(false);
      fecharEditModal();
      carregarFuncionarios();
    }
  };

  const [menu, setMenu] = useState(false);

  return (
    <div className='home'>
      {menu && <Menu onClose={() => setMenu(false)} />}
      <div className='topo'>
        <BsMenuButton className='btn-menu' onClick={() => setMenu(true)} />
        <span>Olá, {username}</span>
      </div>
      <div className='lista-funcionarios'>
        <h2 className='lista-funcionarios-titulo'>Lista de Funcionários</h2>
        <div className='funcionario-grid'>
          {funcionarios && funcionarios.map((funcionario) => (
            <div key={funcionario.cpf} className='funcionario-card'>
              <div className='funcionario-atributo'>
                <strong>CPF:</strong> {funcionario.cpf}
              </div>
              <div className='funcionario-atributo'>
                <strong>Nome:</strong> {funcionario.nome}
              </div>
              <div className='funcionario-atributo'>
                <strong>Função:</strong> {funcionario.funcao}
              </div>
              <div className='funcionario-atributo'>
                <strong>Carga Horária:</strong> {funcionario.cargaHoraria}H
              </div>
              <div className='funcionario-acoes'>
                <BsFillTrashFill onClick={() => removerFuncionario(funcionario.cpf)} className='btn-acoes' />
                <BsPencilSquare onClick={() => abrirEditModal(funcionario)} className='btn-acoes' />
              </div>
            </div>
          ))}

          {funcionarios && funcionarios.length === 0 && <NotFound title='Nenhum funcionário cadastrado'/>}
        </div>
      </div>
      <div className='adicionar-funcionario' onClick={abrirModal}>
        <BsPersonFillAdd />
      </div>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <CadastroModalFuncionario
              cpf={cpf}
              nome={nome}
              funcao={funcao}
              cargaHoraria={cargaHoraria}
              setCpf={setCpf}
              setNome={setNome}
              setFuncao={setFuncao}
              setCargaHoraria={setCargaHoraria}
              cadastrarFuncionario={cadastrarFuncionario}
              fecharModal={fecharModal}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <EditModalFuncionario
              nome={nome}
              funcao={funcao}
              cargaHoraria={cargaHoraria}
              setNome={setNome}
              setFuncao={setFuncao}
              setCargaHoraria={setCargaHoraria}
              atualizarFuncionario={atualizarFuncionario}
              fecharModal={fecharEditModal}
            />
          </div>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
}

export default Funcionario;