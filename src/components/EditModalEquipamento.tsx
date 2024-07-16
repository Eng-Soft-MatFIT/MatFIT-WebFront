import React from 'react';
import GenericModal from './GenericModal';

interface EditModalProps {
  nome: string;
  quantidade: number;
  setNome: (nome: string) => void;
  setQuantidade: (quantidade: number) => void;
  atualizarEquipamento: (e: React.FormEvent) => void;
  fecharEditModal: () => void;
}

const EditModalEquipamento: React.FC<EditModalProps> = ({ nome, quantidade, setNome, setQuantidade, atualizarEquipamento, fecharEditModal }) => (
  <GenericModal title="Atualizar Equipamento" onSubmit={atualizarEquipamento} onClose={fecharEditModal}>
    <label>Nome:</label>
    <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
    <label>Qauntidade:</label>
    <input type='text' value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} required />
  </GenericModal>
);

export default EditModalEquipamento;
