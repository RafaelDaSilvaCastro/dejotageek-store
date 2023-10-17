import React, { useState, useRef, useEffect } from "react";
import blogFetch from '../axios/config';

import FiltroDashboard from "./FiltroDashboard";

function PesquisaFiltro(props) {
  const [pesquisa, setPesquisa] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [categoria, setCategoria] = useState("");

  const EnviarFiltro = async (e) => {
    e.preventDefault();

    try {
      const response = await blogFetch.get(`/filtro`, {
        pesquisa
      })
    }
    catch {

    }
  }

  const setDataInicioFunc = (valor) => {
    setDataInicio(valor);
  };

  const setDataFimFunc = (valor) => {
    setDataFim(valor);
  };

  const setCategoriaFunc = (valor) => {
    setCategoria(valor);
  };

  const OrdenarNome = () => {

  }

  const OrdenarEstoque = () => {

  }

  const Filtrar = () => {

  }

  return (
    <section className="flex items-center gap-6 flex-wrap ">
      <div className="flex items-center gap-8">
        <input
          className="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg p-2.5 bg-[url('../../public/assets/icone-lupa.svg')] bg-no-repeat  bg-right outline-none px-6 w-96"
          type="search"
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <FiltroDashboard categoriafiltro={props.categoriafiltro} setDataInicio={setDataInicioFunc} setDataFim={setDataFimFunc} setCategoria={setCategoriaFunc} />
      </div>
      <div className="flex gap-8 items-center ">
        <button className="bg-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-3 py-2 flex items-center hover:scale-105  duration-150">
          <img
            className="pr-2"
            src="../../public/assets/icone-ordem-alfabetica.svg"
            alt="icone filtro ordem alfabetica"
            onClick={OrdenarNome}
          />
          Nome
        </button>
        <button className="bg-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-3 py-2 flex items-center hover:scale-105  duration-150">
          <img
            className="pr-2"
            src="../../public/assets/FiltroEstoque.svg"
            alt="icone filtro estoque"
            onClick={OrdenarEstoque}
          />
          Estoque
        </button>
        <button
          className="bg-vermelho-botao text-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-4 py-3 flex items-center hover:scale-105  duration-150"
          onClick={Filtrar}
        >
          Filtrar
        </button>
      </div>
    </section>
  );
}

export default PesquisaFiltro;
