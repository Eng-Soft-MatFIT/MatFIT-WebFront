import React from 'react';
import { UserResponse } from '../types/User';
import {BsCheckCircleFill, BsExclamationCircleFill} from "react-icons/bs"

interface PaymentModalProps {
  selectedAluno: UserResponse;
  confirmarPagamento: () => void;
  fecharPaymentModal: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ selectedAluno, confirmarPagamento, fecharPaymentModal }) => (
  <div className='modal modal-pagamento'>
    <div className='modal-content modal-content-pagamento'>
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
        <strong>Data de Pagamento:</strong> {selectedAluno.dataPagamento}
      </div>
      <div className='aluno-atributo'>
        <strong>Status do Pagamento:</strong> {selectedAluno.pagamentoAtrasado ? <BsExclamationCircleFill id='status-atrasado'/> : <BsCheckCircleFill id='status-emdia'/>}
      </div>
      <div className='button-container'>
        <button type='button' onClick={fecharPaymentModal}>Cancelar</button>
        <button type='button' onClick={confirmarPagamento} id='btn-pagar'>Pagar</button>
      </div>
    </div>
  </div>
);

export default PaymentModal;
