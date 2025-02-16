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
let id //ID DEL CASSETE AL QUE HACES CLICK
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
   
    cassetesArr.forEach(cassete=>{
      let newDiv=document.createElement("DIV")
      let fecha=document.createElement("P")
      let descripcion=document.createElement("P")
      let organo=document.createElement("P")

      fecha.textContent=cassete.fecha.substring(0, 10)
      descripcion.textContent=cassete.descripcion
      organo.textContent=cassete.organo
      fecha.classList="w-[50%] ml-2 hover:cursor-pointer"
      descripcion.classList="w-[20%] ml-2 hover:cursor-pointer"
      organo.classList="w-[30%] ml-2  hover:cursor-pointer"
      newDiv.appendChild(fecha)
      newDiv.appendChild(descripcion)
      newDiv.appendChild(organo)
      fragment.appendChild(newDiv)

      newDiv.classList.add("flex")
      newDiv.id=cassete.id
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
  if(postCassete.ok){
    location.reload()
    mostrarCassetes()
  }
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
  
  let api=await peticionApiUser()
  let usuarioQuerido;
  usuarioQuerido=api.filter(usuario=>usuario.email==email)

  usuarioQuerido.forEach(usu=>usuario_id=usu.id)
  
}

const peticionApiID=async(id)=>{
  const api=await fetch(`http://localhost:5001/api/cassete/${id}`)
  const data=await api.json()

  return data
}
//Funcion para recoger los detalles del cassete
const detalleCassete=async(event)=>{
  cassetteDetail.textContent=""
  console.log(event.target.parentElement.id)
    //Mostrar Descripcion,fecha,caracteristiacs, y observaciones
     id=event.target.parentElement.id
    const api=await peticionApiID(id)
    console.log(api)
    let p1=document.createElement("P")
    let p2=document.createElement("P")
    let p3=document.createElement("P")
    let p4=document.createElement("P")

    p1.textContent="Observaciones: "+api.observaciones
    p2.textContent="Fecha: "+api.fecha
    p3.textContent="Características: "+api.caracteristicas
    p4.textContent="Observaciones: "+api.observaciones

    fragment.appendChild(p1)
    fragment.appendChild(p2)
    fragment.appendChild(p3)
    fragment.appendChild(p4)
    cassetteDetail.appendChild(fragment)

    // llamar a la funcon para mosrar muestras
    mostrarMuestras(id);
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

listaCassetes.addEventListener("click",detalleCassete)

// A PARTIR DE AQUI ALVARO

const mostrarMuestras = (id) =>{
  let url = "http://localhost:5001/api/muestra/"+id;

  fetch(url)
  .then(response => response.json())
  .then(responsejson => console.log(responsejson))
}