import React from 'react';
import GenericModal from './GenericModal';

interface EditModalProps {
  nome: string;
  esporte: string;
  setNome: (nome: string) => void;
  setEsporte: (esporte: string) => void;
  atualizarAluno: (e: React.FormEvent) => void;
  fecharEditModal: () => void;
}

const EditModalAluno: React.FC<EditModalProps> = ({ nome, esporte, setNome, setEsporte, atualizarAluno, fecharEditModal }) => (
  <GenericModal title="Atualizar Aluno" onSubmit={atualizarAluno} onClose={fecharEditModal}>
    <label>Nome:</label>
    <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
    <label>Esporte:</label>
    <input type='text' value={esporte} onChange={(e) => setEsporte(e.target.value)} required />
  </GenericModal>
);

export default EditModalAluno;
