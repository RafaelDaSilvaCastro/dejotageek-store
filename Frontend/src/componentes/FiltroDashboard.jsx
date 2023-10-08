import React from "react";

function FiltroDashboard(props) {
  return (
    <div className="flex items-center text-cinza-claro gap-7">
      <div className="flex items-center gap-2 ">
        <label htmlFor="date" className="hidden"></label>
        <p>De</p>
        <input
          className=" rounded-lg p-2 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none w-48 "
          type="date"
          id="date"
          required
          placeholder="De"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="date" className="hidden"></label>
        <p>Até</p>
        <input
          className=" rounded-lg p-2 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none w-48 "
          type="date"
          id="date"
          required
          placeholder="De"
        />
      </div>
      <div className="flex items-center">
        <select
          id="categoria"
          name="Categoria"
          required
          className="  outline-none drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg h-10 p-2 bg-white text-cinza-claro w-64 "
        >
          {props.categoriafiltro && props.categoriafiltro.map((categoria) => (
            <option className="text-zinc-800" value={categoria}>
              {categoria}
            </option>
          ))}



        </select>
      </div>
    </div>
  );
}

export default FiltroDashboard;
