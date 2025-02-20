
// Función para agregar eventos solo si el elemento existe
function addEventListenerIfExists(id, event, callback) {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener(event, callback);
    }
  }
  
  // Eventos con verificación
  addEventListenerIfExists("cerrarModalUsuario", "click", () => {
    modalModificarUsuario.classList.toggle("dnone");
  });
  
  // Cerrar el modal al hacer clic fuera de él
  addEventListenerIfExists("modalModificarUsuario", "click", (event) => {
    if (event.target === modalModificarUsuario) {
      modalModificarUsuario.classList.toggle("dnone");
    }
  });


  
const cargarDatosModal = async (tr) => {
    modalID.value = tr.dataset.id || "";
    modalNombre.value = tr.dataset.nombre || "";
    modalApellido.value = tr.dataset.apellido || "";
    modalEmail.value = tr.dataset.email || "";
    modalPassword.value = tr.dataset.password || "";
    modalConfirmPassword.value = tr.dataset.password || "";
    modalCentro.value = tr.dataset.centro || "";
    modalRol.value = tr.dataset.rol || "";
  };

  
const validarModal = () => {
    // console.log("validar modal");
    let correcto = true;
    if (modalEmail.validity.valueMissing) {
      errorEmail.textContent = "Debe introducir el e-mail";
      correcto = false;
    } else if (modalEmail.validity.typeMismatch) {
      errorEmail.textContent = "El formato de e-mail no es válido";
      correcto = false;
    } else {
      errorEmail.textContent = "";
    }
  
    //añadir el pattern y hacer la validacion del patternMissMatch
  
    if (modalPassword.validity.valueMissing) {
      errorPassword.textContent = "Debe introducir la contraseña";
      correcto = false;
    } else if (modalPassword.validity.typeMismatch) {
      errorPassword.textContent = "La contraseña está mal conformada";
      correcto = false;
    } else if (modalPassword.validity.patternMismatch) {
      errorPassword.textContent = "La contraseña debe seguir un patrón";
      correcto = false;
    } else {
      errorPassword.textContent = "";
    }
  
    if (modalConfirmPassword.validity.valueMissing) {
      errorConfirmPassword.textContent = "Debe repetir la contraseña";
      correcto = false;
    } else if (modalConfirmPassword.validity.typeMismatch) {
      errorConfirmPassword.textContent = "La contraseña está mal conformada";
      correcto = false;
    } else if (modalPassword.value != modalConfirmPassword.value) {
      errorConfirmPassword.textContent = "Las contraseñas no coinciden";
      correcto = false;
    } else {
      errorConfirmPassword.textContent = "";
    }
  
    // hay que hacer la validcion par que no se introduzcan cambios vacios (nombre, apellido, centro)
  
    // modalNombre
    // modalApellido
    // modalCentro
  
    // nombre
    if (modalNombre.validity.valueMissing) {
      correcto = false;
      errorNombre.textContent = "El nombre no puede estar vacío";
    } else {
      errorNombre.textContent = "";
    }
    // apellido
    if (modalApellido.validity.valueMissing) {
      correcto = false;
      errorApellido.textContent = "El apellido no puede estar vacío";
    } else {
      errorApellido.textContent = "";
    }
    // centro
    if (modalCentro.validity.valueMissing) {
      correcto = false;
      errorCentro.textContent = "El centro no puede estar vacío";
    } else {
      errorCentro.textContent = "";
    }
  
    return correcto;
  };