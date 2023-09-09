function PesquisaFiltro() {
  return (
    <section className="flex items-center gap-8">
      <input
        className="drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg p-2.5 bg-[url('../../public/assets/icone-lupa.svg')] bg-no-repeat  bg-right outline-none px-6 w-96"
        type="search"
      />
      <button className="bg-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-3 py-2 flex items-center hover:scale-105  duration-150">
        <img
          className="pr-2"
          src="../../public/assets/icone-ordem-alfabetica.svg"
          alt="icone filtro ordem alfabetica"
        />
        Nome
      </button>
      <button className="bg-white drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg px-3 py-2 flex items-center hover:scale-105  duration-150">
        <img
          className="pr"
          src="../../public/assets/icone-filtro.svg"
          alt="icone filtro"
        />
        Filtro
      </button>
    </section>
  );
}

export default PesquisaFiltro;
