//Variables
let register=document.getElementById("register")
let form_login=document.getElementById("form_login")
let form_register=document.getElementById("form_register");
let volver_login=document.getElementById("login")
// ir a recuperar la contraseña
let contrasena_olvidada = document.getElementById("contrasena_olvidada");
//Funciones

//Funcion para mostrar el registro
const mostrarRegistro=(event)=>{
    if(event.target.nodeName=="P"){
        form_login.classList.add("hidden")
        form_register.classList.remove("hidden")
        form_register.classList.add("flex")
    }
}

let IrReestablecer = () =>{
    location.href="./pages/forgettenpass.html"
}


//Listeners
register.addEventListener("click",mostrarRegistro)
volver_login.addEventListener("click",(event)=>{
        if(event.target.nodeName=="P"){
            form_login.classList.add("flex")
            form_login.classList.remove("hidden")
            form_register.classList.remove("flex")
            form_register.classList.add("hidden")
        }
})
contrasena_olvidada.addEventListener("click",IrReestablecer)