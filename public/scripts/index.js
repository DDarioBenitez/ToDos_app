async function checkSession() {
    const res = await fetch("/api/auth.php?action=session", { credentials: "include" });
    const data = await res.json();

    const nav = document.getElementById("navSession");
    nav.innerHTML = ""; // limpiamos

    if (data.logged_in) {
        const dashboardLink = document.createElement("a");
        dashboardLink.href = "/dashboard";
        dashboardLink.className = "btn btn-primary";
        dashboardLink.textContent = "Ir al Panel";

        const logoutBtn = document.createElement("button");
        logoutBtn.className = "btn btn-secondary";
        logoutBtn.textContent = "Cerrar Sesión";
        logoutBtn.onclick = logout;

        nav.appendChild(dashboardLink);
        nav.appendChild(logoutBtn);
    } else {
        const loginLink = document.createElement("a");
        loginLink.href = "login.html";
        loginLink.className = "btn btn-primary";
        loginLink.textContent = "Iniciar Sesión";
        nav.appendChild(loginLink);
    }
}

async function logout() {
    const res = await fetch("/api/auth.php?action=logout", {
        method: "POST",
        credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
        window.location.href = "/";
    } else {
        alert("No se pudo cerrar sesión.");
    }
}

checkSession();
