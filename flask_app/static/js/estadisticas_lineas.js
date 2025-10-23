fetch("/api/avisos_por_dia")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al obtener datos del servidor");
    }
    return response.json();
  })
  .then(data => {
    const categorias = data.map(item => item.dia);
    const valores = data.map(item => item.cantidad);

    Highcharts.chart("grafico1", {
      chart: {
        type: "line",
        backgroundColor: "#ffffff",
        borderRadius: 8,
        shadow: false
      },
      title: {
        text: "Cantidad de avisos de adopción por día",
        style: { fontSize: "18px", fontWeight: "bold", color: "#000000" }
      },
      xAxis: {
        categories: categorias,
        title: { text: "Día de ingreso", style: { color: "#000000" } },
        labels: { rotation: -45, style: { color: "#000000" } }
      },
      yAxis: {
        title: { text: "Cantidad de avisos", style: { color: "#000000" } },
        labels: { style: { color: "#000000" } },
        gridLineColor: "#e0e0e0"
      },
      tooltip: {
        shared: true,
        backgroundColor: "#ffffff",
        borderColor: "#ff9900",
        borderRadius: 8,
        style: { color: "#000000" },
        formatter: function () {
          return `<b>${this.x}</b><br/>Avisos: <b>${this.y}</b>`;
        }
      },
      legend: { enabled: false },
      series: [{
        name: "Avisos",
        data: valores,
        color: "#ff9900",
        lineWidth: 3,
        marker: {
          radius: 5,
          fillColor: "#ff9900",
          lineColor: "#ff9900"
        }
      }]
    });
  })
  .catch(error => {
    console.error("Error al cargar el gráfico:", error);
    document.getElementById("grafico1").innerText =
      "No se pudo cargar el gráfico.";
  });
