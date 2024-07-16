import React from 'react';
import GenericModal from './GenericModal';

interface CadastroModalProps {
  nome: string;
  quantidade: number;
  setNome: (nome: string) => void;
  setQuantidade: (quantidade: number) => void;
  cadastrarEquipamento: (e: React.FormEvent) => void;
  fecharModal: () => void;
}

const CadastroModalEquipamento: React.FC<CadastroModalProps> = ({ nome, quantidade,  setNome, setQuantidade, cadastrarEquipamento, fecharModal }) => (
  <GenericModal title="Cadastrar Equipamento" onSubmit={cadastrarEquipamento} onClose={fecharModal}>
    <label>Nome:</label>
    <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
    <label>Quantidade:</label>
    <input type='text' value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} required />
  </GenericModal>
);

export default CadastroModalEquipamento;
