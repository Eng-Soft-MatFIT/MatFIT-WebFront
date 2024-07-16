import React from "react";
import GenericModal from "./GenericModal";

interface EditModalProps {
  nome: string;
  funcao: string;
  cargaHoraria: number;
  setNome: (nome: string) => void;
  setFuncao: (funcao: string) => void;
  setCargaHoraria: (cargaHoraria: number) => void;
  atualizarFuncionario: (e: React.FormEvent) => void;
  fecharModal: () => void;
}

const EditModalFuncionario: React.FC<EditModalProps> = ({
  nome,
  funcao,
  cargaHoraria,
  setNome,
  setFuncao,
  setCargaHoraria,
  atualizarFuncionario,
  fecharModal,
}) => (
  <GenericModal
    title="Atualizar Funcionário"
    onSubmit={atualizarFuncionario}
    onClose={fecharModal}
  >
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

export default EditModalFuncionario;
