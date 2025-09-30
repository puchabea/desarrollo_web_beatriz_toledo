const validateName = (name) => {
  if(!name) return false;
  let lengthValid = name.trim().length >= 3 && name.trim().length <= 200;
  
  return lengthValid;
}

const validateEmail = (email) => {
  if (!email) return false;
  let lengthValid = email.length <= 100;

  // validamos el formato
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};

const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return true;
  // validación de longitud
  let lengthValid = phoneNumber.length >= 8;

  // validación de formato
  let re = /^\+\d{1,3}\.\d{8,12}$/; // con el punto incluido
  let formatValid = re.test(phoneNumber);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};

// valida cada foto agregada
const validateFiles = (container) => {
  if (!container) return false;

  let inputs = container.querySelectorAll("input[type='file']");
  let totalFiles = 0;

  for (let input of inputs) {
    if (input.files) {
      totalFiles += input.files.length;
      for (let file of input.files) {
        let fileFamily = file.type.split("/")[0];
        if (!(fileFamily === "image" || file.type === "application/pdf")) {
          return false;
        }
      }
    }
  }
  return totalFiles >= 1 && totalFiles <= 3;
};


const validateSelect = (select) => {
  if(!select) return false;
  return true;
}

const validateSector = (sector) => {
  if (!sector) return true; 

  let lengthValid = sector.trim().length <= 100;
  return lengthValid;
};

// valida cada bloque nuevo de contactar por
const validateContact = (contact) => {
  let block = contact.querySelectorAll(".contactar_block");

  for (const blocks of block) {
    let select = blocks.querySelector("select");
    let textarea = blocks.querySelector("textarea");

    // si no hay select o textarea en el bloque, saltamos
    if (!select || !textarea) continue;

    if (validateSelect(select.value)) {
      let textLength = textarea.value.trim().length;
      if (textLength < 4 || textLength > 50) return false;
    }
  }
  return true;
};

// valida edad y cantidad
const validateEdad_Cantidad = (edad) => {
  if (!edad) return false;
  let re = /^[1-9]\d*$/; // uno o más dígitos, empieza en 1
  return re.test(edad);
}

const validateFecha = (fecha) => {
  if (!fecha) return false; 

  let re = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  if (!re.test(fecha)) return false;

  let inputDate = new Date(fecha); // fecha y hora actual

  // fecha mínima = ahora + 3 horas
  let minDate = new Date();
  minDate.setHours(minDate.getHours() + 3);

  return inputDate >= minDate;
};

const validateForm = () => {
  // obtener elementos del DOM usando el nombre del formulario.
  let myForm = document.forms["myForm"];
  let email = myForm["email"].value;
  let phoneNumber = myForm["phone"].value;
  let name = myForm["nombre"].value;
  let fotos = document.getElementById("foto-container");
  let region = myForm["select-region"].value;
  let comuna = myForm["select-comuna"].value;
  let tipo = myForm["tipo"].value;
  let cantidad = myForm["cantidad"].value;
  let edad = myForm["edad"].value;
  let medida = myForm["uni_medida"].value;
  let fecha = myForm["fecha_dispo"].value;
  let sector = myForm["sector"].value;
  let contactar = document.getElementById("contactar_container");

  // variables auxiliares de validación y función.
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // lógica de validación
  if (!validateSelect(region)) {
    setInvalidInput("Región");
  }
  if (!validateSelect(comuna)) {
    setInvalidInput("Comuna");
  }
  if (!validateSector(sector)) {
    setInvalidInput("Sector");
  }
  if (!validateName(name)) {
    setInvalidInput("Nombre");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Email");
  }
  if (!validatePhoneNumber(phoneNumber)) {
    setInvalidInput("Número");
  }
  if (!validateContact(contactar)) {
    setInvalidInput("Contactar");
  }
    if (!validateSelect(tipo)) {
    setInvalidInput("Tipo");
  }
  if (!validateEdad_Cantidad(cantidad)) {
    setInvalidInput("Cantidad");
  }
  if (!validateEdad_Cantidad(edad)) {
    setInvalidInput("Edad");
  }
  if (!validateSelect(medida)) {
    setInvalidInput("Unidad Medida Edad");
  }
  if (!validateFecha(fecha)) {
    setInvalidInput("Fecha");
  }
  if (!validateFiles(fotos)) {
    setInvalidInput("Fotos");
  }

   // finalmente mostrar la validación
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");
  let formContainer = document.querySelector(".main-container");

  if (!isValid) {
    validationListElem.textContent = "";
    // agregar elementos inválidos al elemento val-list.
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    // establecer val-msg
    validationMessageElem.innerText = "Los siguientes campos son inválidos:";

    // aplicar estilos de error
    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";

    // hacer visible el mensaje de validación
    validationBox.hidden = false;
  } else {
    // Ocultar el formulario
    myForm.style.display = "none";

    // establecer mensaje de éxito
    validationMessageElem.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
    validationListElem.textContent = "";

    // aplicar estilos de éxito
    validationBox.style.backgroundColor = "#f09a73ff";
    validationBox.style.borderLeftColor = "#f07d30ff";

    // Agregar botones para enviar el formulario o volver
    let submitButton = document.createElement("button");
    submitButton.innerText = "Sí, estoy seguro";
    submitButton.style.marginRight = "11px";
    submitButton.addEventListener("click", () => {
      // myForm.submit();
      // no tenemos un backend al cual enviarle los datos
      validationMessageElem.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!";
      validationListElem.textContent = "";

      validationBox.style.backgroundColor = "#f09a73ff";
      validationBox.style.borderLeftColor = "#f39657ff";

      // Crear botón para volver a la portada
      let homeButton = document.createElement("button");
      homeButton.innerText = "Volver a la portada";
      homeButton.addEventListener("click", () => {
        window.location.href = "portada.html"; 
      });
      validationListElem.appendChild(homeButton);
    });

    let backButton = document.createElement("button");
    backButton.innerText = "No, no estoy seguro, quiero volver al formulario";
    backButton.addEventListener("click", () => {
      // Mostrar el formulario nuevamente
      myForm.style.display = "block";
      validationBox.hidden = true;
    });

    validationListElem.appendChild(submitButton);
    validationListElem.appendChild(backButton);

    // hacer visible el mensaje de validación
    validationBox.hidden = false;
  }
};


