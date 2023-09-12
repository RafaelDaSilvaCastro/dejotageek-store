import FiltroDashboard from "../../componentes/FiltroDashboard";
import GraficoPizza from "../../componentes/GraficoPizza";
function Dashboard() {
  return (
    <div className="flex flex-col">
      <FiltroDashboard />
      <div className="flex bg-white">
        <GraficoPizza />
        <GraficoPizza />
      </div>
    </div>
  );
}

export default Dashboard;
