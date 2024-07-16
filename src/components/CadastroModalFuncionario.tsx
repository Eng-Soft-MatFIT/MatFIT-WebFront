import React from "react";
import GenericModal from "./GenericModal";

interface CadastroModalProps {
  cpf: string;
  nome: string;
  funcao: string;
  cargaHoraria: number;
  setCpf: (cpf: string) => void;
  setNome: (nome: string) => void;
  setFuncao: (funcao: string) => void;
  setCargaHoraria: (cargaHoraria: number) => void;
  cadastrarFuncionario: (e: React.FormEvent) => void;
  fecharModal: () => void;
}

const CadastroModalFuncionario: React.FC<CadastroModalProps> = ({
  cpf,
  nome,
  funcao,
  cargaHoraria,
  setCpf,
  setNome,
  setFuncao,
  setCargaHoraria,
  cadastrarFuncionario,
  fecharModal,
}) => (
  <GenericModal
    title="Cadastrar Funcionário"
    onSubmit={cadastrarFuncionario}
    onClose={fecharModal}
  >
    <label>CPF:</label>
    <input
      type="text"
      value={cpf}
      onChange={(e) => setCpf(e.target.value)}
      required
    />
    <label>Nome:</label>
    <input
      type="text"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      required
    />
    <label>Função:</label>
    <input
      type="text"
      value={funcao}
      onChange={(e) => setFuncao(e.target.value)}
      required
    />
    <label>Carga Horária:</label>
    <input
      type="number"
      value={cargaHoraria}
      onChange={(e) => setCargaHoraria(Number(e.target.value))}
      required
    />
  </GenericModal>
);

export default CadastroModalFuncionario;
