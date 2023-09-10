import React, { useState, useRef, useEffect } from "react";
import PesquisaFiltro from "../../componentes/PesquisaFiltro";
import Cards from "../../componentes/Cards";
import Card from "../../componentes/Card";
import CadastroItem from "../../componentes/CadastroItem";

function Products() {
  const [MostraCadastroItem, setMostraCadastroItem] = useState(false);
  const cadastroItemRef = useRef(null);

  const toggleCadastroItem = () => {
    setMostraCadastroItem(!MostraCadastroItem);
  };

  const closeCadastroItem = () => {
    setMostraCadastroItem(false);
  };

  // Adiciona um evento de clique no documento para fechar o CadastroItem quando clicar fora dele
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
    <section>
      <PesquisaFiltro />
      <div className="flex items-center pb-12 pt-16 justify-around">
        <div className="flex flex-col justify-center items">
          {MostraCadastroItem ? null : <Cards />}
        </div>
        <div className="h-barraCinza w-0.5 mr-18 bg-cinza-claro"></div>
        {MostraCadastroItem ? null : <Card />}
      </div>
      <button
        className="bg-vermelho-botao rounded-2xl p-2 flex mx-auto mb-16 hover:scale-110 duration-150 hover:bg-vermelho-botaoHover"
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
    </section>
  );
}

export default Products;
