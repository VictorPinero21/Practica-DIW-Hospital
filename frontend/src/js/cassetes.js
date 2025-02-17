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
let organSelect = document.getElementById("organSelect")
let listaCassetes = document.getElementById("listaCassetes")
let cassetteDetail = document.getElementById("cassetteDetail")
let usuario_id;
let id //ID DEL CASSETE AL QUE HACES CLICK
//modal Crear cassete
let desc = document.getElementById("descripcion")
let date = document.getElementById("fecha")
let selectOrganoCassete = document.getElementById("selectOrganoCassete")
let carac = document.getElementById("caracteristicas")
let ob = document.getElementById("observaciones")
let submitCrearCassete = document.getElementById("submitCrearCassete")
//modal modificar Cassetes
let desM=document.getElementById("descripcionMod")
let dateM=document.getElementById("fechaMod")
let selecOrMod=document.getElementById("organoMod")
let caracMod=document.getElementById("caracteristicasMod")
let obMod=document.getElementById("observacionesMod")
let submitModCassete=document.getElementById("submitModificarCassete")
// modal nuevos cassettes
let nuevoCassete = document.getElementById('nuevoCassete');
let cerrarNuevoCassete = document.getElementById('cerrarNuevoCassete');
let toggleModal = document.getElementById('toggleModal')
// modal modificar cassettes
let modalModificarCassette = document.getElementById('modalModificarCassette');
let cerrarModalCassete = document.getElementById('cerrarModalCassete');
let modificarCassete = document.getElementById('modificarCassete')
// modal de confirmacion de elimiar cassete
let deleteModal = document.getElementById('deleteModal')
let cancelDelete = document.getElementById('cancelDelete')
let confirmDelete = document.getElementById('confirmDelete')
let eliminarCassete = document.getElementById('eliminarCassete')
//botones para ordenar
let fechaBoton=document.getElementById("fechaBoton")
let descripcionBoton=document.getElementById("descripcionBoton")
let organoBoton=document.getElementById("organoBoton")

// Función para agregar eventos solo si el elemento existe
function addEventListenerIfExists(id, event, callback) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener(event, callback);
  }
}

//Función para hacer la peticon GET a la API
const peticionApi = async () => {
  const api = await fetch("http://localhost:5001/api/cassete");
  const data = await api.json();
  return data;
}

let fragment = document.createDocumentFragment()
//fecha descripcion organo
const mostrarCassetes = async () => {
  const api = await peticionApi()

  let cassetesArr;
  //Creo los cassetes
  cassetesArr = api.filter(cassete => cassete.usuario_id === usuario_id);

  cassetesArr.forEach(cassete => {
    let newDiv = document.createElement("tr")
    let fecha = document.createElement("td")
    let descripcion = document.createElement("td")
    let organo = document.createElement("td")
    let fechaTexto = cassete.fecha ? cassete.fecha.toString().substring(0, 10) : "Fecha no disponible";
    fecha.textContent = fechaTexto;
    descripcion.textContent = cassete.descripcion
    organo.textContent = cassete.organo
    fecha.classList = "w-[50%] ml-2 hover:cursor-pointer"
    descripcion.classList = "w-[20%] ml-2 hover:cursor-pointer"
    organo.classList = "w-[30%] ml-2  hover:cursor-pointer"
    newDiv.appendChild(fecha)
    newDiv.appendChild(descripcion)
    newDiv.appendChild(organo)

    newDiv.classList.add("flex")
    newDiv.id = cassete.id

    fragment.appendChild(newDiv)
  })
  listaCassetes.appendChild(fragment)
}


//Funcion para hacer el post con el nuevo cassete a la base de datos
const crearCassete = async () => {
  console.log("INFORMACION A POSTEAR: " + desc.value + date.value + selectOrganoCassete.value + carac.value + ob.value)
  let descripcion = desc.value
  let fecha = date.value
  let organo = selectOrganoCassete.value
  let caracteristicas = carac.value
  let observaciones = ob.value
  console.log(usuario_id)
  const postCassete = await fetch("http://localhost:5001/api/cassete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ descripcion, fecha, organo, caracteristicas, observaciones, usuario_id })
  })
  if (postCassete.ok) {
    mostrarCassetes()
    location.reload()
  }
  const data = await postCassete.json()
  console.log(data)
  return data
}
const peticionApiUser = async () => {
  const api = await fetch("http://localhost:5001/api/usuario");
  const data = await api.json();
  return data;
}
//Funcion para recoger el ID de la persona que ha iniciado sesion a través de localStorage usando su email para recoger le ID
const recogerID = async () => {
  let email = localStorage.getItem("email")

  let api = await peticionApiUser()
  let usuarioQuerido;
  usuarioQuerido = api.filter(usuario => usuario.email == email)

  usuarioQuerido.forEach(usu => usuario_id = usu.id)

}

