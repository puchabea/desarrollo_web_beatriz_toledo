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

window.onload = () => {
  poblarRegiones();
  updateComunas();
  changeArguments();
};

// Válidación ----------------------------------------------------------------------

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

const validateFiles = (files) => {
  if (!files) return false;

  // validación del número de archivos
  let lengthValid = 1 <= files.length && files.length <= 3;

  // validación del tipo de archivo
  let typeValid = true;

  for (const file of files) {
    // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && typeValid;
};

const validateSelect = (select) => {
  if(!select) return false;
  return true
}

const validateSector = (sector) => {
  if (!sector) return true; 

  let lengthValid = sector.trim().length <= 100;
  return lengthValid;
};

const validateContact = (select, contactId) => {
  if (!select) return true; 
  if (!contactId) return false;

  return contactId.trim().length >= 4 && contactId.trim().length <= 50;
};

const validateEdad = (edad) => {
  if (!edad) return false;
  let re = /^[1-9]\d*$/; // uno o más dígitos, empieza en 1S
  return re.test(edad);
}

const validateFotos = (files) => {
  if (!files) return false;

  // validación del número de archivos
  let lengthValid = 1 <= files.length && files.length <= 5;

  // validación del tipo de archivo
  let typeValid = true;

  for (const file of files) {
    // el tipo de archivo debe ser "image/<foo>"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily === "image";
  }

  // devolvemos la lógica AND de las validaciones
  return lengthValid && typeValid;
};


const validateForm = () => {
  // obtener elementos del DOM usando el nombre del formulario.
  let myForm = document.forms["myForm"];
  let email = myForm["email"].value;
  let phoneNumber = myForm["phone"].value;
  let name = myForm["nombre"].value;
  let fotos = myForm["files"].files;
  let region = myForm["select-region"].value;
  let comuna = myForm["select-comuna"].value;
  let tipo = myForm["tipo"].value;
  let cantidad = myForm["cantidad"].value;
  let edad = myForm["edad"].value;
  let medida = myForm["uni_medida"].value;
  let fecha = myForm["fecha_dispo"].value;
  let sector = myForm["Sector"].value;
  let contactar = myForm["contactar_por"].value;
  let contactar_texto = myForm["comments"].value;

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
    setInvalidInput("El sector no puede superar los 100 caracteres");
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
  if (!validateContact(contactar, contactar_texto)) {
    setInvalidInput("Contactar");
  }
    if (!validateSelect(tipo)) {
    setInvalidInput("Tipo");
  }
  if (!validateSelect(cantidad)) {
    setInvalidInput("Cantidad");
  }
    if (!validateEdad(edad)) {
    setInvalidInput("Edad");
  }
  if (!validateSelect(medida)) {
    setInvalidInput("Unidad Medida Edad");
  }
    if (!validateSelect(fecha)) {
    setInvalidInput("Fecha");
  }
  if (!validateFotos(fotos)) {
    setInvalidInput("Fotos");
  }

  function changeArguments() {
  const courseSelect = document.getElementById("contactar_por");
  const reasonLabel = document.querySelector("label[for='reason']");
  const reasonTextarea = document.getElementById("comments");
  
  if (courseSelect.value !== "") {
      reasonLabel.style.display = "block";
      reasonTextarea.style.display = "block";
  } else {
      reasonLabel.style.display = "none";
      reasonTextarea.style.display = "none";
  }
}

document.getElementById("contactar_por").addEventListener("change", changeArguments);


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
    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#4CAF50";

    // Agregar botones para enviar el formulario o volver
    let submitButton = document.createElement("button");
    submitButton.innerText = "“Sí, estoy seguro";
    submitButton.style.marginRight = "10px";
    submitButton.addEventListener("click", () => {
      // myForm.submit();
      // no tenemos un backend al cual enviarle los datos
      validationMessageElem.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!";
      validationListElem.textContent = "";

      validationBox.style.backgroundColor = "#ddffdd";
      validationBox.style.borderLeftColor = "#4CAF50";

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


let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);
