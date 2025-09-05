const foto = document.getElementById("foto");
const emergente = document.getElementById("emergente");
const emergenteImg = document.getElementById("emergente-img");
const cerrar = document.getElementById("cerrar");

// abrir emergente al clickear
foto.addEventListener("click", () => {
  emergente.style.display = "flex"; // usamos flex para centrar
  emergenteImg.src = foto.src;
});

// Cerrar emergente
cerrar.addEventListener("click", () => {
  emergente.style.display = "none";
});

