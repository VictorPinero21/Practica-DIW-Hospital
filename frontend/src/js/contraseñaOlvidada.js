// al importarlo me da pete
// const  emailjs = require('emailjs-com');

//varibales
let form = document.getElementById("form")
let email = document.getElementById("email")
let err_message = document.getElementById("err_message")


const validar = () => {
    let valida = true;

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
        } else {
            err_message.textContent = ""
        }
    }

    return valida;
}


//Generador de contraseña
// let generator=require('generate-password-browser');
let reestablecer = (event) => {
    event.preventDefault();

    if (validar()) {
        // let passwd = generator.generate({
        //     length: 8,
        //     numbers: true,
        //     symbols: true,
        //     lowercase: true,
        //     uppercase: true,

        //   });

        let url = 'http://localhost:5001/api/reset/' + email.value;

        fetch(url)
            .then(response => response.json())
            .then(responsejson => {
                // console.log(responsejson.email)


                if (responsejson.email !== null) {
                    // vaciamos el error
                    err_message.textContent = ""
                    // llamamos a generar contraseña
                    GenerarContraseña(responsejson.email);
                } else {
                    // manadamos el error para que el usuario tenga feedback
                    err_message.textContent = "Este email no existe"
                }
            })


        // Funcion para enviar el correo
        // enviarCorreo(email.value, passwd);
    }


}

// Función para enviar el correo
const enviarCorreo = (destinatario, mensaje) => {
    // emailjs.init('0wgPu1C_SkTQ0gYSb')

    console.log("en la funcion")
    let params = {
        email: destinatario,
        message: mensaje
    };

    emailjs.send("service_hyxlmfv", "template_1cmr1cq", params)
        .then(response => {
            console.log("Correo enviado con éxito", response);
        })
        .catch(error => {
            console.error("Error al enviar el correo", error);
        });
}

const GenerarContraseña = (email) => {
    // console.log("generar contraseña")
    // console.log(email)
    let url = 'http://localhost:5001/api/reset/';

    let datos = {
        email: email,
    }

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    }).then(response => response.json())
    .then(responsejson => {
        console.log(responsejson.data)

        enviarCorreo(email, responsejson.data);
    })

}



const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailRegex.test(email)) return true
    return false
}







form.addEventListener("submit", reestablecer)