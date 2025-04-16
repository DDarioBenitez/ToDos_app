<?php
// Capturar la URL
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

// Ruta al archivo actual según la URL
$fullPath = __DIR__ . $uri;

// Si existe el archivo real (ej: imagen, JS, CSS), lo servimos directo
if (file_exists($fullPath) && !is_dir($fullPath)) {
    return false; // PHP servirá automáticamente el archivo
}

// Ruteo manual para las vistas
switch ($uri) {
    case "/":
        require __DIR__ . "/public/html/index.html";
        break;
    case "/login" || "/login.html":
        require __DIR__ . "/public/html/login.html";
        break;
    case "/register" || "/register.html":
        require __DIR__ . "/public/html/register.html";
        break;
    default:
        http_response_code(404);
        echo "Página no encontrada";
        break;
}
