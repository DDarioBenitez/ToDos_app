<?php
session_start();

// Capturar la URL
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$fullPath = __DIR__ . $uri;

// Si es un archivo real (css, js, img...), lo dejamos pasar
if (file_exists($fullPath) && !is_dir($fullPath)) {
    return false;
}

// Definir rutas públicas y protegidas
$publicRoutes = [
    "/",
    "/login",
    "/login.html",
    "/register",
    "/register.html",
];

$protectedRoutes = [
    "/dashboard",
    "/dashboard.html",
];

// Redireccionar si la ruta es privada y el usuario no está logueado
if (in_array($uri, $protectedRoutes)) {
    if (!isset($_SESSION['user_id'])) {
        header("Location: /login");
        exit;
    }
}

// Ruteo manual para las vistas
switch ($uri) {
    case "/":
        require __DIR__ . "/public/html/index.html";
        break;
    case "/login":
    case "/login.html":
        require __DIR__ . "/public/html/login.html";
        break;
    case "/register":
    case "/register.html":
        require __DIR__ . "/public/html/register.html";
        break;
    case "/dashboard":
    case "/dashboard.html":
        require __DIR__ . "/protected/html/dashboard.html";
        break;
    default:
        http_response_code(404);
        echo "Página no encontrada";
        break;
}
