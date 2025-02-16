// Función para agregar eventos solo si el elemento existe
function addEventListenerIfExists(id, event, callback) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener(event, callback);
  }
}

// Eventos con verificación
addEventListenerIfExists("cerrarModalCassete", "click", () => {
  document.getElementById("modalModificarCassette").classList.toggle("hidden");
});

addEventListenerIfExists("cerrar", "click", () => {
  document.getElementById("nuevoCassete").classList.toggle("hidden");
});

addEventListenerIfExists("toggleModal", "click", () => {
  document.getElementById("nuevoCassete").classList.toggle("hidden");
});

addEventListenerIfExists("cerrarModal", "click", () => {
  document.getElementById("nuevoCassete").classList.toggle("hidden");
});

addEventListenerIfExists("eliminarCassete", "click", () => {
  document.getElementById("deleteModal").classList.toggle("hidden");
});

addEventListenerIfExists("cancelDelete", "click", () => {
  document.getElementById("deleteModal").classList.toggle("hidden");
});

addEventListenerIfExists("modificarCassete", "click", () => {
  document.getElementById("modalModificarCassette").classList.toggle("hidden");
});
