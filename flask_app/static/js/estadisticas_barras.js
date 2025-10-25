fetch("/get/avisos_por_mes")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al obtener datos del servidor");
    }
    return response.json();
  })
  .then(data => {
    const perros = data.perros;
    const gatos = data.gatos;
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    Highcharts.chart("grafico3", {
      chart: {
        type: "column",
        backgroundColor: "#ffffff"
      },
      title: {
        text: "Avisos de adopción por mes y tipo de mascota",
        style: { fontSize: "18px", fontWeight: "bold", color: "#000000" }
      },
      xAxis: {
        categories: meses,
        crosshair: true,
        labels: { style: { color: "#000000" } },
        title: { text: "Mes", style: { color: "#000000" } }
      },
      yAxis: {
        min: 0,
        title: { text: "Cantidad de avisos", style: { color: "#000000" } },
        labels: { style: { color: "#000000" } },
        gridLineColor: "#f0f0f0"
      },
      tooltip: {
        shared: true,
        backgroundColor: "#ffffff",
        style: { color: "#000000" },
        formatter: function () {
          const perrosVal = this.points.find(p => p.series.name === "Perros")?.y || 0;
          const gatosVal = this.points.find(p => p.series.name === "Gatos")?.y || 0;
          return `<b>${this.x}</b><br/>Perros: ${perrosVal}<br/>Gatos: ${gatosVal}`;
        }
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          groupPadding: 0.1
        }
      },
      series: [
        {
          name: "Perros",
          data: perros,
          color: "#666666"
        },
        {
          name: "Gatos",
          data: gatos,
          color: "#ff9900"
        }
      ]
    });
  })
  .catch(error => {
    console.error("Error al cargar el gráfico:", error);
    document.getElementById("grafico3").innerText =
      "No se pudo cargar el gráfico.";
  });
