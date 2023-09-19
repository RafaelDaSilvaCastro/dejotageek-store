import CardVazio from "../../componentes/CardVazio";
import { useState } from "react";

function CompraEVenda() {
  const [selectedRadio, setSelectedRadio] = useState("Compra");

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };
  return (
    <div>
      <div className="flex gap-6 items-center">
        <button
          className={
            selectedRadio === "Compra"
              ? "p-2 bg-vermelho-botao text-white rounded-3xl w-36 text-xl"
              : "text-black w-36 text-xl p-2"
          }
          onClick={() => handleRadioChange("Compra")}
        >
          Compra
        </button>

        <button
          className={
            selectedRadio === "Venda"
              ? "p-2 bg-vermelho-botao text-white rounded-3xl w-36 text-xl"
              : "text-black w-36 text-xl p-2"
          }
          onClick={() => handleRadioChange("Venda")}
        >
          Venda
        </button>
      </div>

      <div className="flex justify-around mr-28 mb-8 mt-12 items-center ml-20">
        <CardVazio />
        <div className="h-barraCinza w-px mr-4 bg-cinza-claro"></div>
        <form action="" className="flex flex-col gap-6 justify-center ">
          <label className="hidden" htmlFor="nome">
            Nome
          </label>
          <input
            className=" outline-none p-2 rounded-lg w-96 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
            placeholder="Nome"
            type="text"
            name="nome"
            id="nome"
            required
          />
          <label
            htmlFor="date"
            className="flex justify-between items-center text-cinza-claro pl-2"
          >
            <p>Data</p>
            <input
              className=" rounded-lg p-2 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none w-60 "
              type="date"
              id="date"
              required
            />
          </label>
          <label
            htmlFor="precoUnitario"
            className="flex justify-between items-center text-cinza-claro pl-2"
          >
            <p>Preço Unitário</p>
            <input
              className=" rounded-lg p-2 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none w-60 "
              type="number"
              id="precoUnitario"
              required
            />
          </label>
          <label
            htmlFor="quantidade"
            className="flex justify-between items-center text-cinza-claro pl-2"
          >
            <p>Quantidade</p>
            <input
              className=" rounded-lg p-2 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none w-60 "
              type="number"
              id="quantidade"
              required
            />
          </label>
          <div className="h-0.5 w-48 bg-cinza-claro ml-44"></div>
          <div className=" flex  justify-between items-center text-cinza-claro pl-2 pr-20">
            <p>Total</p>
            <p>R$00,00</p>
          </div>
          <div className="flex justify-between">
            <button
              className=" hover:scale-105 duration-150 bg-vermelho-pessego rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
              type="submit"
            >
              Cancelar
            </button>
            <button
              className=" hover:scale-105 duration-150 bg-verde-caqui rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompraEVenda;
