import FiltroDashboard from "../../componentes/FiltroDashboard";
import GraficoColunas from "../../componentes/GraficoColunas";
import GraficoPizza from "../../componentes/GraficoPizza";
function Dashboard() {
  return (
    <div className="flex flex-col">
      <FiltroDashboard />
      <div className="flex flex-col mt-12 gap-y-4 py-4 bg-white rounded-xl drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-evenly py-6 mr-36 gap-x-24">
          <h2 className="text-xl">Vendas</h2>
          <h2 className="text-xl">Compras</h2>
        </div>
        <div className="w-auto h-0.5 bg-cinza-barra mx-36"></div>
        <div className="flex items-center justify-evenly mx-36">
          <GraficoPizza />
          <GraficoPizza />
        </div>
      </div>
      <div className="flex flex-col mt-12 mb-8 gap-y-4 p-16 bg-white rounded-xl drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between px-8">
          <h2 className="text-cinza-grafico font-semibold">Lucros/Gastos</h2>
          <img src="../../../public/assets/icone-info.png" alt="icone info" />
        </div>
        <GraficoColunas />
      </div>
    </div>
  );
}

export default Dashboard;
