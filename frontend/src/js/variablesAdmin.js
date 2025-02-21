const Sortable = window.Sortable;
const tbody = document.getElementById("usersTableBody");
const modalModificarUsuario = document.getElementById("modalModificarUsuario");
const modalID = document.getElementById("modalID");
const modalNombre = document.getElementById("modalNombre");
const modalApellido = document.getElementById("modalApellido");
const modalEmail = document.getElementById("modalEmail");
const modalPassword = document.getElementById("modalPassword");
const modalConfirmPassword = document.getElementById("modalConfirmPassword");
const modalCentro = document.getElementById("modalCentro");
const modalRol = document.getElementById("modalRol");
const guardarCambiosBtn = document.getElementById("guardarCambiosBtn");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");
const errorConfirmPassword = document.getElementById("errorConfirmPassword");
const table = document.getElementById("usersTable");
//
let errorNombre = document.getElementById("errorNombre");
let errorApellido = document.getElementById("errorApellido");
let errorCentro = document.getElementById("errorCentro");
// Declarar `notifier` globalmente
let notifier;
