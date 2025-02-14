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
       
    });
}


document.addEventListener("DOMContentLoaded",mostrarCassetes)