const peticionApiID = async (id) => {
  const api = await fetch(`http://localhost:5001/api/cassete/${id}`)
  const data = await api.json()

  return data
}
//Funcion para recoger los detalles del cassete
const detalleCassete = async (event) => {
  cassetteDetail.textContent = ""
  // console.log(event.target.parentElement.id)
  //Mostrar Descripcion,fecha,caracteristiacs, y observaciones
  id = event.target.parentElement.id
  const api = await peticionApiID(id)
  // console.log(api)
  let p1 = document.createElement("P")
  let p2 = document.createElement("P")
  let p3 = document.createElement("P")
  let p4 = document.createElement("P")
  let p5 = document.createElement("P")
  let p6 = document.createElement("P")
  let p7 = document.createElement("P")
  let p8 = document.createElement("P")


  let div1 = document.createElement("DIV")
  let div2 = document.createElement("DIV")
  let div3 = document.createElement("DIV")
  let div4 = document.createElement("DIV")

  div1.classList = "overflow-y-auto overflow-x-hidden h-14 w-[300px] break-words"
  div2.classList = "overflow-y-auto overflow-x-hidden h-14 w-[300px] break-words"

  p1.textContent = api.descripcion
  p2.textContent = api.fecha.substring(0, 10)
  p3.textContent = api.caracteristicas
  p4.textContent = api.observaciones
  p5.textContent = "Características: "
  p6.textContent = "Observaciones: "
  p7.textContent = "Descripción: "
  p8.textContent = "Fecha: "

  p6.classList = "text-green-500"
  p5.classList = "text-green-500"
  p7.classList = "text-green-500"
  p8.classList = "text-green-500"


  div1.appendChild(p5)
  div1.appendChild(p3)
  div2.appendChild(p6)
  div2.appendChild(p4)
  div3.appendChild(p7)
  div3.appendChild(p1)
  div4.appendChild(p8)
  div4.appendChild(p2)

  fragment.appendChild(div3)
  fragment.appendChild(div4)
  fragment.appendChild(div1)
  fragment.appendChild(div2)
  cassetteDetail.appendChild(fragment)

  // llamar a la funcon para mosrar muestras
  mostrarMuestras(id);
}

//Funcion para borrar el cassete seleccionado
const borrarCassete=async()=>{
  console.log("El id ha borrar es: "+id)
  const delete_cassete=await fetch(`http://localhost:5001/api/cassete/${id}`,{
    method:'DELETE',
  })
  if(delete_cassete.ok){
    mostrarCassetes()
    location.reload()
  }
}
//Funcion para saber si se ha hecho click previamente en algun cassete y si no, mostrar el error
const comprobarBorrado=()=>{
  if(id){
    mostrar(deleteModal)
    
  }else{
      cassetteDetail.textContent="NO HAS SELECCIONADO NADA MACHO"
  }
}

