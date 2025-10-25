fetch("/get/avisos_por_tipo")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al obtener datos del servidor");
    }
    return response.json();
  })
  .then(data => {
    const categorias = data.map(item => item.tipo);
    const valores = data.map(item => item.cantidad);

    Highcharts.chart("grafico2", {
      chart: {
        type: "pie",
        backgroundColor: "#ffffff"
      },
      title: {
        text: "Distribución de avisos por tipo de mascota",
        style: { color: "#000000", fontSize: "18px", fontWeight: "bold" }
      },
      tooltip: {
        pointFormat: "<b>{point.y} avisos</b> ({point.percentage:.1f}%)",
        backgroundColor: "#ffffff",
        style: { color: "#000000" }
      },
      accessibility: { point: { valueSuffix: "%" } },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            color: "#000000"
          },
          colors: ["#ff9900", "#666666"] // gatos naranjos, perros grises
        }
      },
      series: [{
        name: "Mascotas",
        colorByPoint: true,
        data: categorias.map((tipo, i) => ({
          name: tipo.toLowerCase() === "gato" ? "Gatos" : "Perros",
          y: valores[i]
        }))
      }]
    });
  })
  .catch(error => {
    console.error("Error al cargar el gráfico:", error);
    document.getElementById("grafico2").innerText =
      "No se pudo cargar el gráfico.";
  });
