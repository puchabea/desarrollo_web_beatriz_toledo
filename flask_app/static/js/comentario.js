const validate_comentario_nombre = (name) => {
  if(!name) return false;
  let lengthValid = name.length >= 3 && name.length <= 80;
  
  return lengthValid;
}

const validate_comentario_texto = (texto) => {
  if(!texto) return false;
  let lengthValid = texto.length >= 5;
  
  return lengthValid;
}

async function agregarComentario(id) {
  let form = document.forms["form"];
  let nombre = form["nombre"].value;
  let texto = form["texto"].value;

  let invalidInputs = [];
  let isValid = true;

  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  if (!validate_comentario_nombre(nombre)) {
    setInvalidInput("Nombre");
  }
  if (!validate_comentario_texto(texto)) {
    setInvalidInput("Comentario");
  }

  if (!isValid) {
    let errorMsg = document.getElementById("error-msg");
    errorMsg.textContent = "Datos inválidos. Revisa el nombre o el comentario.";
  } else {
    try {
      const response = await fetch(`${window.origin}/agregar_comentario/${id}`, {
        method: "POST",
        body: JSON.stringify({ nombre: nombre, texto: texto }),
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Respuesta errónea: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
      form.reset();
      cargarComentarios(id); 

    } catch (error) {
      console.error("Hubo un problema al agregar el comentario:", error);
      let errorMsg = document.getElementById("error-msg");
      errorMsg.textContent = "Error al conectar con el servidor.";
    }
  }
}

async function cargarComentarios(id) {
  fetch(`${window.origin}/comentarios/${id}`)
    .then((response) => response.json())
    .then((data) => {
      let commentBox = document.getElementById("comentarios");
      commentBox.innerHTML = ""; // limpiar antes

      // Si no hay comentarios
      if (!data || data.length === 0) {
        let vacio = document.createElement("p");
        vacio.textContent = "No hay comentarios.";
        commentBox.appendChild(vacio);
        return;
      }

      // Renderizar comentarios
      for (const comentario of data) {
        let div = document.createElement("div");
        div.className = "comentario";

        // contenedor superior: nombre y fecha
        let autorFecha = document.createElement("div");
        autorFecha.className = "comentario-autor-fecha";

        let autor = document.createElement("span");
        autor.className = "comentario-autor";
        autor.textContent = comentario.nombre;

        let fecha = document.createElement("span");
        fecha.className = "comentario-fecha";
        fecha.textContent = comentario.fecha;

        autorFecha.appendChild(autor);
        autorFecha.appendChild(fecha);

        // texto del comentario
        let texto = document.createElement("p");
        texto.className = "comentario-texto";
        texto.textContent = comentario.texto;

        div.appendChild(autorFecha);
        div.appendChild(texto);
        commentBox.appendChild(div);
      }
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los comentarios:", error);
    });
}





