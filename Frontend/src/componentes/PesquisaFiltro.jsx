import React, { useState, useRef, useEffect } from "react";


import FiltroDashboard from "./FiltroDashboard";

function PesquisaFiltro(props) {
  return (
    <section className="flex items-center gap-6 flex-wrap ">
      <div className="flex items-center gap-8">
        <input
          className="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg p-2.5 bg-[url('../../public/assets/icone-lupa.svg')] bg-no-repeat  bg-right outline-none px-6 w-96"
          type="search"
          value={props.searchQuery}
          onChange={(e) => props.onSearch(e.target.value)}
        />
        <FiltroDashboard categoriafiltro={props.categoriafiltro} />
      </div>
      <div className="flex gap-8 items-center ">
        <button
          onClick={props.onSort}
          className="bg-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-3 py-2 flex items-center hover:scale-105  duration-150"
        >
          <img
            className="pr-2"
            src="../../public/assets/icone-ordem-alfabetica.svg"
            alt="icone filtro ordem alfabetica"
          />
          Nome
        </button>
        <button
          onClick={props.onSortByStock}
          className="bg-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-3 py-2 flex items-center hover:scale-105  duration-150"
        >
          <img
            className="pr-2"
            src="../../public/assets/FiltroEstoque.svg"
            alt="icone filtro estoque"
          />
          Estoque
        </button>
        <button className="bg-vermelho-botao text-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-4 py-3 flex items-center hover:scale-105  duration-150">
          Filtrar
        </button>
      </div>
    </section>
  );
}

export default PesquisaFiltro;
