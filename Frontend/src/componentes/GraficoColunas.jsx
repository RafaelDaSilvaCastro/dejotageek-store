import React from "react";
import Chart from "react-apexcharts";

function GraficoBarras() {
  const data = {
    categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    series: [
      {
        name: "Lucros",
        data: [3000, 4000, 3500, 5000, 4500],
      },
      {
        name: "Gastos",
        data: [1500, 2000, 1800, 2200, 2100],
      },
    ],
  };

  const options = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: data.categories,
    },
    legend: {
      position: "bottom",
    },
    colors: ["#63ABFD", "#E697FF"],

    bar: {
      horizontal: false,
      columnWidth: "55%",
      dataLabels: {
        position: "top",
      },
    },

    stroke: {
      show: true, // Mostrar o stroke
      width: 2, // Largura do stroke
      colors: ["#165BAA", "#A155B9"], // Cor do stroke (transparente neste exemplo)
    },
  };

  return (
    <div>
      <Chart options={options} series={data.series} type="bar" height="450" />
    </div>
  );
}

export default GraficoBarras;
