<<<<<<< HEAD
let organSelect=document.getElementById("organSelect")
let listaCassetes=document.getElementById("listaCassetes")
let cassetteDetail=document.getElementById("cassetteDetail")


//Función para hacer la peticon GET a la API
const peticionApi=async()=>{
    const api=await fetch("http://localhost:5001/api/cassete");
    const data=await api.json();
   
    return data;
}

let fragment=document.createDocumentFragment()
//fecha descripcion organo
const mostrarCassetes=async()=>{
    const api=await peticionApi()
    console.log(api)

    //Creo los cassetes
    api.forEach(cassete => {
       let newDiv=document.createElement("DIV")
       let fecha=document.createElement("P")
       let descripcion=document.createElement("P")
       let organo=document.createElement("P")

       fecha.textContent=cassete.fecha
       descripcion.textContent=cassete.descripcion
       organo.textContent=cassete.organo

       newDiv.appendChild(fecha)
       newDiv.appendChild(descripcion)
       newDiv.appendChild(organo)
       fragment.appendChild(newDiv)

       newDiv.classList.add("flex")
    });
    listaCassetes.appendChild(fragment)
}


document.addEventListener("DOMContentLoaded",mostrarCassetes)
=======
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
>>>>>>> main
