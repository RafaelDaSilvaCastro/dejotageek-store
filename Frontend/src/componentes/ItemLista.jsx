import React, { useState } from "react";

function ItemLista(props) {
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
          <img
            className="w-imagemTelaStock h-imagemTelaStock"
            src={props.imagem}
            alt="img"
          />
        </li>
        <li className="text-center">{props.nome}</li>
        <li>{props.codigo}</li>
        <li>{props.dataCadastro}</li>
        <li className="text-center">{props.descricao}</li>
        <li>{props.categoria}</li>
        <li>{props.preco}</li>
        <li className="flex items-center ">
          {props.estoque >= 5 ? (
            <p className="bg-verde-caqui py-1 px-3 rounded-xl ml-6">
              {" "}
              {props.estoque}
            </p>
          ) : (
            <p className="bg-vermelho-pessego py-1 px-3 rounded-xl ml-6">
              {" "}
              {props.estoque}
            </p>
          )}
          <img
            className="py-2 ml-3 hover:scale-110 duration-75"
            src="../../public/assets/icone-edit.svg"
            alt=""
            onClick={() =>
              props.editItem(
                props.imagem,
                props.nome,
                props.codigo,
                props.descricao,
                props.categoria,
                props.preco,
                props.estoque
              )
            }
          />
        </li>
      </ul>
    </div>
  );
}

export default ItemLista;
