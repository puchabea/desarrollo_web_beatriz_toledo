// poblar el select de regiones
const poblarRegiones = () => {
  let regionSelect = document.getElementById("select-region");

  for (const numero in region_comuna.regiones) {
    let region = region_comuna.regiones[numero];
    let option = document.createElement("option");
    option.value = numero;   // el número de la región
    option.text = region.nombre; // el nombre de la región
    regionSelect.appendChild(option);
  }
};

// actualizar comunas según la región elegida
const updateComunas = () => {
  let regionSelect = document.getElementById("select-region");
  let comunaSelect = document.getElementById("select-comuna");
  let selectedNumero = regionSelect.value;

  comunaSelect.innerHTML = '<option value="">-- Selecciona una Comuna --</option>';

  // como ahora es un objeto, accedemos directo con la clave
  let region = region_comuna.regiones[selectedNumero];
  if (region) {
    region.comunas.forEach(comuna => {
      let option = document.createElement("option");
      option.value = comuna;
      option.text = comuna;
      comunaSelect.appendChild(option);
    });
  }
};

// eventos
document.getElementById("select-region").addEventListener("change", updateComunas);

// al cargar la página
window.onload = () => {
  poblarRegiones();
  updateComunas();
};
