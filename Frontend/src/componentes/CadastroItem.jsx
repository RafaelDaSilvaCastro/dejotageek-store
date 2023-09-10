import CardVazio from "./CardVazio";

function CadastroItem() {
  return (
    <div className="bg-white rounded-3xl p-12 flex items-center justify-center gap-36 mb-4 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
      <div className="ml-16">
        <CardVazio />
      </div>
      <div>
        <form action="" className="flex flex-col gap-8 justify-center ">
          <label className="hidden" htmlFor="nome">
            Nome
          </label>
          <input
            className=" outline-none p-2 rounded-lg w-96 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
            placeholder="Nome"
            type="text"
            name="nome"
            id="nome"
            required
          />
          <label className="hidden" htmlFor="descricao">
            Descrição
          </label>
          <input
            className=" outline-none rounded-lg w-96 h-28 p-2 pb-20 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
            placeholder="Descrição"
            type="text"
            name="descricao"
            id="descricao"
            required
          />
          <div className="flex gap-10">
            <select
              id="categoria"
              name="Categoria"
              required
              className=" outline-none drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg h-10 w-44 p-2 bg-white text-cinza-claro"
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
            <label className="hidden" for="preco">
              Preço R$
            </label>
            <input
              className=" outline-none rounded-lg w-40 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] p-2 placeholder:text-cinza-claro no-arrows"
              type="number"
              id="preco"
              name="preco"
              step="0.01"
              placeholder="Preço"
              min="0"
              required
            />
          </div>
          <div className="flex justify-around">
            <button
              className=" hover:scale-105 duration-150 bg-vermelho-pessego rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
              type="submit"
            >
              Excluir
            </button>
            <button
              className=" hover:scale-105 duration-150 bg-verde-caqui rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroItem;
