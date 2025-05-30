// Registro de usuario
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await fetch("/api/auth.php?action=register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, email, password }),
            });

            const result = await response.json();

            if (result.success) {
                window.location.href = result.redirect;
            } else {
                alert(result.error || "Error al registrar el usuario.");
            }
        } catch (err) {
            console.error(err);
            alert("No se pudo conectar al servidor.");
        }
    });
}

//Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const response = await fetch("/api/auth.php?action=login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // 👈 permite enviar/recibir cookies de sesión
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (result.success) {
            // Redirige a la vista protegida
            window.location.href = result.redirect;
        } else {
            alert(result.error || "Error en el inicio de sesión.");
        }
    } catch (err) {
        console.error("Error:", err);
        alert("No se pudo conectar al servidor.");
    }
});

// Logout manual con botón o enlace
async function logout() {
    try {
        const response = await fetch("/api/auth.php?action=logout", {
            method: "POST",
            credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
            window.location.href = result.redirect;
        } else {
            alert("No se pudo cerrar sesión.");
        }
    } catch (err) {
        console.error("Error al cerrar sesión:", err);
        alert("Error al conectar con el servidor.");
    }
}
