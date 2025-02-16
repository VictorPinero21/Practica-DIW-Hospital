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

//Funcion para arrancar la aplicacion
const setup = () => {
  cargarAlumnos();
};

// Función para cargar sólo los usuarios con rol "alumno"
const cargarAlumnos = async () => {
  try {
    const results = await fetch("http://localhost:5001/api/usuario");
    if (!results.ok) throw new Error("Error al obtener usuarios");

    const usuarios = await results.json();
    tbody.innerHTML = ""; // Limpiar la tabla

    const alumnos = usuarios.filter((usuario) => usuario.rol === "alumno");
    let fragment = document.createDocumentFragment();
    let tr;

    alumnos.forEach((usuario) => {
      tr = document.createElement("tr");
      tr.classList.add("bg-[#ffffff]", "text-sm");

      // Asignar los datos del usuario como atributos data- en el tr
      tr.dataset.id = usuario.id;
      tr.dataset.nombre = usuario.nombre;
      tr.dataset.apellido = usuario.apellido;
      tr.dataset.email = usuario.email;
      tr.dataset.password = usuario.password;
      tr.dataset.centro = usuario.centro ?? "N/A";
      tr.dataset.rol = usuario.rol;

      tr.innerHTML = `
        <td class="px-4 py-2 border-b border-[#a0c6e8]">${usuario.nombre}</td>
        <td class="px-4 py-2 border-b border-[#a0c6e8]">${usuario.apellido}</td>
        <td class="px-4 py-2 border-b border-[#a0c6e8]">${usuario.email}</td>
        <td class="px-4 py-2 border-b border-[#a0c6e8]">${usuario.password}</td>
        <td class="px-4 py-2 border-b border-[#a0c6e8]">${usuario.centro ?? "N/A"}</td>
        <td class="px-4 py-2 border-b border-[#a0c6e8]">${usuario.rol}</td>
        <td class="px-4 py-2 border-b border-[#a0c6e8]">
          <div class="flex space-x-2 justify-center">
            <!-- Botón de eliminación -->
            <button class="text-red-500 hover:text-red-700 hover:cursor-pointer" data-id="${usuario.id}" title="Borrar">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Botón de edición -->
            <button class="text-blue-500 hover:text-blue-700 hover:cursor-pointer" data-id="${usuario.id}" title="Editar" id="editar${usuario.id}">
              <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
              </svg>
            </button>

            <!-- Botón de promoción -->
            <button class="text-green-500 hover:text-green-700 hover:cursor-pointer" data-id="${usuario.id}" title="Promocionar">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </td>
      `;
      fragment.append(tr);
    });

    tbody.append(fragment);

    // Asignar eventos a todos los botones de eliminación, edición y promoción
    alumnos.forEach((usuario) => {
      const row = document.querySelector(`[data-id="${usuario.id}"]`);

      // Eliminar usuario
      const deleteButton = row.querySelector("button[title='Borrar']");
      deleteButton.addEventListener("click", eliminarUsuario);

      // Asignar eventos a los botones de edición después de renderizar la tabla
      const editButton = row.querySelector("button[title='Editar']");
      editButton.addEventListener("click", () => {
        modalModificarUsuario.classList.toggle("dnone");
        cargarDatosModal(tr);
      });

      // Promocionar usuario
      const promoteButton = row.querySelector("button[title='Promocionar']");
      promoteButton.addEventListener("click", promocionarUsuario);
    });
  } catch (error) {
    console.log("Error cargando alumnos:", error);
  }
};

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

