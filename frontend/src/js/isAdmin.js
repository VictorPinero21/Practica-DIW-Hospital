const token = sessionStorage.getItem("token");
console.log(token);
let contenedor = document.getElementById("vistaAdmin");
const CerrarSesionButton = document.getElementById("cerrarSesion");

const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    contenedor.innerHTML = "";
    location.href = "../index.html"
}

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'user-token': ` ${token}`
        }
        };

const cargarVistaAdmin = async () => {
    const token = sessionStorage.getItem("token"); // Obtener token dentro de la función
    console.log("Token recuperado del sessionStorage:", token);
    
    if (!token) {
        console.warn("No hay token disponible, redirigiendo...");
        return; // Detener ejecución si no hay token
    }

    try {
        const respuesta = await fetch('http://localhost:5001/api/usuario/info', options);

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        console.log("Datos del usuario:", datos);
        
        // Comprobar si el usuario es un administrador
        if (datos.rol === "administrador") {
            contenedor.innerHTML = '<a href="./adminView.html" class="hover:underline"><i class="fa-solid fa-user"></i></a>'; 
        } else {
            contenedor.innerHTML = "";
        }

    } catch (error) {
        console.error("Error al cargar vista admin:", error);
        // Mostrar un mensaje de error al usuario
        contenedor.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    }
};

document.addEventListener("DOMContentLoaded", cargarVistaAdmin);
CerrarSesionButton.addEventListener("click",cerrarSesion)