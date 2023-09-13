import React, { useState, useRef, useEffect } from "react";
import ItemLista from "../../componentes/ItemLista";
import PesquisaFiltro from "../../componentes/PesquisaFiltro";
import CadastroItem from "../../componentes/CadastroItem";

function Stock() {
  const [MostraCadastroItem, setMostraCadastroItem] = useState(false);
  const cadastroItemRef = useRef(null);

  const toggleCadastroItem = () => {
    setMostraCadastroItem(!MostraCadastroItem);
  };

  const closeCadastroItem = () => {
    setMostraCadastroItem(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cadastroItemRef.current &&
        !cadastroItemRef.current.contains(event.target)
      ) {
        closeCadastroItem();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <PesquisaFiltro />
      <div>
        <ul className="grid grid-cols-7 gap-4 justify-items-center items-center border-b border-cinza-claro pt-16 pb-2">
          <li className="">Imagem</li>
          <li className="">Nome</li>
          <li className="">Código</li>
          <li className="">Descrição</li>
          <li className="">Categoria</li>
          <li className="">Preço</li>
          <li className="">Estoque</li>
        </ul>
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
        <ItemLista />
      </div>
      <div>
        <button
          className="bg-vermelho-botao rounded-2xl my-12 p-2 flex mx-auto mb-16 hover:scale-110 duration-150 hover:bg-vermelho-botaoHover"
          onClick={toggleCadastroItem}
        >
          <img src="../../../public/assets/icone-soma.svg" alt="" />
        </button>
        {MostraCadastroItem && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div ref={cadastroItemRef}>
              <CadastroItem onClose={closeCadastroItem} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stock;
