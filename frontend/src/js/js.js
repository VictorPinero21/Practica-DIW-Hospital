document.addEventListener("DOMContentLoaded", function () {
    if (typeof AWN !== "function") {
        console.error("Error: Awesome Notifications no se ha cargado correctamente.");
        return;
    }

    // Crear la instancia de Awesome Notifications
    const notifier = new AWN();

    // Función para confirmar eliminación
    window.confirmarEliminacion = function (userId) {
        notifier.confirm(
            "¿Estás seguro de que quieres eliminar este usuario?",
            function () {
                eliminarUsuario(userId);
            },
            function () {
                notifier.info("Operación cancelada.");
            },
            {
                labels: { confirm: "Sí, eliminar", cancel: "Cancelar" },
                durations: { global: 3000 }
            }
        );
    };

    // Función para eliminar usuario (simulada)
    function eliminarUsuario(userId) {
        console.log("Usuario eliminado con ID:", userId);
        notifier.success(`Usuario ${userId} eliminado con éxito.`);
    }
});
