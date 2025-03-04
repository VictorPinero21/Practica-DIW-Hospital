//Funcion para arrancar la aplicacion
const setup = () => {
  cargarAlumnos();
  cargarSortable();
};
// Función para cargar sólo los usuarios con rol "alumno"
const cargarAlumnos = async () => {
  try {
    const results = await fetch("http://localhost:5001/api/usuario");
    if (!results.ok) throw new Error("Error al obtener usuarios");

    const alumnos = await results.json();
    tbody.innerHTML = ""; // Limpiar la tabla

    //const alumnos = usuarios.filter((usuario) => usuario.rol === "alumno");
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
        <td class="px-4 py-2 border-b border-[#0ff56b]">${usuario.nombre}</td>
        <td class="px-4 py-2 border-b border-[#0ff56b]">${usuario.apellido}</td>
        <td class="px-4 py-2 border-b border-[#0ff56b]">${usuario.email}</td>
        <!-- <td class="px-4 py-2 border-b border-[#0ff56b]">${usuario.password}</td> -->
        <td class="px-4 py-2 border-b border-[#0ff56b]">${usuario.centro ?? "N/A"}</td>
        <td class="px-4 py-2 border-b border-[#0ff56b]">${usuario.rol}</td>
        <td class="px-4 py-2 border-b border-[#0ff56b]">
          <div class="flex space-x-2 justify-center">
            <!-- Botón de eliminación -->
            <button class="text-red-500 hover:text-red-700 hover:cursor-pointer" data-id="${usuario.id}" title="Borrar">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Botón de edición -->
            <button class="text-greeb-500 hover:text-green-700 hover:cursor-pointer" data-id="${usuario.id}" title="Editar" id="editar${usuario.id}">
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
      editButton.addEventListener("click", (event) => {
        modalModificarUsuario.classList.toggle("dnone");
        // esto a veces va a funcionar y otras no debido a que el boton es un svg y da problemas con el click, lo suyo es hacer con iconos de fontawesome
        console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement);
        let data = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        cargarDatosModal(data);
      });

      // Promocionar usuario
      const promoteButton = row.querySelector("button[title='Promocionar']");
      promoteButton.addEventListener("click", promocionarUsuario);
    });
  } catch (error) {
    console.log("Error cargando alumnos:", error);
  }
};
//Función para implementar Sortable.js en las cabeceras de la tabla
const cargarSortable = () => {
  const headers = table.querySelectorAll("th");
  const tbody = table.querySelector("tbody");

  headers.forEach((header, index) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      sortTableByColumn(tbody, index);
    });
  });

  function sortTableByColumn(tbody, columnIndex) {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const isAscending = tbody.getAttribute("data-sort-order") !== "asc";
    tbody.setAttribute("data-sort-order", isAscending ? "asc" : "desc");

    rows.sort((rowA, rowB) => {
      const cellA = rowA.children[columnIndex].textContent.trim().toLowerCase();
      const cellB = rowB.children[columnIndex].textContent.trim().toLowerCase();

      return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });

    rows.forEach((row) => tbody.appendChild(row));
  }

  // Activar Sortable.js en el tbody para permitir el drag & drop manual de filas
  new Sortable(tbody, {
    animation: 150, // Duración de la animación en ms
    ghostClass: "sortable-ghost", // Clase CSS para la fila mientras se arrastra
    handle: "td", // Permitir que toda la fila sea arrastrable
  });
};
// Función para eliminar un usuario con confirmación de Awesome Notifications
const eliminarUsuario = async (event) => {
  event.preventDefault();
  const button = event.target.closest("button");
  const id = button.dataset.id;

  if (!id) {
    console.log("ID de usuario no válido.");
    return;
  }

  // Mostrar la notificación de confirmación con opciones
  notifier.confirm(
    "¿Estás seguro de que deseas eliminar este usuario?",
    async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/usuario/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar usuario");

        notifier.success("Usuario eliminado correctamente"); // Notificación de éxito
        cargarAlumnos(); // Recargar la tabla
      } catch (error) {
        notifier.alert("Error eliminando usuario");
        console.log("Error eliminando usuario:", error);
      }
    },
    () => {
      notifier.info("Operación cancelada"); // Mensaje si se cancela la eliminación
    }
  );
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
  const rol = tr.dataset.rol;
  if (rol !== "administrador") {
    notifier.confirm(
      "¿Estás seguro de querer promocionar a este alumno a Administrador?",
      async () => {
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
    
          notifier.success("Usuario promocionado a administrador.");
          cargarAlumnos();
        } catch (error) {
          notifier.alert("Error al promocionar el usuario");
          console.log("Error al modificar el usuario: " + error.message);
        }
      },
      () => {
        notifier.info("Operación cancelada.");
      }
    );
    
  } else {
    notifier.warning("No puedes promocionar a un usuario que ya es administrador");
}

};

const modificarUsuario = async (event) => {
  event.preventDefault();
  // Validar los datos
  if (validarModal()) {
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
      notifier.warning("Error al modificar el usuario:", error)
    }
  } else {
    notifier.warning("Los datos del Formulario no son validos:", error)
  }
};

document.addEventListener("DOMContentLoaded", setup);
modalModificarUsuario.addEventListener("submit", modificarUsuario);



document.addEventListener("DOMContentLoaded", function () {
  if (typeof AWN === "undefined") {
      console.error("Awesome Notifications no se ha cargado correctamente.");
  } else {
      console.log("Awesome Notifications cargado correctamente.");
      
      // Inicializar `notifier`
      notifier = new AWN();
      
      // Prueba de notificación para confirmar que funciona
      notifier.success("Librería cargada con éxito");
  }
});