const agregarFotos = () => {
  let container = document.getElementById("foto-container");
  let files = container.querySelectorAll("input[type='file']");

  let lengthValid = 1 <= files.length && files.length <= 4;

  if (lengthValid) {
    let input = document.createElement("input");
    input.type = "file";
    input.name = "files"; 
    container.appendChild(input);
  }
  // oculta boton
  if (files.length == 4) {
    let addBtn = document.getElementById("add-foto-btn");
    addBtn.style = "display: none;";
  }
};

// bloque para cada contacto
const agregarContacto = () => {
  let div = document.getElementById("contactar_container");
  let blocks = div.querySelectorAll(".contactar_block");

  // colocamos restricción de 5 bloques
  if (blocks.length <= 5) {
    let block = document.createElement("div");
    block.className = "contactar_block";

    block.innerHTML = `
      <select name="contactar_por">
        <option value="">-- Selecciona una opción para contactar --</option>
        <option>Whatsapp</option>
        <option>Telegram</option>
        <option>X</option>
        <option>Instagram</option>
        <option>Tiktok</option>
        <option>Otra</option>
      </select>
      <label style="display:none;">Información de contacto (ID / URL)</label>
      <textarea name="comments" rows="4" cols="40" style="display:none;"></textarea>
    `;

    // evento para el select dentro del bloque
    let select = block.querySelector("select");
    let label = block.querySelector("label");
    let textarea = block.querySelector("textarea");

    select.addEventListener("change", () => {
      if (select.value !== "") {
        label.style.display = "block";
        textarea.style.display = "block";
      } else {
        label.style.display = "none";
        textarea.style.display = "none";
      }
    });

    div.appendChild(block);
  }
  // oculta boton
  if (blocks.length == 5) {
    let addBtn = document.getElementById("add-contacto-btn");
    addBtn.style = "display: none;";
  }
};

const actualizarFecha = () => {
  let fecha_dispo = document.getElementById("fecha_dispo");
  let hoy = new Date();

  hoy.setHours(hoy.getHours() + 3);

  const AAAA = hoy.getFullYear();
  const MM = rellenarCeros(hoy.getMonth() + 1);
  const DD =  rellenarCeros(hoy.getDate());
  const HH = rellenarCeros(hoy.getHours());
  const mm =  rellenarCeros(hoy.getMinutes());

  fecha_dispo.value = AAAA + "-" + MM + "-" + DD + "T" + HH + ":" + mm;
};

const rellenarCeros = (numero) => {
  let respuesta = "";
    if (numero < 10) {
      respuesta = "0" + numero;
      return respuesta;
    } else {
      return String(numero);
    }
};

document.getElementById("add-foto-btn").addEventListener("click", agregarFotos);
document.getElementById("add-contacto-btn").addEventListener("click", agregarContacto);

window.onload = () => {
  poblarRegiones();
  updateComunas();
  agregarContacto();
  actualizarFecha();
}; 

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);