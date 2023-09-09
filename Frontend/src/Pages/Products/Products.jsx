import PesquisaFiltro from "../../componentes/PesquisaFiltro";
import Cards from "../../componentes/Cards";
import Card from "../../componentes/Card";

function Products() {
  return (
    <section>
      <PesquisaFiltro />
      <div className="flex items-center pb-12 pt-16 justify-around">
        <div className="flex flex-col justify-center items">
          <Cards />
        </div>
        <div className="h-barraCinza w-0.5 mr-18 bg-cinza-claro"></div>
        <Card />
      </div>
      <button className="  bg-vermelho-botao rounded-2xl p-2  flex mx-auto mb-16 hover:scale-110 duration-150 hover:bg-vermelho-botaoHover">
        <img src="../../../public/assets/icone-soma.svg" alt="" />
      </button>
    </section>
  );
}

export default Products;