//Funcion para modificar el cassete
const modCassete=async()=>{

  let descripcion = desM.value
  let fecha = dateM.value
  let organo = selecOrMod.value
  let caracteristicas = caracMod.value
  let observaciones = obMod.value
    const modificar=await fetch(`http://localhost:5001/api/cassete/${id}`,{
        method:'PUT',
        body: JSON.stringify({ descripcion, fecha, organo, caracteristicas, observaciones, usuario_id }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if(modificar.ok){
      mostrarCassetes()
      location.reload()
    }
}

//Funcion para comprobar si hay algun cassete seleccionado para mostrar el modal de modificar
const comprobarActualizacion=async()=>{
  if(id){
    mostrar(modalModificarCassette)
    const api=await peticionApiID(id)
   
    desM.value=api.descripcion
    let fechaTexto = api.fecha ? api.fecha.toString().substring(0, 10) : "Fecha no disponible";
    dateM.value=fechaTexto
    selecOrMod.value=api.organo
    caracMod.textContent=api.caracteristicas
    obMod.textContent=api.observaciones
  }else{
    cassetteDetail.textContent="NO HAS SELECCIONADO NADA MACHO"
}
}
//Inicializamos Sorttable para la tabla con los cassetes mostrados
const Sortable = window.Sortable;
const ordenarFecha=()=>{
  console.log("Ordenar")
  var rows = Array.from(listaCassetes.rows).slice(1); // Obtener las filas de datos, ignorando el encabezado
  console.log(rows)
  // Ordenar las filas por la fecha (columna 0)
  rows.sort(function(a, b) {
    var fechaA = new Date(a.cells[0].textContent); // Obtener la fecha de la primera celda
    var fechaB = new Date(b.cells[0].textContent);
    return fechaA - fechaB; // Ordenar de más antiguo a más reciente
  });

  // Reinsertar las filas ordenadas en la tabla
  rows.forEach(function(row) {
    listaCassetes.appendChild(row);
  });
}


//listeners
document.addEventListener("DOMContentLoaded", recogerID)
document.addEventListener("DOMContentLoaded", mostrarCassetes)
document.addEventListener("DOMContentLoaded", () => {
  organosHumanos.forEach(organo => {
    let option = document.createElement("OPTION")
    let option2 = document.createElement("OPTION")
    let option3=document.createElement("OPTION")
    option.textContent = organo
    option.value = organo.trim();
    option2.textContent = organo
    option2.value = organo.trim()
    option3.textContent = organo
    option3.value = organo.trim()
    selectOrganoCassete.appendChild(option)
    organSelect.appendChild(option2)
    selecOrMod.appendChild(option3)
  })
})
submitCrearCassete.addEventListener("click", crearCassete)
confirmDelete.addEventListener("click",borrarCassete)
eliminarCassete.addEventListener("click",comprobarBorrado)
modificarCassete.addEventListener('click', comprobarActualizacion)
submitModificarCassete.addEventListener("click",modCassete)
fechaBoton.addEventListener("click",ordenarFecha)
// A PARTIR DE AQUI ALVARO
// ARREGLO DE LAS MODALES

const mostrar = (modal) => {
  modal.classList.remove("hidden")
  modal.classList.add("flex")
}

const ocultar = (modal) => {
  modal.classList.add("hidden")
  modal.classList.remove("flex")
}

// eventos para ocultar modales
cerrarNuevoCassete.addEventListener('click', () => ocultar(nuevoCassete))
cerrarModalCassete.addEventListener('click', () => ocultar(modalModificarCassette))
cancelDelete.addEventListener('click', () => ocultar(deleteModal))
confirmDelete.addEventListener('click', () => ocultar(deleteModal))
// eventos para mostrar las modales
toggleModal.addEventListener('click', () => mostrar(nuevoCassete))
// modificarCassete.addEventListener('click', () => mostrar(modalModificarCassette))
// eliminarCassete.addEventListener('click', () => mostrar(deleteModal))

listaCassetes.addEventListener("click", detalleCassete)


// mostrar la modal
let btn__newMuestra = document.getElementById('btn__newMuestra');
// modal de nueva muestra
let newMuestra__modal = document.getElementById('newMuestra__modal');
// boton de cerrar la modal de nueva muestra 
let close__newMuestra__modal = document.getElementById('close__newMuestra__modal');
// nuevo fragment
let fragment2 = document.createDocumentFragment();
// aqui es donde se listan las muestras
let listaMuestras = document.getElementById("listaMuestras");
// feedback de que no hay muestras
let noHayMuestras = document.getElementById('noHayMuestras');
// variables para la informacion de dentro de los detalles de la muestra
let detalleMuestra__modal = document.getElementById('detalleMuestra__modal');
let descripcion__detalleMuestra = document.getElementById('descripcion__detalleMuestra');
let fecha__detalleMuestra = document.getElementById('fecha__detalleMuestra')
let tincion__detalleMuestra = document.getElementById('tincion__detalleMuestra')
let observaciones__detalleMuestra = document.getElementById('observaciones__detalleMuestra')
let Img__detalleMuestra = document.getElementById('Img__detalleMuestra');
let containerImg__detalleMuestra = document.getElementById('containerImg__detalleMuestra')
let close__detalleMuestra__modal = document.getElementById('close__detalleMuestra__modal')
// variables de la modal para crear la muestra
let newMuestra__form = document.getElementById('newMuestra__form')
let newMuestra__desc = document.getElementById('newMuestra__desc')
let newMuestra__date = document.getElementById('newMuestra__date')
let newMuestra__tincion = document.getElementById('newMuestra__tincion')
let newMuestra__Observaciones = document.getElementById('newMuestra__Observaciones')
let newMuestra__img = document.getElementById('newMuestra__img')
let newMuestra__feedback = document.getElementById('newMuestra__feedback')
// acciones a raiz de la modal de detalles
// qr
let qr__muestra = document.getElementById('qr__muestra')
// update muestra
let update__muestra = document.getElementById('update__muestra')
// delete muestra
let delete__muestra = document.getElementById('delete__muestra')
// acciones sobre las imagenes de la muestra
// borrarla
let delete__imgMuestra = document.getElementById('delete__imgMuestra')
// añadirla
let aniadirImg__detalleMuestra = document.getElementById('aniadirImg__detalleMuestra')
// modal confirmar eliminacion de muestra
let deleteModal__muestra = document.getElementById('deleteModal__muestra');
let confirmDelete__muestra = document.getElementById('confirmDelete__muestra');
let cancelDelete__muestra = document.getElementById('cancelDelete__muestra');
// modal para modificar la muestra
let updateModal__muestra = document.getElementById('updateModal__muestra')
let close__updateMuestra__modal = document.getElementById('close__updateMuestra__modal')
let updateMuestra__form = document.getElementById('updateMuestra__form')
let updateMuestra__desc = document.getElementById('updateMuestra__desc')
let updateMuestra__date = document.getElementById('updateMuestra__date')
let updateMuestra__tincion = document.getElementById('updateMuestra__tincion')
let updateMuestra__Observaciones = document.getElementById('updateMuestra__Observaciones')



// peticion a la api
const mostrarMuestras = (id) => {
  let url = "http://localhost:5001/api/muestra/cassette/" + id;

  fetch(url)
    .then(response => response.json())
    .then(responsejson => {

      listaMuestras.innerHTML = "";

      if (responsejson.length > 0) {
        listarMuestras(responsejson)
        noHayMuestras.classList.remove('block')
        noHayMuestras.classList.add("hidden")
      } else {
        noHayMuestras.classList.remove('hidden')
        noHayMuestras.classList.add('block')
      }
    })
}

const listarMuestras = (muestras) => {
  // console.log(muestras)
  muestras.forEach(muestra => {
    // console.log(muestra)
    let newDiv = document.createElement("DIV")
    let fecha = document.createElement("P")
    let descripcion = document.createElement("P")
    let tincion = document.createElement("P")
    let i = document.createElement("I")

    fecha.textContent = muestra.fecha.substring(0, 10)
    descripcion.textContent = muestra.descripcion
    tincion.textContent = muestra.tincion
    fecha.classList = "w-[50%] ml-2 hover:cursor-pointer"
    descripcion.classList = "w-[20%] ml-2 hover:cursor-pointer"
    tincion.classList = "w-[25%] ml-2  hover:cursor-pointer"
    i.classList = "fas fa-file text-green-600 w-[5%] ml-2 hover:cursor-pointer"
    newDiv.appendChild(fecha)
    newDiv.appendChild(descripcion)
    newDiv.appendChild(tincion)
    newDiv.appendChild(i)

    newDiv.classList = "flex border-b border-green-500"
    newDiv.id = muestra.id

    fragment2.appendChild(newDiv)
  })
  listaMuestras.appendChild(fragment2)
}

const DetailMuestras = (event) => {
  if (event.target.tagName === 'I') {
    // console.log(event.target.parentElement.id)
    peticionMuestras(event.target.parentElement.id)
  }
}

const peticionMuestras = (id) => {
  // console.log(id)
  let url = "http://localhost:5001/api/muestra/" + id;

  fetch(url)
    .then(response => response.json())
    .then(responsejson => modalMuestra(responsejson))
}

// mostrar la modal para ver los detalles de la muestra
const modalMuestra = (muestra) => {
  // console.log(muestra)

  detalleMuestra__modal.id = muestra.id;

  // dar valor a los textos
  descripcion__detalleMuestra.textContent = muestra.descripcion;
  fecha__detalleMuestra.textContent = muestra.fecha.substring(0, 10);
  tincion__detalleMuestra.textContent = muestra.tincion;
  observaciones__detalleMuestra.textContent = muestra.observaciones;
  // aqui hay que comprobar si hay o no imagen, para mostrarlas o mostrar la de prueba
  // Img__detalleMuestra.src=''

  // por ultimo mostrar la modal
  mostrar(detalleMuestra__modal)
}

// funcion para crear una nueva muestra a raiz de la modal

const createMuestra = (event) => {
  event.preventDefault();
  // comprobar que se haya hecho click en un cassette
  if (!id) {
    // console.log("No se ha seleccionado ningun cassette")
    newMuestra__feedback.textContent = "Debes seleccionar un Cassette"
    newMuestra__feedback.classList.remove("text-green-700")
    newMuestra__feedback.classList.add("text-red-500")
  } else {
    // console.log("Se ha seleccionado un cassette")

    let data = {
      descripcion: newMuestra__desc.value,
      fecha: newMuestra__date.value,
      tincion: newMuestra__tincion.value,
      observaciones: newMuestra__Observaciones.value,
      qr_muestra: "",
      cassette_id: id,
    }

    fetch('http://localhost:5001/api/muestra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido (en este caso JSON)
      },
      body: JSON.stringify(data), // Convertimos los datos a JSON
    }).then(response => {
      // si la respuesta es un ok=true mostrar feedback
      if (response.ok === true) {
        // console.log("insercion realizada con exito")
        newMuestra__feedback.textContent = "Muestra creada"
        newMuestra__feedback.classList.add("text-green-700")
        newMuestra__feedback.classList.remove("text-red-500")
        // aqui no salimos de la modal por si quiere crear varias muestras a la vez
        mostrarMuestras(id)
      }
    })
      .catch(error => {
        console.log('El error: ' + error)
        newMuestra__feedback.textContent = "Ha habido un error"
        newMuestra__feedback.classList.remove("text-green-700")
        newMuestra__feedback.classList.add("text-red-500")
      })
  }
}

// eliminar la muestra

let id__muestra = "";

const deleteMuestra = (event) => {
  // recoger el id de la muestra que queremos eliminar
  id__muestra = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
  // console.log(id__muestra)

  // modal de confirmacion
  mostrar(deleteModal__muestra);
}

const borrado = (id) => {
  // console.log(id)

  let url = 'http://localhost:5001/api/muestra/' + id;

  fetch(url, {
    method: 'DELETE',
  }).then(response => {
    // console.log(response)
    ocultar(deleteModal__muestra)
    ocultar(detalleMuestra__modal)
  })
    .catch(error => "error: " + error)
}

// update de muestras

const updateModal = (event) => {
  id__muestra = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id

  // rellenar los campos del update
  updateMuestra__desc.value=descripcion__detalleMuestra.textContent;
  updateMuestra__date.value=fecha__detalleMuestra.textContent;
  updateMuestra__tincion.value=tincion__detalleMuestra.textContent;
  updateMuestra__Observaciones.value=observaciones__detalleMuestra.textContent;

  mostrar(updateModal__muestra)
}

const updateMuestra = (event) =>{
  event.preventDefault();

  let url = "http://localhost:5001/api/muestra/"+id__muestra;

  let data = {
    descripcion: updateMuestra__desc.value,
    fecha:  updateMuestra__date.value,
    tincion:  updateMuestra__tincion.value,
    observaciones:updateMuestra__Observaciones.value  
  }

  // console.log(data)

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(responsejson => {
    // console.log('Actualizado con éxito', responsejson)
    // ocultamos la modal del formulario
    ocultar(updateModal__muestra)
    // ocultamos la modal de los detalles
    ocultar(detalleMuestra__modal)
    // mostramos la modal con los nuevos datos
    peticionMuestras(id__muestra)
    // actualizamos el listado de muestras
    mostrarMuestras(id)
  })
  .catch(error => console.error('Error:', error));
  

}





// listeners
btn__newMuestra.addEventListener('click', () => mostrar(newMuestra__modal))
close__newMuestra__modal.addEventListener('click', () => ocultar(newMuestra__modal))
close__detalleMuestra__modal.addEventListener('click', () => ocultar(detalleMuestra__modal))
confirmDelete__muestra.addEventListener('click', () => borrado(id__muestra))
cancelDelete__muestra.addEventListener('click', () => ocultar(deleteModal__muestra))
close__updateMuestra__modal.addEventListener('click', ()=>ocultar(updateModal__muestra))
listaMuestras.addEventListener('click', DetailMuestras)
newMuestra__form.addEventListener('submit', createMuestra)
delete__muestra.addEventListener('click', deleteMuestra)
update__muestra.addEventListener('click', updateModal)
updateMuestra__form.addEventListener('submit', updateMuestra)