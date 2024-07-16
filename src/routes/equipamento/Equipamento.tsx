import React, { useState, useEffect } from 'react';
import './Equipamento.css';
import { EquipamentoService } from '../../service/EquipamentoService';
import { BsFillTrashFill, BsPencilSquare, BsPersonFillAdd, BsMenuButton } from 'react-icons/bs';
import Menu from '../../components/Menu';
import { EquipamentoResponse , EquipamentoUpdate } from '../../types/Equipamento';
import CadastroModalEquipamento from '../../components/CadastroModalEquipamento';
import EditModalEquipamento from '../../components/EditModalEquipamento';

function Equipamento() {
  const [username, setUsername] = useState('');
  const [equipamentos, setEquipamentos] = useState<EquipamentoResponse[]>([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEquipamento, setSelectedEquipamento] = useState<EquipamentoResponse | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    carregarEquipamentos();
  }, []);

  const equipamentoService = new EquipamentoService();

  const carregarEquipamentos = async () => {
    try {
      const response = await equipamentoService.findAllEquipamento();
      setEquipamentos(response);
    } catch (error) {
      console.error('Erro ao carregar equipamentos:', error);
    }
  };

  const cadastrarEquipamento = async (e: React.FormEvent) => {
    e.preventDefault();
    const equipamento : EquipamentoUpdate = { nome, quantidade };
    await equipamentoService.insertEquipamento(equipamento);
    fecharModal();
    carregarEquipamentos();
  };

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => {
    setIsModalOpen(false);
    setNome('');
    setQuantidade(0);
  };

  const removerEquipamento = async (id: number) => {
    if (window.confirm('Você realmente quer remover este equipamento?')) {
      await equipamentoService.removeEquipamento(id);
      carregarEquipamentos();
    }
  };

  const abrirEditModal = (equipamento: EquipamentoResponse) => {
    setSelectedEquipamento(equipamento);
    setNome(equipamento.nome);
    setQuantidade(equipamento.quantidade);
    setIsEditModalOpen(true);
  };

  const fecharEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEquipamento(null);
    setNome('');
    setQuantidade(0);
  };

  const atualizarEquipamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEquipamento) {
      const equipamentoAtualizado : EquipamentoUpdate = { nome, quantidade };
      await equipamentoService.updateEquipamento(selectedEquipamento.id, equipamentoAtualizado);
      fecharEditModal();
      carregarEquipamentos();
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
      <div className='lista-equipamentos'>
        <h2>Lista de Equipamentos</h2>
        <div className='equipamento-grid'>
          {equipamentos.map((equipamento) => (
            <div key={equipamento.id} className='equipamento-card'>
              <div className='equipamento-atributo'>
                <strong>Nome:</strong> {equipamento.nome}
              </div>
              <div className='equipamento-atributo'>
                <strong>Quantidade:</strong> {equipamento.quantidade}
              </div>
              <div className='equipamento-acoes'>
                <BsFillTrashFill onClick={() => removerEquipamento(equipamento.id)} className='btn-acoes' />
                <BsPencilSquare onClick={() => abrirEditModal(equipamento)} className='btn-acoes' />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='adicionar-equipamento' onClick={abrirModal}>
        <BsPersonFillAdd />
      </div>
      {isModalOpen && (
        <CadastroModalEquipamento
          nome={nome}
          quantidade={quantidade}
          setNome={setNome}
          setQuantidade={setQuantidade}
          cadastrarEquipamento={cadastrarEquipamento}
          fecharModal={fecharModal}
        />
      )}
      {isEditModalOpen && (
        <EditModalEquipamento
          nome={nome}
          quantidade={quantidade}
          setNome={setNome}
          setQuantidade={setQuantidade}
          atualizarEquipamento={atualizarEquipamento}
          fecharEditModal={fecharEditModal}
        />
      )}
    </div>
  );
}

export default Equipamento;