import React, { useState } from "react";

function ItemLista() {
  const [selecionado, setSelecionado] = useState(false);

  const selecionarItem = () => {
    setSelecionado(!selecionado);
  };

  const itemClasses = `grid grid-cols-7 gap-4 place-items-center rounded-3xl mt-1 mb-1 py-1 cursor-pointer  
  ${selecionado ? "ring-2 ring-vermelho-botao" : ""}`;

  return (
    <div className="border-solid border-b border-cinza-claro cursor-context-menu">
      <ul className={itemClasses} onClick={selecionarItem}>
        <li>
          <img src="../../public/assets/camiseta.png" alt="imagem produto" />
        </li>
        <li className="text-center">T-shirt Luffy Wanted</li>
        <li>034</li>
        <li className="text-center">
          Camiseta manga curta, Oversized, Estampa Luffy, One piece, 97%
          algodão.
        </li>
        <li>Camiseta</li>
        <li>R$ 69,90</li>
        <li className="flex items-center ">
          <p className="bg-verde-caqui py-1 px-3 rounded-xl ml-6"> 15</p>
          <img
            className="py-2 ml-3"
            src="../../public/assets/icone-edit.png"
            alt=""
          />
        </li>
      </ul>
    </div>
  );
}

export default ItemLista;
