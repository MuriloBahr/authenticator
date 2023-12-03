// ConfirmationScreen.jsx
import React from 'react';
import './index.css'; 
import SideMenu from '../SideMenu';

const ConfirmationScreen = () => {
  return (
    <div className="confirmation-screen">
      <SideMenu />
      <h2>Confirmação de Acesso</h2>
      <p>Parabéns! Você obteve acesso à área restrita.</p>
    </div>
  );
};

export default ConfirmationScreen;
