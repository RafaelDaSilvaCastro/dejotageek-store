import CardVazio from "./CardVazio";
import blogFetch from "../axios/config";

async function createItem(event) {
  event.preventDefault();

  // Pega os valores dos inputs
  const pnome = document.getElementById('nome').value
   const pdescricao = document.getElementById('descricao').value
   const ppreco = document.getElementById('preco').value
   const pcategoria = document.getElementById('categoria').value


  alert(pcategoria)
  // Envia os dados do formulário para um servidor
 /* try{
    const response = await blogFetch.post('/produto', {
      nome: pnome,
      descricao: pdescricao,
      preco : ppreco,
      estoque : 0,
      categoria : pcategoria 
    }  )
    alert('foi')
  }catch(err){
    alert('deu pau')
    console.log('Erro: ' + err)
  }  */
}


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
            className="nome outline-none p-2 rounded-lg w-96 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
            placeholder="Nome"
            type="text"
            name="nome"
            id="nome"
            required
            key="nome"
          />
          <label className="hidden" htmlFor="descricao">
            Descrição
          </label>
          <input
            className="descricao outline-none rounded-lg w-96 h-28 p-2 pb-20 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
            placeholder="Descrição"
            type="text"
            name="descricao"
            id="descricao"
            required
            key="descricao"
          />
          <div className="categoria flex gap-10">
            <select
              id="categoria"
              name="Categoria"
              required
              className=" outline-none drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg h-10 w-44 p-2 bg-white text-cinza-claro"
              key="categoria"
            >
              <option value="" >Selecione uma categoria</option>
              <option className="text-zinc-800" value="CAMISA">
                CAMISA
              </option>
              <option className="text-zinc-800" value="ACTIONFIGURE" selected>
                ACTIONFIGURE
              </option>
              <option className="text-zinc-800" value="DECORACAO">
                DECORACAO
              </option>
              <option className="text-zinc-800" value="ACESSORIOS">
                ACESSORIOS
              </option>              
            </select> 
            <label className="hidden" for="preco">
              Preço R$
            </label>
            <input
              className="preco outline-none rounded-lg w-40 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] p-2 placeholder:text-cinza-claro no-arrows"
              type="number"
              id="preco"
              name="preco"
              step="0.01"
              placeholder="Preço"
              min="0"
              required
              key="preco"
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
              type="button"
              onClick={createItem}
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