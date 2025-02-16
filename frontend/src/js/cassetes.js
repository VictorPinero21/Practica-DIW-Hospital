const organosHumanos = [
  "Cerebro",
  "Cerebelo",
  "Tronco encefalico",
  "Medula espinal",
  "Corazon",
  "Pulmones",
  "Higado",
  "Riñones",
  "Bazo",
  "Páncreas",
  "Estómago",
  "Intestino delgado",
  "Intestino grueso",
  "Esofago",
  "Vesicula biliar",
  "Glándulas suprarrenales",
  "Timo",
  "Tiroides",
  "Paratiroides",
  "Tráquea",
  "Laringe",
  "Faringe",
  "Ovarios",
  "Testiculos",
  "Utero",
  "Prostata",
  "Vagina",
  "Pene",
  "Vejiga",
  "Ureteres",
  "Uretra",
  "Hipotalamo",
  "Hipofisis"
];
let organSelect=document.getElementById("organSelect")
let listaCassetes=document.getElementById("listaCassetes")
let cassetteDetail=document.getElementById("cassetteDetail")
let usuario_id;
//modal Crear cassete
let desc=document.getElementById("descripcion")
let date=document.getElementById("fecha")
let selectOrganoCassete=document.getElementById("selectOrganoCassete")
let carac=document.getElementById("caracteristicas")
let ob=document.getElementById("observaciones")
let submitCrearCassete=document.getElementById("submitCrearCassete")
// Función para agregar eventos solo si el elemento existe
function addEventListenerIfExists(id, event, callback) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener(event, callback);
  }
}

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
    
    let cassetesArr;
    //Creo los cassetes
    
    cassetesArr=api.filter(cassete => cassete.usuario_id===usuario_id);
    console.log(cassetesArr)
    console.log(usuario_id)
    cassetesArr.forEach(cassete=>{
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
    })
    listaCassetes.appendChild(fragment)
}


//Funcion para hacer el post con el nuevo cassete a la base de datos
const crearCassete=async()=>{
 console.log("INFORMACION A POSTEAR: "+ desc.value+date.value+selectOrganoCassete.value+carac.value+ob.value)
 let descripcion=desc.value
 let fecha=date.value
 let organo=selectOrganoCassete.value
 let caracteristicas=carac.value
 let observaciones=ob.value
  console.log(usuario_id)
  const postCassete=await fetch("http://localhost:5001/api/cassete",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify({descripcion,fecha,organo,caracteristicas,observaciones,usuario_id})
  })

  const data = await postCassete.json()
  console.log(data)
  return data
}
const peticionApiUser=async()=>{
  const api=await fetch("http://localhost:5001/api/usuario");
  const data=await api.json();
  return data;
}
//Funcion para recoger el ID de la persona que ha iniciado sesion a través de localStorage usando su email para recoger le ID
const recogerID=async()=>{
  let email=localStorage.getItem("email")
  console.log("EMAIL logueado: "+email)
  let api=await peticionApiUser()
  let usuarioQuerido;
  usuarioQuerido=api.filter(usuario=>usuario.email==email)
  console.log("ARRAY DEVUELTO FILTRADO"+usuarioQuerido)
  usuarioQuerido.forEach(usu=>usuario_id=usu.id)
  console.log("USUARIO QUE SE HA METIDO"+usuario_id)
}
//listeners
document.addEventListener("DOMContentLoaded",recogerID)
document.addEventListener("DOMContentLoaded",mostrarCassetes)
document.addEventListener("DOMContentLoaded",()=>{
  organosHumanos.forEach(organo=>{
    let option=document.createElement("OPTION")
    let option2=document.createElement("OPTION")
    option.textContent=organo
    option.value=organo
    option2.textContent=organo
    option2.value=organo
    selectOrganoCassete.appendChild(option)
    organSelect.appendChild(option2)
  })
})
submitCrearCassete.addEventListener("click",crearCassete)

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
