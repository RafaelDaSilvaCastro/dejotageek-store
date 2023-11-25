import React, { useState } from 'react';
import CardVazio from "./CardVazio";
import blogFetch from "../axios/config";
import { useNavigate } from "react-router-dom";

function CadastroItem(props) {
  const [token] = useState(sessionStorage.getItem("token"));
  const [imagem, setImagem] = useState("../../public/assets/imagem-vazia.png");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const form = {
    name: name,
    description: description,
    price: price,
    purchasePrice: 0,
    category: category,
    stock: stock,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  };

  const postProduct = async () => {
    try {
      const response = await blogFetch.post("/products/create", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Produto cadastrado com sucesso!");
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }

      if (err.response.status === 422) {
        alert(err.response.data.errors[0].message);
      }
    }
  };

  const cleanForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setStock("");
  };

  const handlePostProduct = async () => {
    await postProduct();
    await props.onPostProduct();
    cleanForm();
    props.closeCadastroItem();
  };

  const handleCloseCadastroItem = () => {
    cleanForm();
    props.closeCadastroItem();
  };

  const receberImagem = (imagem) => {
    setImagem(imagem);
  };

  return (
    <div className="bg-white rounded-3xl p-12 gap-36 mb-4 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex gap-8 justify-center mt-4"
      >
        <div className="ml-16">
          <CardVazio
            nome={name}
            valorTotal={price}
            imagem={imagem}
            enviarVariavelImg={receberImagem}
          />
        </div>
        <div>
          <div className="flex-col ">
            <div className="mb-8 mt-2">
              <label className="hidden" htmlFor="nome">
                Nome
              </label>
              <input
                className="nome outline-none p-2 rounded-lg w-96 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
                placeholder="Nome"
                type="text"
                name="nome"
                id="nome"
                required
                value={name}
                key="nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label className="hidden" htmlFor="descricao">
                Descrição
              </label>
              <input
                className="descricao outline-none rounded-lg w-96 h-28 p-2 pb-20 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
                placeholder="Descrição"
                type="text"
                name="descricao"
                id="descricao"
                required
                value={description}
                key="descricao"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="categoria flex gap-10 mb-12">
            <select
              id="categoria"
              name="Categoria"
              required
              value={category}
              className="outline-none drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg h-10 w-44 p-2 bg-white text-cinza-claro"
              key="categoria"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              <option className="text-zinc-800" value="TSHIRT">
                TSHIRT
              </option>
              <option className="text-zinc-800" value="ACTIONFIGURE" selected>
                ACTIONFIGURE
              </option>
              <option className="text-zinc-800" value="DECORATION">
                DECORATION
              </option>
              <option className="text-zinc-800" value="ACCESSORIES">
                ACCESSORIES
              </option>
            </select>
            <label className="hidden" htmlFor="preco">
              Preço R$
            </label>
            <input
              className="preco outline-none rounded-lg w-40 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] p-2 placeholder:text-cinza-claro no-arrows"
              type="number"
              id="preco"
              name="preco"
              step="0.01"
              placeholder="Preço"
              min="0"
              required
              value={price}
              key="preco"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="hidden" htmlFor="estoque">
              Estoque
            </label>
            <input
              className="estoque outline-none rounded-lg w-40 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] p-2 placeholder:text-cinza-claro no-arrows"
              type="number"
              id="estoque"
              name="estoque"
              placeholder="Estoque"
              min="0"
              required
              value={stock}
              key="estoque"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex justify-around">
            <button
              onClick={() => handleCloseCadastroItem()}
              type="reset"
              className="hover:scale-105 duration-150 bg-vermelho-pessego rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="hover:scale-105 duration-150 bg-verde-caqui rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
              onClick={() => handlePostProduct()}
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CadastroItem;
