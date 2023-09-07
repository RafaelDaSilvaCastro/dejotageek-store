import React from 'react';
import Header from './componentes/Header';

function AuthenticationLayout({ children }) {
  return (
    <div>
      <Header /> {/* Exibe o cabeçalho */}
      {children} {/* Exibe o conteúdo da rota */}
    </div>
  );
}

export default AuthenticationLayout;