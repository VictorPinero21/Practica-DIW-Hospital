let organSelect=document.getElementById("organSelect")
let listaCassetes=document.getElementById("listaCassetes")
let cassetteDetail=document.getElementById("cassetteDetail")


//Función para hacer la peticon GET a la API
const peticionApi=async()=>{
    const api=await fetch("http://localhost:5001/api/cassete")
}