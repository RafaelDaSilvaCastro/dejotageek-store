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
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [categoriaPai, setCategoriaPai] = useState("");
  const [stock, setStock] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [showNovaCategoriaModal, setShowNovaCategoriaModal] = useState(false);

  const [acerto, setAcerto] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

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
        postImage(response.data.id);
        setAcerto(true);
        setMensagem("Produto cadastrado com sucesso!");
        setTimeout(() => {
          setAcerto(false);
        }, 3000);
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }

      if (err.response.status === 422) {
        setErro(true);
        setMensagemErro(err.response.data.errors[0].message);
        setTimeout(() => {
          setErro(false);
        }, 3000);
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
        setAcerto(true);
        setMensagem("Imagem cadastrada com sucesso!");
        setTimeout(() => {
          setAcerto(false);
        }, 3000);
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log(token);
      }

      if (err.response.status === 422) {
        setErro(true);
        setMensagemErro(err.response.data.errors[0].message);
        setTimeout(() => {
          setErro(false);
        }, 3000);
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

  const clearCategoria = () => {
    setNovaCategoria("");
    setDescricao("");
    setCategoriaPai("");
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
          description: descricao,
          categoriaPai: categoriaPai
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log(response.status);
        setShowNovaCategoriaModal(false);
        getCategorias();
        clearCategoria();
        setAcerto(true);
        setMensagem("Categoria cadastrada com sucesso!");
        setTimeout(() => {
          setAcerto(false);
        }, 3000);
        
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }

      if (err.response.status === 422) {
        setErro(true);
        setMensagemErro(err.response.data.errors[0].message);
        setTimeout(() => {
          setErro(false);
        }, 3000);
      }
    }
  };





  const handleEditProduct = async (e) => {

    try {
      const response = await blogFetch.put(
        `/products/update/${codigo}`,
        {
          name: name,
          description: description,
          price: price,
          purchasePrice: price,
          stock: stock
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        postImage(response.data.id);
        clearCategoria();
        cleanForm();
        setAcerto(true);
        setMensagem("Item Editado!");
        setTimeout(() => {
          setAcerto(false);
        }, 3000);
        window.location.reload();
        props.closeCadastroItem();
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }

      if (err.response.status === 422) {
        setErro(true);
        setMensagemErro(err.response.data.errors[0].message);
        setTimeout(() => {
          setErro(false);
        }, 3000);
      }
    }
  };





  const handleExcluirCadastroItem = async (e) => {

    try {
      const response = await blogFetch.delete(
        `/products/delete/${codigo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log(response.status);
        clearCategoria();
        cleanForm();
        props.closeCadastroItem();
        setAcerto(true);
        setMensagem("Item Deletado!");
        setTimeout(() => {
          setAcerto(false);
        }, 3000);
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }

      if (err.response.status === 422) {
        setErro(true);
        setMensagemErro(err.response.data.errors[0].message);
        setTimeout(() => {
          setErro(false);
        }, 3000);
      }
    }
  };







  const getCategorias = async () => {
    try {
      const response = await blogFetch.get(`/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setCategorias(response.data.content);
      }

    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    setImagem(props.imagem);
    setName(props.nome);
    setCodigo(props.codigo);
    setDescription(props.descricao);
    setCategoria(props.categoria);
    setStock(props.estoque);
    setPrice(props.preco);


    getCategorias();

    if (categoria != "") {
      const selectedItem = categorias.find(item => item.name === categoria);
      if (selectedItem) {
        console.log(selectedItem)
        setCategoryId(selectedItem.id);
      };
    }

  }, []);

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
                className="nome outline-none p-2 rounded-lg w-full h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
                placeholder="Nome"
                type="text"
                name="nome"
                id="nome"
                value={name}
                key="nome"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-8">
              <label className="hidden" htmlFor="descricao">
                Descrição
              </label>
              <input
                className="descricao outline-none rounded-lg w-full h-28 p-2 pb-20 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
                placeholder="Descrição"
                type="text"
                name="descricao"
                id="descricao"
                value={description}
                key="descricao"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="categoria flex gap-10 mb-12">
            <label className="hidden" htmlFor="categoria">
              Categoria
            </label>
            <input
              className="outline-none p-2 rounded-lg w-45 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
              placeholder="Categorias"
              type="text"
              name="nome"
              id="categoria"
              list="listaCategoria"
              //value={categoria}
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
              className="bg-cinza-claro text-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-7 py-3 flex items-center hover:scale-105 duration-150 w-45 h-10"
            >
              Criar categoria
            </button>
          </div>
          <div className="categoria flex gap-10 mb-12">
            <label className="hidden" htmlFor="preco">
              Preço R$
            </label>
            <input
              className="preco outline-none rounded-lg w-45 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] p-2 placeholder:text-cinza-claro no-arrows"
              type="number"
              id="preco"
              name="preco"
              step="0.01"
              placeholder="Preço"
              min="0"
              value={price}
              key="preco"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
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
                required
              />
            </div>
          </div>
          <div className="flex justify-around">
            <button
              onClick={() => {
                props.editExcluir ? handleExcluirCadastroItem() : handleCloseCadastroItem();
              }}
              type="reset"
              className="hover:scale-105 duration-150 bg-vermelho-pessego rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
            >
              {props.editExcluir ? "Excluir" : "Cancelar"}
            </button>
            <button
              type="submit"
              className="hover:scale-105 duration-150 bg-verde-caqui rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
              onClick={() => {
                if(name !== '' && description !== '' && categoryId !== '' && stock !== '' && price !== ''){
                  props.editExcluir ? handleEditProduct() : handlePostProduct()
                }
                else{
                  alert('Preencha todos os campos obrigatórios antes de criar um item')
                }

              }}
            >
              Salvar
            </button>

          </div>
        </div>
      </form>
      {showNovaCategoriaModal && (
  <Modal onClose={() => setShowNovaCategoriaModal(false)}>
    <div className="mb-4">
      <label htmlFor="novaCategoria" className="block text-sm font-medium text-gray-700">
        Nova Categoria:
      </label>
      <input
        type="text"
        id="novaCategoria"
        name="novaCategoria"
        value={novaCategoria}
        onChange={(e) => setNovaCategoria(e.target.value)}
        className="mt-1 p-2 w-full border border-black rounded"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
        Descrição:
      </label>
      <input
        type="text"
        id="descricao"
        name="descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="mt-1 p-2 w-full border border-black rounded"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="categoriaPai" className="block text-sm font-medium text-gray-700">
        Categoria Pai:
      </label>
      <input
        type="text"
        id="categoriaPai"
        name="categoriaPai"
        value={categoriaPai}
        onChange={(e) => setCategoriaPai(e.target.value)}
        className="mt-1 p-2 w-full border border-black rounded"
      />
    </div>
    <div className="flex justify-end mt-4">
      <button
        type="button"
        onClick={() => setShowNovaCategoriaModal(false)}
        className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
      >
        Cancelar
      </button>
      <button
        type="submit"
        onClick={handleNovaCategoriaSubmit}
        className="px-4 py-2 bg-vermelho-pessego text-white rounded hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200"
      >
        Criar Categoria
      </button>
    </div>
  </Modal>

      )}

      {acerto && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded shadow-lg z-50">
          <p>{mensagem}</p>
        </div>
      )}

      {erro && (
        <div className="fixed bottom-4 right-4 p-4 bg-red-500 text-white rounded shadow-lg z-50">
          <p>{mensagemErro}</p>
        </div>
      )}

    </div>
  );
}

export default CadastroItem;
