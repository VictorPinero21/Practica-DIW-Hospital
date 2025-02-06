//Variables
//Campos del login
let email_login=document.getElementById("email_login")
let pass_login=document.getElementById("pass_login")
//Campos del registro
let nombre_register=document.getElementById("nombre")
let apellidos_register=document.getElementById("apellidos_register")
let select_institutos=document.getElementById("institutos")
let email_register=document.getElementById("email_register")
let pass_register=document.getElementById("pass_register")
let repetir_pass=document.getElementById("repetir_pass")
//Variables de los mensajes de error del login
let error_email_login=document.getElementById("error_email_login")
let error_pass_login=document.getElementById("error_pass_login")//Abcdef1! contraseña que no da error
//Variables de los mensajes de error del register
let error_nombre_register=document.getElementById("error_nombre_register")
let error_apellidos_register=document.getElementById("error_apellido_register")
let error_email_register=document.getElementById("error_email_register")
let error_pass_register=document.getElementById("error_pass_register")
//Variable boleeana para el login
let correcto=true
//Funciones
const verificar_login=(event)=>{
    event.preventDefault()
    console.log("SS")
    if(email_login.validity.typeMismatch){
        console.log("Email mal consolidado")
        error_email_login.textContent="El correo está mal escrito."
        correcto=false
    }else if(email_login.validity.valueMissing){
        console.log("Email vacio")
        error_email_login.textContent="Debes introducir tu correo."
        correcto=false
    }else{
        error_email_login.textContent=""
    }
    if(pass_login.validity.patternMismatch){
        console.log("Patrón de la contraseña mal")
        error_pass_login.textContent="La contraseña está mal consolidada"
        correcto=false
    } else if(pass_login.validity.valueMissing){
        console.log("Contraseña vacia")
        error_pass_login.textContent="Debes introducir tu contraseña."
        correcto=false
    }
    else{
  error_pass_login.textContent=""
    }
    
   
    return correcto;
}

const verificar_register=()=>{

}

//Listeners
form_login.addEventListener("submit",verificar_login)
form_register.addEventListener("submit",verificar_register)
