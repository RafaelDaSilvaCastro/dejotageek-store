import React from "react";
import Chart from "react-apexcharts";

function GraficoPizza(props) {
  const options = {
    chart: {
      type: "pie",
    },
    labels: props.labels,
    colors: ["#F765A3", "#A155B9", "#16BFD6", "#1DDD8D", "#F7B801", "#F7630C", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800"],
  };

  return (
    <div>
      <Chart options={options} series={props.series} type="pie" width="380" />
    </div>
  );
}

export default GraficoPizza;
