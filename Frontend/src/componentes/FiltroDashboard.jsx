import React, { useState, useRef, useEffect } from "react";

function FiltroDashboard(props) {

  return (
    <div className="flex items-center text-cinza-claro gap-7">
      <div className="flex items-center gap-2 ">
        <label htmlFor="date" className="hidden"></label>
        <p>De</p>
        <input
          className=" rounded-lg p-2 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none w-48 "
          type="date"
          id="dateInicio"
          placeholder="De"
          onChange={(e) => props.onFilterDateStart(props.htmlFilterDateStart(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="date" className="hidden"></label>
        <p>Até</p>
        <input
          className=" rounded-lg p-2 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] outline-none w-48 "
          type="date"
          id="dateFim"
          placeholder="Ate"
          onChange={(e) => props.onFilterDateEnd(props.htmlFilterDateEnd(e.target.value))}
        />
      </div>
      <div className="flex items-center">
        <select
          id="categoria"
          name="Categoria"
          className="  outline-none drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg h-10 p-2 bg-white text-cinza-claro w-64 "
          onChange={null}
        >
        </select>
      </div>
    </div>
  );
}

export default FiltroDashboard;
