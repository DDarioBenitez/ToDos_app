document.addEventListener("DOMContentLoaded", function () {
    // Manejo de autenticación
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Validación simple
            if (!email || !password) {
                showAlert("Por favor completa todos los campos", "error");
                return;
            }

            // Simulación de autenticación
            showAlert("Iniciando sesión...", "success");
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirigir al dashboard
            }, 1500);
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                showAlert("Las contraseñas no coinciden", "error");
                return;
            }

            showAlert("Registro exitoso. Redirigiendo...", "success");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // Función para mostrar alertas
    function showAlert(message, type) {
        const alert = document.createElement("div");
        alert.className = `alert ${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
});
