// Seleccionar región
const poblarRegiones = () => {
  let regionSelect = document.getElementById("select-region");

  for (const numero in region_comuna.regiones) {
    let region = region_comuna.regiones[numero];
    let option = document.createElement("option");
    option.value = numero;
    option.text = region.nombre;
    regionSelect.appendChild(option);
  }
};

const updateComunas = () => {
  let regionSelect = document.getElementById("select-region");
  let comunaSelect = document.getElementById("select-comuna");
  let selectedNumero = regionSelect.value;

  comunaSelect.innerHTML = '<option value="">-- Selecciona una Comuna --</option>';

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

document.getElementById("select-region").addEventListener("change", updateComunas);


