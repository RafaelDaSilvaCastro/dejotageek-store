import React, { useState, useRef, useEffect } from "react";
import blogFetch from "../../axios/config";
import ItemLista from "../../componentes/ItemLista";
import PesquisaFiltro from "../../componentes/PesquisaFiltro";
import CadastroItem from "../../componentes/CadastroItem";

function Stock() {
  const [MostraCadastroItem, setMostraCadastroItem] = useState(false);
  const cadastroItemRef = useRef(null);
  const [originalPosts, setOriginalPosts] = useState([]); // Manter uma cópia dos itens originais
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortDirectionEstoque, setSortDirectionEstoque] = useState("asc");
  const [imagem, setImagem] = useState("../../public/assets/imagem-vazia.png");
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState("");

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    getPosts();
  }, []);

  const handleSearch = (query) => {
    const filtered = originalPosts.filter((post) =>
      post.nome.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
    setSearchQuery(query);
  };

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/produto/todos");
      const data = response.data;
      setPosts(data);
      setOriginalPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCadastroItem = (imagem, nome, codigo, descricao, categoria, preco, estoque) => {

    setImagem(imagem);
    setNome(nome);
    setCodigo(codigo);
    setDescricao(descricao);
    setCategoria(categoria);
    setPreco(preco);
    setEstoque(estoque);

    setMostraCadastroItem(!MostraCadastroItem);
  };

  const closeCadastroItem = () => {
    setMostraCadastroItem(false);
    getPosts()
  };

  const sortItems = () => {
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.nome.localeCompare(b.nome);
      } else {
        return b.nome.localeCompare(a.nome);
      }
    });

    setFilteredPosts(sortedPosts);
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const sortItemsByStock = () => {
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (sortDirectionEstoque === "asc") {
        return a.estoque - b.estoque;
      } else {
        return b.estoque - a.estoque;
      }
    });

    setFilteredPosts(sortedPosts);
    setSortDirectionEstoque((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
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
      <PesquisaFiltro
        categoriafiltro={posts.categoria}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onSort={sortItems}
        onSortByStock={sortItemsByStock}
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
        {filteredPosts.length === 0 ? (
          <p className="flex flex-col justify-center items-center my-10">
            Nenhum item encontrado.
          </p>
        ) : (
          filteredPosts.map((post) => (
            <ItemLista
              key={post.id}
              editItem={toggleCadastroItem}
              imagem={post.imagem}
              nome={post.nome}
              codigo={post.id_produto}
              descricao={post.descricao}
              categoria={post.categoria}
              preco={post.preco}
              estoque={post.estoque}
            />
          ))
        )}
      </div>
      <div>
        <button
          className="fixed top-3/4 right-2/4 translate-x-2/4 translate-y-full z-50 bg-vermelho-botao rounded-xl my-12 p-1 flex mx-auto mb-16 hover:scale-105 duration-150 hover:bg-vermelho-botaoHover"
          onClick={() => toggleCadastroItem(null, null, null, null, null, null, null)}
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
              <CadastroItem onClose={closeCadastroItem}
                imagem={imagem}
                nome={nome}
                codigo={codigo}
                descricao={descricao}
                categoria={categoria}
                preco={preco}
                estoque={estoque}
                closeCadastroItem={closeCadastroItem}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stock;
