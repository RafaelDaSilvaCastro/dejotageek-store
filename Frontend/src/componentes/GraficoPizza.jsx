import Chart from "react-apexcharts";

function GraficoPizza() {
  // Defina os dados para o gráfico de pizza
  const data = {
    labels: ["Categoria1", "Categoria2", "Categoria3", "Categoria4"],
    series: [44, 55, 13, 43], // Valores correspondentes às fatias da pizza
  };

  // Config do gráfico
  const options = {
    chart: {
      type: "pie",
    },
    labels: data.labels,
    colors: ["#F765A3", "#A155B9", "#16BFD6", "#1DDD8D"],
  };

  return (
    <div>
      <Chart options={options} series={data.series} type="pie" width="380" />
    </div>
  );
}

export default GraficoPizza;
