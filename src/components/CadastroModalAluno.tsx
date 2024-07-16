import React from 'react';
import GenericModal from './GenericModal';

interface CadastroModalProps {
  cpf: string;
  nome: string;
  esporte: string;
  setCpf: (cpf: string) => void;
  setNome: (nome: string) => void;
  setEsporte: (esporte: string) => void;
  cadastrarAluno: (e: React.FormEvent) => void;
  fecharModal: () => void;
}

const CadastroModalAluno: React.FC<CadastroModalProps> = ({ cpf, nome, esporte, setCpf, setNome, setEsporte, cadastrarAluno, fecharModal }) => (
  <GenericModal title="Cadastrar Aluno" onSubmit={cadastrarAluno} onClose={fecharModal}>
    <label>CPF:</label>
    <input type='text' value={cpf} onChange={(e) => setCpf(e.target.value)} required />
    <label>Nome:</label>
    <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} required />
    <label>Esporte:</label>
    <input type='text' value={esporte} onChange={(e) => setEsporte(e.target.value)} required />
  </GenericModal>
);

export default CadastroModalAluno;
