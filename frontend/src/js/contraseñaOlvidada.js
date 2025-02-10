// al importarlo me da pete
// const  emailjs = require('emailjs-com');

//varibales
let form = document.getElementById("form")
let email = document.getElementById("email")
let err_message = document.getElementById("err_message")

//Generador de contraseña
// let generator=require('generate-password-browser');
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
    if(valida=true){
        // let passwd = generator.generate({
        //     length: 8,
        //     numbers: true,
        //     symbols: true,
        //     lowercase: true,
        //     uppercase: true,
            
        //   });
        let passwd="prueba"
        // emailjs.send("service_hyxlmfv","template_s8lk1co",{
        //     message: passwd,
        //     reply_to: email.value,
        //     });
        console.log("antes del envio")
        console.log(passwd)
        enviarCorreo(email.value, passwd);
    }
    

}

// Importa Email.js si usas un entorno con módulos
//  import emailjs from 'emailjs-com';

// Función para enviar el correo
function enviarCorreo(destinatario, mensaje) {
    // emailjs.init('0wgPu1C_SkTQ0gYSb')

    console.log("en la funcion")
    let params = {
        email: destinatario, 
        message: mensaje
    };

    emailjs.send("service_hyxlmfv","template_1cmr1cq", params)
    .then(response => {
        console.log("Correo enviado con éxito", response);
    })
    .catch(error => {
        console.error("Error al enviar el correo", error);
    });
}



const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailRegex.test(email)) return true
    return false
}







form.addEventListener("submit", reestablecer)