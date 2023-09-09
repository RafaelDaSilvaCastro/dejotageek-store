import ItemLista from "../../componentes/ItemLista";
import PesquisaFiltro from "../../componentes/PesquisaFiltro";

function Stock() {
  return (
    <div>
      <PesquisaFiltro />
      <ul className="grid grid-cols-7 gap-4 justify-items-center items-center border-b border-cinza-claro pt-10 pb-2">
        <li className="">Imagem</li>
        <li className="">Nome</li>
        <li className="">Código</li>
        <li className="">Descrição</li>
        <li className="">Categoria</li>
        <li className="">Preço</li>
        <li className="">Estoque</li>
      </ul>
      <ItemLista />
      <ItemLista />
      <ItemLista />
      <ItemLista />
      <ItemLista />
      <ItemLista />
      <ItemLista />
    </div>
  );
}

export default Stock;
