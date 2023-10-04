import React, { useState, useRef, useEffect } from "react";
import blogFetch from '../../axios/config';
import ItemLista from "../../componentes/ItemLista";
import PesquisaFiltro from "../../componentes/PesquisaFiltro";
import CadastroItem from "../../componentes/CadastroItem";

function Stock() {
  const [MostraCadastroItem, setMostraCadastroItem] = useState(false);
  const cadastroItemRef = useRef(null);
  const [posts, setPosts] = useState([]);


  const getPosts = async () => {

    try {
      const response = await blogFetch.get('/posts');

      const data = response.data;

      setPosts(data);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getPosts()

  }, [])


  const toggleCadastroItem = () => {
    setMostraCadastroItem(!MostraCadastroItem);
  };

  const closeCadastroItem = () => {
    setMostraCadastroItem(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cadastroItemRef.current &&
        !cadastroItemRef.current.contains(event.target)
      ) {
        closeCadastroItem();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <PesquisaFiltro />
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
        {posts.length === 0 ? (<p className="flex flex-col justify-center items-center my-10">Carregando...</p>) :
          posts.map((post) => (
            <ItemLista key={post.id}
              editItem={toggleCadastroItem}
              imagem={post.img}
              nome={post.nome}
              codigo={post.codigo}
              descricao={post.descricao}
              categoria={post.categoria}
              preco={post.preco}
              estoque={post.estoque} />
          ))
        }
      </div>
      <div>
        <button
          className="fixed top-3/4 right-2/4 translate-x-2/4 translate-y-full z-50 bg-vermelho-botao rounded-xl my-12 p-1 flex mx-auto mb-16 hover:scale-105 duration-150 hover:bg-vermelho-botaoHover"
          onClick={toggleCadastroItem}
        >
          <img className="scale-75" src="../../../public/assets/icone-soma.svg" alt="" />
        </button>
        {MostraCadastroItem && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div ref={cadastroItemRef}>
              <CadastroItem onClose={closeCadastroItem} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stock;
