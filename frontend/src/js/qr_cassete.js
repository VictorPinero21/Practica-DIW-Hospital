document.addEventListener("DOMContentLoaded", function () {
    const QR_header = document.getElementById("QR_header");
    const qrModal = document.getElementById("show__QRModal");
    const qrClose = document.getElementById("close__QR");
    const qrContainer = document.getElementById("img__QR");
    const qr__muestra = document.getElementById("qr__muestra");
   const detalleMuestra__modal = document.getElementById("detalleMuestra__modal");
   
   let notifier;
    if (typeof AWN === "undefined") {
        console.error("Awesome Notifications no se ha cargado correctamente.");
        return; 
    } else {
        console.log("Awesome Notifications cargado correctamente.");
        notifier = new AWN();
    }


    const token = sessionStorage.getItem("token");
    if (!token) {
     
        notifier.warning("El token no es válido, se te redirigira al Login");

      
        setTimeout(() => {
            location.href = "http://127.0.0.1:5500/Practica-DIW-Hospital/frontend/src/index.html";
        }, 5000);
        return; 
    }
    qr__muestra.addEventListener("click", async () => {
        let id = localStorage.getItem("id_muestra");
      
        try {
            let response = await fetch(`http://localhost:5001/api/muestra/${id}`, {
                method: "GET",
                headers: {
                    "user-token": token
                }
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data.qr_muestra);

            if (data.qr_muestra) {
                qrContainer.innerHTML = "";
                new QRCode(qrContainer, data.qr_muestra);
                detalleMuestra__modal.classList.add("hidden")
                qrModal.classList.remove("hidden");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    });

    QR_header.addEventListener("click", async () => {
        let id = localStorage.getItem("id_cassete");
       

        try {
            let response = await fetch(`http://localhost:5001/api/cassete/${id}`, {
                method: "GET",
                headers: {
                    "user-token": token
                }
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data.qr_cassette);

            if (data.qr_cassette) {
                qrContainer.innerHTML = "";
                new QRCode(qrContainer, data.qr_cassette);
                qrModal.classList.remove("hidden");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    });


    // Event listener para cerrar el modal
    qrClose.addEventListener("click", function () {
        qrModal.classList.add("hidden");
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener("click", function (event) {
        if (event.target === qrModal) {
            qrModal.classList.add("hidden");
        }
    });
});