// Función para eliminar un alumno
const eliminarUsuario = async (event) => {
  event.preventDefault();
  const button = event.target.closest("button");
  const id = button.dataset.id;
  if (id && confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    try {
      const response = await fetch(`http://localhost:5001/api/usuario/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar usuario");
      cargarAlumnos(); // Recargar la tabla
    } catch (error) {
      console.log("Error eliminando usuario:", error);
    }
  } else {
    console.log("ID de usuario no válido.");
  }
};

// Función para promocionar un alumno a administrador
const promocionarUsuario = async (event) => {
  event.preventDefault();
  const button = event.target.closest("button");
  const tr = button.closest("tr"); // Obtener el tr al que pertenece el botón

  // Extraer los datos del tr
  const id = tr.dataset.id;
  const nombre = tr.dataset.nombre;
  const apellido = tr.dataset.apellido;
  const email = tr.dataset.email;
  const password = tr.dataset.password;
  const centro = tr.dataset.centro;

  //   console.log({
  //     id,
  //     nombre,
  //     apellido,
  //     email,
  //     password,
  //     centro,
  //     rol: "administrador", // Solo se actualiza el rol
  //   });

  if (confirm("¿Estás seguro de querer promocionar a este alumno a Administrador?")) {
    try {
      const response = await fetch(`http://localhost:5001/api/usuario/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          password,
          centro,
          rol: "administrador",
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error del servidor:", errorDetails);
        throw new Error("Error al promocionar usuario");
      }

      cargarAlumnos(); // Recargar la tabla
    } catch (error) {
      console.log("Error al modificar el usuario: " + error.message);
    }
  }
};

const modificarUsuario = async (event) => {
  event.preventDefault();
  // Validar los datos
  if (validarModal(event)) {
    // Obtener los datos del formulario
    const usuarioModificado = {
      id: modalID.value,
      nombre: modalNombre.value,
      apellido: modalApellido.value,
      email: modalEmail.value,
      password: modalPassword.value,
      centro: modalCentro.value,
      rol: modalRol.value,
    };

    try {
      const response = await fetch(`http://localhost:5001/api/usuario/${usuarioModificado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: usuarioModificado.nombre,
          apellido: usuarioModificado.apellido,
          email: usuarioModificado.email,
          password: usuarioModificado.password,
          centro: usuarioModificado.centro,
          rol: usuarioModificado.rol,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error al modificar el usuario:", errorDetails);
        throw new Error(errorDetails.message || "Error desconocido al modificar el usuario.");
      }

      const updatedUser = await response.json();
      console.log("Usuario modificado correctamente:", updatedUser);

      // Recargar la lista de usuarios
      cargarAlumnos();

      // Cerrar el modal
      modalModificarUsuario.classList.add("dnone");
    } catch (error) {
      console.log("Error al modificar el usuario:", error);
    }
  } else {
    console.log("Los datos del formulario no son válidos.");
  }
};

//PENDIENTE DE IMPLEMENTAR
const validarModal = async (event) => {
  event.preventDefault();
  console.log("validar modal");
  let correcto = true;
  // if (modalEmail.validity.valueMissing) {
  //   errorEmail.textContent = "Debes introducir el e-mail";
  //   correcto = false;
  // } else if (modalEmail.validity.typeMismatch) {
  //   errorEmail.textContent = "El formato de e-mail es inválido.";
  //   correcto = false;
  // } else {
  //   errorEmail.textContent = "";
  // }
  // if (modalPassword.validity.valueMissing) {
  //   errorPassword.textContent = "Debes introducir la contraseña.";
  //   correcto = false;
  // } else if (modalPassword.validity.typeMismatch) {
  //   errorPassword.textContent = "La contraseña está mal conformada.";
  // } else {
  //   errorPassword.textContent = "";
  // }

  // if (modalConfirmPassword.validity.valueMissing) {
  //   errorConfirmPassword.textContent = "Debes repetir la contraseña.";
  //   correcto = false;
  // } else if (modalConfirmPassword.validity.typeMismatch) {
  //   errorConfirmPassword.textContent = "La contraseña está mal conformada.";
  //   correcto = false;
  // } else if (modalPassword.value != modalConfirmPassword.value) {
  //   errorConfirmPassword.textContent = "Las contraseñas no coinciden.";
  //   correcto = false;
  // } else {
  //   errorConfirmPassword.textContent = "";
  // }
  return correcto;
};

document.addEventListener("DOMContentLoaded", setup);
modalModificarUsuario.addEventListener("submit", modificarUsuario);
