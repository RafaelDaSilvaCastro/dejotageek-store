import React, { useState, useRef, useEffect } from "react";
import blogFetch from "../../axios/config";
import ItemLista from "../../componentes/ItemLista";
import CadastroItem from "../../componentes/CadastroItem";
import PesquisaFiltro from "../../componentes/PesquisaFiltro";
import { useNavigate } from "react-router-dom";

function Stock() {
  const [token] = useState(sessionStorage.getItem("token"));
  const [MostraCadastroItem, setMostraCadastroItem] = useState(false);
  const [products, setProducts] = useState([]);
  const [alreadySorted, setAlreadySorted] = useState(false);
  const navigate = useNavigate();
  const cadastroItemRef = useRef(null);

  useEffect(() => {
    getProductsAll();
  }, []);    

  const getProductsAll = async () => {
    try {
      const response = await blogFetch.get("/product", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setProducts(response.data.content);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }
    }
  };

  const sortProducts = () => {
    if (!alreadySorted) {
      setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
      setAlreadySorted((prev) => !prev);
      console.log("De A a Z");
    } else {
      setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));
      setAlreadySorted((prev) => !prev);
      console.log("De Z a A");
    }
  };
  

  return (
    <div>
      <PesquisaFiltro
        categoriafiltro={undefined}
        onSearch={() => console.log("estou pesquisando")}
        searchQuery={undefined}
        onSort={sortProducts}
        onSortByStock={undefined}
        products={products}
        setProducts={setProducts}
      />
      <div className="mb-36">
        <ul className="grid grid-cols-7 gap-4 justify-items-center items-center border-b border-cinza-claro pt-16 pb-2">
          <li className="">Imagem</li>
          <li className="">Nome</li>
          <li className="">Código</li>
          <li className="">Descrição</li>
          <li className="">Categoria</li>
          <li className="">Preço</li>
          <li className="">Estoque</li>
        </ul>
      </div>
      <div>
        {products.map((item, index) => (
          <ItemLista
            key={item.id}
            imagem={null}
            nome={item.name}
            codigo={item.id}
            descricao={item.description}
            categoria={item.category}
            preco={item.price}
            estoque={item.stock}
          />
        ))}
      </div>
      <div>
        <button
          className="fixed top-3/4 right-2/4 translate-x-2/4 translate-y-full z-50 bg-vermelho-botao rounded-xl my-12 p-1 flex mx-auto mb-16 hover:scale-105 duration-150 hover:bg-vermelho-botaoHover"
        >
          <img
            className="scale-75"
            src="../../../public/assets/icone-soma.svg"
            alt=""
          />
        </button>
        {MostraCadastroItem && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div ref={cadastroItemRef}>
              <CadastroItem onClose={null}
                imagem={imagem}
                nome={nome}
                codigo={codigo}
                descricao={descricao}
                categoria={categoria}
                preco={preco}
                estoque={estoque}
                closeCadastroItem={null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stock;
