//Variables
//Campos del login
let email_login=document.getElementById("email_login")
let pass_login=document.getElementById("pass_login")
//Campos del registro
let nombre_register=document.getElementById("nombre_register")
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
let error_repetirpass_register=document.getElementById("error_repetirpass_register")
//Variable boleeana para el login
let correcto=true
//Funciones
//Funcion para la validacion de patterns y requeridos del formulario
const comprobacion_login=()=>{
    console.log("Comprobando")
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
        correcto=true
    }
    return correcto;
}

//Funcion para comprobar usuario y contraseña que sean correcto en la api
const comprobarCredenciales = async (email, password) => {
    console.log("Intentando iniciar sesión con:", email, password);

    try {
        const response = await fetch("http://localhost:5001/api/usuario/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const text = await response.text(); // Obtiene la respuesta como texto
        console.log("Respuesta del servidor:", text); // Ver qué responde el servidor

        if (!text) {
            throw new Error("El servidor respondió con un cuerpo vacío");
        }

        const data = JSON.parse(text); // Convierte solo si hay contenido

        if (response.ok) {
            console.log("Login exitoso:", data);

            // Verifica si el token existe y guárdalo
            if (data.success) {
                sessionStorage.setItem("token", data.success);
                console.log("Token guardado:", data.success);
            } else {
                console.warn("No se recibió un token en la respuesta.");
            }
            

            alert("Login exitoso");
            window.location.href = "./pages/cassetes.html"; // Redirigir al usuario
        } else {
            console.error("Error en login:", data.error || "Usuario y/o contraseña incorrectos");
            document.getElementById("error_pass_login").textContent =
                data.error || "Usuario y/o contraseña incorrectos";
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        document.getElementById("error_pass_login").textContent =
            "Error en la conexión con el servidor";
    }
};

//Funcion para realizar el login correctamente en caso de estar todo correcto.
const verificar_login=(event)=>{
    event.preventDefault()
    if(comprobacion_login()){
        let p=pass_login.value
        let e=email_login.value
        comprobarCredenciales(e,p)
       
        error_pass_login.textContent=""
        console.log("Todo correcto")
    }else{
        
        console.log("No esta correcto tio")
    }
}
//Funcion para realizar la validacion de patterns y requeridos del formulario
const comprobar_register=()=>{
    console.log("REGISTER")
    if(nombre_register.validity.valueMissing){
        error_nombre_register.textContent="Debes introducir tu nombre."
        correcto=false
    }else{
         error_nombre_register.textContent=""
    }
    if(apellidos_register.validity.valueMissing){
        error_apellidos_register.textContent="Debes introducir tu apellido."
        correcto=false
    }else{
         error_apellidos_register.textContent=""
    }
    if(email_register.validity.valueMissing){
        error_email_register.textContent="Debes introducir el e-mail"
        correcto=false
    }else if(email_register.validity.typeMismatch){
        error_email_register.textContent="El formato de e-mail es inválido."
        correcto=false
    }else{
        error_email_register.textContent=""
    }
    if(pass_register.validity.valueMissing){
        error_pass_register.textContent="Debes introducir la contraseña."
        correcto=false
    }else if(pass_register.validity.typeMismatch){
        error_pass_register.textContent="La contraseña está mal consolidada."
    }else{
        error_pass_register.textContent=""
    }

    if(repetir_pass.validity.valueMissing){
        error_repetirpass_register.textContent="Debes repetir la contraseña."
        correcto=false
    }else if(repetir_pass.validity.typeMismatch){
        error_repetirpass_register.textContent="La contraseña está mal consolidada."
        correcto=false
    }else{
        error_repetirpass_register.textContent=""
        correcto=true
    }
    return correcto
}
//Funcion para realizar el post a la base de datos(da error de CORS, preguntar a JORGE)
const registrar_usuario=async()=>{
    let user={
        apellido: apellidos_register.value,
        centro: select_institutos.value,
        email:email_register.value,
        nombre:nombre_register.value,
        password:pass_register.value,
        rol:'alumno'
    }
    
    const api=await fetch("http://localhost:5001/api/usuario",{
        method:'POST',
        headers: {
            
            'Content-Type': 'application/json',  // This needs to be allowed by the server
        
          },
        body:JSON.stringify(user)
       
    })
   
    const data=await api.json()
    console.log("USUARIO REGISTRADO CORRECTAMENTE")
    return data
}
//Funcion para realizar el register correctamente en caso de estar todo correcto.
const verificar_register=async(event)=>{
    event.preventDefault()
    if(comprobar_register()){
        console.log("Todo correcto")
        registrar_usuario()
    }else{
        console.log("No esta correcto tio")
    }
}

//Listeners
// document.addEventListener("DOMContentLoaded",peticionApi)
form_login.addEventListener("submit",verificar_login)
form_register.addEventListener("submit",verificar_register)

