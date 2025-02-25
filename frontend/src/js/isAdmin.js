let contenedor = document.getElementById("vistaAdmin");
const CerrarSesionButton = document.getElementById("cerrarSesion");
let notifier ;

const cargarVistaAdmin = async () => {
    const token = sessionStorage.getItem("token"); // Obtener token en el momento de la petición
    console.log("Token recuperado del sessionStorage:", token);
    
    if (!token) {
        notifier.info("El token primero")
        return; // Detener ejecución si no hay token
    }

    const options = {  // Construir el objeto options dentro de la función
        method: 'GET',
        headers: {
            'user-token': token.trim() // Asegurar que no hay espacios extra
        }
    };

    try {
        const respuesta = await fetch('http://localhost:5001/api/usuario/info', options);

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
      
        // Comprobar si el usuario es un administrador
        if (datos.rol === "administrador") {
            contenedor.innerHTML = '<a href="./adminView.html" class="hover:underline"><i class="fa-solid fa-user"></i></a>'; 
        } else {
            contenedor.innerHTML = ''; 
        }

    } catch (error) {
        console.error("Error al cargar vista admin:", error);
        contenedor.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(cargarVistaAdmin, 500); 
});

