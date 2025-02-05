let form = document.getElementById("form")
let email = document.getElementById("email")
let err_message = document.getElementById("err_message")

let reestablecer = (event) => {
    event.preventDefault();
    valida = true;

    // validar si ha introducido o no un email.
    // no introduce ningun valor
    if (!email.value) {
        console.log("no has introducido valores")
        valida = false;
        err_message.textContent = "El email es un campo requerido"

    } else {
        // no introduce un email
        if (!validateEmail(email.value)) {
            console.log("no has introducido valores correctos")
            valida = false;
            err_message.textContent = "El formato del email no es el correcto"
        }else{
            err_message.textContent = ""
        }
    }

    // despues de la propia validación del correo hay que verificar que el correo esté en la bdd 




    // suponemos que si que está
    // la contraseña tendra que ser aleatoria y tener un formato determinado
    // vamos a usar "prueba" para ver si podemos enviar el correo
    let passwd = "prueba";


}


const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailRegex.test(email)) return true
    return false
}







form.addEventListener("submit", reestablecer)