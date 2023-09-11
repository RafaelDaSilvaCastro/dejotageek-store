import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [selectedRadio, setSelectedRadio] = useState("Estoque");

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
    console.log(value);
  };

  return (
    <header className=" my-10 flex flex-row items-center justify-between z-10">
      <img src="./assets/Logo.svg" alt="logo" />
      <ul className="flex flex-row flex-end space-x-5">
        <li>
          <Link to="/stock">
            <button
              className={
                selectedRadio === "Estoque"
                  ? "bg-vermelho-botao rounded-xl text-center shadow-lg p-0.5 hover:scale-105  duration-75"
                  : "p-0.5 hover:scale-105  duration-150"
              }
              onClick={() => handleRadioChange("Estoque")}
            >
              <img
                src={
                  selectedRadio === "Estoque"
                    ? "./assets/Estoque_Branco.svg"
                    : "./assets/Estoque_Preto.svg"
                }
                alt="estoque"
              />
            </button>
          </Link>
        </li>

        <li>
          <Link to="/compraevenda">
            <button
              className={
                selectedRadio === "CompraVenda"
                  ? "bg-vermelho-botao rounded-xl text-center shadow-lg p-0.5 hover:scale-105  duration-75"
                  : "p-0.5 hover:scale-105  duration-150"
              }
              onClick={() => handleRadioChange("CompraVenda")}
            >
              <img
                src={
                  selectedRadio === "CompraVenda"
                    ? "./assets/CompraVenda_Branco.svg"
                    : "./assets/CompraVenda_Preto.svg"
                }
                alt="compra/venda"
              />
            </button>
          </Link>
        </li>

        <li>
          <Link to="/products">
            <button
              className={
                selectedRadio === "NovoItem"
                  ? "bg-vermelho-botao rounded-xl text-center shadow-lg p-0.5 hover:scale-105  duration-75"
                  : "p-0.5 hover:scale-105  duration-150"
              }
              onClick={() => handleRadioChange("NovoItem")}
            >
              <img
                src={
                  selectedRadio === "NovoItem"
                    ? "./assets/NovoItem_Branco.svg"
                    : "./assets/NovoItem_Preto.svg"
                }
                alt="novo item"
              />
            </button>
          </Link>
        </li>

        <li>
          <Link to="/dashboard">
            <button
              className={
                selectedRadio === "Grafico"
                  ? "bg-vermelho-botao rounded-xl text-center shadow-lg p-0.5 hover:scale-105  duration-75"
                  : "p-0.5 hover:scale-105  duration-150"
              }
              onClick={() => handleRadioChange("Grafico")}
            >
              <img
                src={
                  selectedRadio === "Grafico"
                    ? "./assets/Grafico_Branco.svg"
                    : "./assets/Grafico_Preto.svg"
                }
                alt="grafico"
              />
            </button>
          </Link>
        </li>

        <li>
          <Link to="/">
            <button className="pl-12 hover:scale-110  duration-75">
              <img src="./assets/Sair.svg" alt="sair" />
            </button>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
