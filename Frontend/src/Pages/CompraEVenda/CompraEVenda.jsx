import Card from "../../componentes/Card";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import blogFetch from "../../axios/config";

function CompraEVenda() {
  const [selectedRadio, setSelectedRadio] = useState("Compra");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };

  const limparDados = () => {
    setNome("");
    setImagem("../../public/assets/imagem-vazia.png");
    setCodigo(null);
    setQuantidade(0);
    setPreco(0);
    setprecoUnitario(0)
    setEstoque(0);
    setData("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantidade > estoque && selectedRadio == "Venda") {
      alert('Quantidade maior que a disponivel no estoque (${estoque})')
    }
    else {
      try {
        console.log(form);
        await blogFetch.post(
          "/transacao",
          form
        );
        console.log(form);
        if (selectedRadio == "Venda") {
          alert("Venda cadastrada!");
        }
        else {
          alert("Compra cadastrada!");
        }

      } catch (error) {
        console.error(error);
        console.log(form);
        alert("Não foi possível conectar!!");
      }
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
            handleRadioChange("Compra")}
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
            handleRadioChange("Venda")}
        >
          Venda
        </button>
      </div>

      <div className="flex justify-around mr-28 mb-8 mt-12 items-center ml-20">
        <Card
          nome={nome}
          preco={preco}
          imagem={imagem}
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
            className="outline-none p-2 rounded-lg w-96 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
            placeholder="Nome"
            type="text"
            name="nome"
            id="nome"
            list="listaItens"
            required
            onChange={(e) => setNome(e.target.value)}
          />

          <datalist id="listaItens">
            {posts.map(item => (
              <option key={item.id_produto} value={item.nome} />
            ))}
          </datalist>


          {selectedRadio == 'Compra' ? (
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
          ) : null}


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
            {selectedRadio == 'Compra' ? (
              <>
                <p>Total</p>
                <p>R$: {valorCompra(precoUnitario, quantidade)}</p>
              </>
            ) : (
              <>
                <p>Total</p>
                <p>R$: {valorVenda(preco, quantidade)}</p>
              </>)}


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
