<?php
require_once __DIR__ . "/database.php";
require_once __DIR__ . "/../src/models/Task.php";

$database = new Database();
$conn = $database->connect();

if (!$conn) {
    die("No se pudo conectar a la base de datos.");
}

// Crear una nueva tarea
$task = new Task(
    $conn,
    1, // user_id (debe existir en la tabla users)
    "Mi nueva tarea",
    "Descripción de la tarea",
    "Development", // categoría válida: Design, Development, Research, Documentation
    "medium",      // prioridad: low, medium, high
    "pending"      // estado: pending, in_progress, completed, suspended
);

if ($task->save()) {
    echo "Tarea guardada correctamente con ID: " . $task->getId();
} else {
    echo "Error al guardar la tarea.";
}
