import CardVazio from "../../componentes/CardVazio";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import blogFetch from "../../axios/config";

function CompraEVenda() {
  const [selectedRadio, setSelectedRadio] = useState("Compra");

  //referente a opção Compra e Venda
  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };

  const [formularioAtivo, setFormularioAtivo] = useState("Compra");
  // 'selecionar se é o form de compra ou venda'

  //form
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [precoUnitario, setprecoUnitario] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [imagem, setImagem] = useState(null);

  const receberImagem = (imagem) => {
    setImagem(imagem);
  };

  const valorTotal = (precoUnitario, quantidade) => {
    return precoUnitario * quantidade;
  };

  const limparDados = () => {
    console.log(nome, data, precoUnitario, quantidade);

    setNome("");
    setData("");
    setprecoUnitario(0);
    setQuantidade(0);
    console.log(nome, data, precoUnitario, quantidade);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      imagem,
      nome,
      data,
      precoUnitario,
      quantidade,
    };
    console.log(form);
    try {
      await blogFetch.post("/CompraVenda", { body: form });
    } catch (error) {
      console.log("error");
      alert("Não foi possível conectar !!");
    }
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
          onClick={() =>
            handleRadioChange("Compra") && setFormularioAtivo("Compra")
          }
        >
          Compra
        </button>

        <button
          className={
            selectedRadio === "Venda"
              ? "p-2 bg-vermelho-botao text-white rounded-3xl w-36 text-xl"
              : "text-black w-36 text-xl p-2"
          }
          onClick={() =>
            handleRadioChange("Venda") && setFormularioAtivo("Venda")
          }
        >
          Venda
        </button>
      </div>

      <div className="flex justify-around mr-28 mb-8 mt-12 items-center ml-20">
        <CardVazio
          nome={nome}
          valorTotal={valorTotal(quantidade, precoUnitario)}
          enviarVariavelImg={receberImagem}
        />
        <div className="h-barraCinza w-px mr-4 bg-cinza-claro"></div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          action=""
          className="flex flex-col gap-6 justify-center "
        >
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
            onChange={(e) => setNome(e.target.value)}
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
              onChange={(e) => setData(e.target.value)}
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
              onChange={(e) => setprecoUnitario(e.target.value)}
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
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </label>
          <div className="h-0.5 w-48 bg-cinza-claro ml-44"></div>
          <div className=" flex  justify-between items-center text-cinza-claro pl-2 pr-20">
            <p>Total</p>
            <p>R$: {valorTotal(quantidade, precoUnitario)}</p>
          </div>
          <div className="flex justify-between">
            <button
              className=" hover:scale-105 duration-150 bg-vermelho-pessego rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
              onClick={limparDados}
              type="reset"
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
