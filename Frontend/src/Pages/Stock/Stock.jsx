import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import blogFetch from "../../axios/config";
import ItemLista from "../../componentes/ItemLista";
import CadastroItem from "../../componentes/CadastroItem";
import PesquisaFiltro from "../../componentes/PesquisaFiltro";
import { useNavigate } from "react-router-dom";

// default no product image : 13Dymy5OCMOwG1w5Xgcqxnzg3Rr9-RSM8

function Stock() {
  const [token] = useState(sessionStorage.getItem("token"));
  const [MostraCadastroItem, setMostraCadastroItem] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateEnd, setFilterDateEnd] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [sortByNameDirection, setSortByNameDirection] = useState("ASC");
  const [sortByStockDirection, setSortByStockDirection] = useState("ASC");
  const navigate = useNavigate();
  const cadastroItemRef = useRef(null);

  useEffect(() => {
    getProducts();
  }, []);

  const loadImageForProduct = async (id) => {
    try {
      const response = await blogFetch.get(`/images?productId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, image: url } : product
          )
        );
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }
    }
  };

  const formatProductsDate = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        createdAt: format(new Date(product.createdAt), "dd/MM/yyyy"),
      }))
    );
  };

  const handleSortBy = async (sortDirectionCustom, setSortDirectionCustom) => {
    setSortDirectionCustom((prevSortDirection) => {
      const newSortDirection = prevSortDirection === "ASC" ? "DESC" : "ASC";
      return newSortDirection;
    });

    setSortDirection(sortDirectionCustom);

    await getProducts();
  };

  const handleSortByName = async () => {
    setSortBy("name");
    await handleSortBy(sortByNameDirection, setSortByNameDirection);
  };

  const handleSortByStock = async () => {
    setSortBy("stock");
    await handleSortBy(sortByStockDirection, setSortByStockDirection);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      setFilter(
        `name+like+${searchQuery}+and+category+eq+${filterCategory}+and+createdAt+between+${filterDateStart}+${filterDateEnd}`
      );
      await getProducts();
    } else {
      resetFilters();
    }
  };

  const resetFilters = async () => {
    setFilter("");
    setSearchQuery("");
    setSortBy("");
    setSortDirection("ASC");
    setSortByNameDirection("ASC");
    setSortByStockDirection("ASC");
    setFilterDateStart("");
    setFilterDateEnd("");
    setFilterCategory("");
    await getProducts();
  };

  const getProducts = async () => {
    try {
      const response = await blogFetch.get(
        `/products?filter=${filter}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const data = response.data.content;
        data.forEach((product) => {
          loadImageForProduct(product.id);
        });
        setProducts(data);
        formatProductsDate();
        console.log(data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }
    }
  };

  const closeCadastroItem = () => {
    setMostraCadastroItem(false);
  };

  return (
    <div>
      <PesquisaFiltro
        categoriafiltro={undefined}
        onSearch={(value) => setSearchQuery(value)}
        searchQuery={searchQuery}
        onSortByName={() => handleSortByName()}
        onSortByStock={() => handleSortByStock()}
        onFilterDateStart={setFilterDateStart}
        onFilterDateEnd={setFilterDateEnd}
        onFilterCategory={setFilterCategory}
        applyFilter={() => handleSearch()}
        resetFilters={resetFilters}
      />
      <div className="mb-1">
        <ul className="grid grid-cols-8 gap-4 justify-items-center items-center border-b border-cinza-claro pt-16 pb-2">
          <li className="">Imagem</li>
          <li className="">Nome</li>
          <li className="">Código</li>
          <li className="">Data de cadastro</li>
          <li className="">Descrição</li>
          <li className="">Categoria</li>
          <li className="">Preço</li>
          <li className="">Estoque</li>
        </ul>
      </div>
      <div>
        {products.map((item) => (
          <ItemLista
            key={item.id}
            imagem={item.image}
            nome={item.name}
            codigo={item.id}
            dataCadastro={item.createdAt}
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
          onClick={() => setMostraCadastroItem(true)}
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
              <CadastroItem
                closeCadastroItem={closeCadastroItem}
                onPostProduct={getProducts}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stock;
