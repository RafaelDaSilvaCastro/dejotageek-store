import React, { useState, useRef, useEffect } from "react";
import { format, endOfDay, parse, startOfDay } from "date-fns";
import blogFetch from "../../axios/config";
import ItemLista from "../../componentes/ItemLista";
import CadastroItem from "../../componentes/CadastroItem";
import PesquisaFiltro from "../../componentes/PesquisaFiltro";
import { useNavigate } from "react-router-dom";

function Stock() {
  const [token] = useState(sessionStorage.getItem("token"));
  const [MostraCadastroItem, setMostraCadastroItem] = useState(false);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
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
    getImages();
  }, []);

  const formatProductsDate = () => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        return { ...product, createdAt: format(new Date(product.createdAt), "dd/MM/yyyy") };
      });
    });
  };

  const converteDataParaInstant = (dataFormatada) => {
    const [dia, mes, ano] = dataFormatada.split('/');
   
    const data = new Date(`${ano}-${mes}-${dia}`);

    console.log(data);
  }

  const convertHtmlDateStartToUTC = (date) => {
    const [ano, mes, dia] = date.split('-');
    const data = new Date(`${ano}-${mes}-${dia}`);

    return data;
  }
  
  const convertHtmlDateEndToUTC = (date) => {
    const [ano, mes, dia] = date.split('-');
    const data = new Date(`${ano}-${mes}-${dia}`);

    return data;
  }

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
      setFilter(`name+like+${searchQuery}+and+category+eq+${filterCategory}+and+createdAt+between+${filterDateStart}+${filterDateEnd}`);
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
        setProducts(response.data.content);
        formatProductsDate();
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }
    }
  };

  const getImages = async () => {
    try {
      products.map(async (product) => {
        const response = await blogFetch.get(
          `/images?entity=product&id=${product.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          console.log("deu certo");
          setImages(response.data.content);
        }
      });
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
        console.log("Token inválido");
      }

      if (error.response.status === 400) {
        console.log("Não há imagens para esse produto");
      }
    }

  };

  const closeCadastroItem = () => {
    setMostraCadastroItem(false);
  }

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
        htmlFilterDateStart={convertHtmlDateStartToUTC}
        htmlFilterDateEnd={convertHtmlDateEndToUTC}
        onFilterCategory={setFilterCategory}
        applyFilter={() => handleSearch()}
        resetFilters={resetFilters}
      />
      <div className="mb-36">
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
        {products.map((item, index) => (
          <ItemLista
            key={item.id}
            imagem={null}
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
