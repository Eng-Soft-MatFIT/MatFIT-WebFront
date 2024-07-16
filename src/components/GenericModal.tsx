import React, { ReactNode } from 'react';

interface GenericModalProps {
  title: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const GenericModal: React.FC<GenericModalProps> = ({ title, children, onSubmit, onClose }) => (
  <div className='modal'>
    <div className='modal-content'>
      <span className='close' onClick={onClose}>&times;</span>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
        <div className='button-container'>
          <button type='button' onClick={onClose}>Cancelar</button>
          <button type='submit'>Confirmar</button>
        </div>
      </form>
    </div>
  </div>
);

export default GenericModal;
