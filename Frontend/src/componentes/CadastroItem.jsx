import React, { useState } from 'react';
import CardVazio from "./CardVazio";
import blogFetch from "../axios/config";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Certifique-se de importar ou criar um componente Modal

function CadastroItem(props) {
  const [token] = useState(sessionStorage.getItem("token"));
  const [imagem, setImagem] = useState("../../public/assets/imagem-vazia.png");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [stock, setStock] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [showNovaCategoriaModal, setShowNovaCategoriaModal] = useState(false);

  const navigate = useNavigate();

  const form = {
    name: name,
    description: description,
    price: price,
    purchasePrice: 0,
    stock: stock,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const postProduct = async () => {
    try {
      const response = await blogFetch.post(`/products/create?categoryId=${categoryId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log(response.data);
        postImage(response.data.id);
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

  const postImage = async (id) => {
    try {
      const formData = new FormData();
      formData.append("file", imagem);
      formData.append("productId", id);

      const response = await blogFetch.post(`images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 204) {
        alert("Imagem cadastrada com sucesso");
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log(token);
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
    setCategoryId("");
    setStock("");
  };

  const handlePostProduct = async () => {
    await postProduct();
    await props.onPostProduct();

    //await postImage();

    cleanForm();
    props.closeCadastroItem();
  };

  const handleCloseCadastroItem = () => {
    cleanForm();
    props.closeCadastroItem();
  };

  const handleNovaCategoriaSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await blogFetch.post(
        `/categories/create`,
        {
          name: novaCategoria,
          description: "Nova categoria criada pelo usuário",
          categoriaPai: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Nova categoria criada com sucesso!");
        setShowNovaCategoriaModal(false);
        getCategorias();
      }
    } catch (err) {
      console.error("Erro ao criar nova categoria:", err);
    }
  };

  const getCategorias = async () => {
    try {
      const response = await blogFetch.get(`/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        console.log(response.data.content);
        setCategorias(response.data.content);
      }

    } catch (err) {
      console.log(err);
    }
  }

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
            setImagem={setImagem}
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
                value={description}
                key="descricao"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="categoria flex gap-10 mb-12">
            <label className="hidden" htmlFor="categoria">
              Categoria
            </label>
            <input
              className="outline-none p-2 rounded-lg w-96 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
              placeholder="Categorias"
              type="text"
              name="nome"
              id="categoria"
              list="listaCategoria"
              required
              onChange={async (e) => {
                const selectedItem = categorias.find(item => item.name === e.target.value);
                if (selectedItem) {
                  console.log(selectedItem)
                  setCategoryId(selectedItem.id);
                };

              }}
            />

            <datalist id="listaCategoria">
              {categorias && categorias.map(item => (
                <option key={item.id} value={item.name} />
              ))}
            </datalist>
            <button
              onClick={() => setShowNovaCategoriaModal(true)}
              className="bg-azul-celeste text-white rounded-lg h-10 px-4 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
            >
              Criar categoria
            </button>
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
      {showNovaCategoriaModal && (
        <Modal onClose={() => setShowNovaCategoriaModal(false)}>
          <form onSubmit={handleNovaCategoriaSubmit}>
            <label htmlFor="novaCategoria">Nova Categoria:</label>
            <input
              type="text"
              id="novaCategoria"
              name="novaCategoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
            />
            <button type="submit">Criar Categoria</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default CadastroItem;
