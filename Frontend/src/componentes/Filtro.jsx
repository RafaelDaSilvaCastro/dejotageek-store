function Filtro() {
  return (
    <div className="bg-white rounded-lg p-6 drop-shadow-lg text-cinza-claro gap-6 ">
      <div className="flex gap-6 items-center  flex-col">
        <div className="flex items-center gap-3 justify-end">
          <p>Data</p>
          <p>De</p>
          <input
            className=" rounded-lg p-2 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none "
            type="date"
          />
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <p>Até</p>
          <input
            className="h-10 p-2 rounded-lg drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none "
            type="date"
          />
        </div>
      </div>
      <div className="flex items-center justify-end ">
        <select
          id="categoria"
          name="Categoria"
          required
          className="  outline-none drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg h-10 p-2 bg-white text-cinza-claro w-full mt-6 "
        >
          <option className="text-zinc-800" value="Categoria 1">
            Categoria
          </option>
          <option className="text-zinc-800" value="Categoria 2">
            Categoria2
          </option>
          <option className="text-zinc-800" value="Categoria 3">
            Categoria3
          </option>
        </select>
      </div>
    </div>
  );
}

export default Filtro;
