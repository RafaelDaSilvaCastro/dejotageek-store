import Card from "../../componentes/Card";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import blogFetch from "../../axios/config";
import { useNavigate } from 'react-router-dom';

function CompraEVenda() {
  const [token] = useState(sessionStorage.getItem("token"));
  const [selectedRadio, setSelectedRadio] = useState("PURCHASE");
  const navigate = useNavigate();
  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const [acerto, setAcerto] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };


  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = async () => {
    try {
      const response = await blogFetch.get(
        `/products?page=0&size=150`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data.content;

      if (response.status === 200) {
        setProducts(data);
        console.log(data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }
      if (error.response.status === 422) {
        setErro(true);
        setMensagemErro(error.response.data.errors[0].message);
        console.log(error.response.data);
        setTimeout(() => {
          setErro(false);
        }, 3000);
      }
    }
  };



  const getImage = async (id) => {
    try {
      const response = await blogFetch.get(
        `/images?productId=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'arraybuffer'
        },
      );

      if (response.status === 200) {
        const imageBlob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImagem(imageUrl);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }
    }
  };


  const [nome, setNome] = useState("");
  const [precoUnitario, setprecoUnitario] = useState(0);
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [imagem, setImagem] = useState("../../public/assets/imagem-vazia.png");
  const [codigo, setCodigo] = useState(null);
  const [estoque, setEstoque] = useState(null);
  const [products, setProducts] = useState([]);


  const valorCompra = (precoUnitario, quantidade) => {
    return precoUnitario * quantidade;
  };

  const valorVenda = (preco, quantidade) => {
    return preco * quantidade;
  };

  const limparDados = () => {
    setNome("");
    setImagem("../../public/assets/imagem-vazia.png");
    setCodigo(null);
    setQuantidade(0);
    setPreco(0);
    setprecoUnitario(0)
    setEstoque(0);
  };

  let form = {};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRadio == 'SELL') {
      form = {
        type: selectedRadio,
        quantity: quantidade,
        price: preco,
      };
    }
    else {
      form = {
        type: selectedRadio,
        quantity: quantidade,
        price: precoUnitario,
      };
    }

    try {
      console.log(form);
      await blogFetch.post(
        `/transactions/create?productId=${codigo}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(form);
      if (selectedRadio == "SELL") {
        setAcerto(true);
        setMensagem("Venda cadastrada!");
        setTimeout(() => {
          setAcerto(false);
        }, 3000);
      }
      else {
        setAcerto(true);
        setMensagem("Compra cadastrada!");
        setTimeout(() => {
          setAcerto(false);
        }, 3000);
      }

    } catch (error) {
      if (error.response.status === 422) {
        setErro(true);
        setMensagemErro(error.response.data.errors[0].message);
        console.log(error.response.data);
        setTimeout(() => {
          setErro(false);
        }, 3000);
      }
    }
  };

  return (
    <div>
      <div className="flex gap-6 items-center">
        <button
          className={
            selectedRadio === "PURCHASE"
              ? "p-2 bg-vermelho-botao text-white rounded-3xl w-36 text-xl"
              : "text-black w-36 text-xl p-2"
          }
          onClick={() =>
            handleRadioChange("PURCHASE")}
        >
          Compra
        </button>

        <button
          className={
            selectedRadio === "SELL"
              ? "p-2 bg-vermelho-botao text-white rounded-3xl w-36 text-xl"
              : "text-black w-36 text-xl p-2"
          }
          onClick={() =>
            handleRadioChange("SELL")}
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
            onChange={async (e) => {
              const selectedItem = products.find(item => item.name === e.target.value);
              if (selectedItem) {
                console.log(selectedItem)
                setNome(selectedItem.name);
                setCodigo(selectedItem.id);
                setQuantidade(0);
                setPreco(selectedItem.price);
                await getImage(selectedItem.id);
              };

            }}
          />

          <datalist id="listaItens">
            {products && products.map(item => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>



          {selectedRadio == 'PURCHASE' ? (
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
            {selectedRadio == 'PURCHASE' ? (
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
        {erro && (
          <div className="fixed bottom-4 right-4 p-4 bg-red-500 text-white rounded shadow-lg z-50">
            <p>{mensagemErro}</p>
          </div>
        )}
      </div>
      {acerto && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded shadow-lg z-50">
          <p>{mensagem}</p>
        </div>
      )}
    </div>
  );
}

export default CompraEVenda;
