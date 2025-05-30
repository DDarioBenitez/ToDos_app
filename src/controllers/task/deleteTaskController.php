<?php
require_once __DIR__ . '../../../db/database.php';
require_once __DIR__ . '/../../models/Task.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        echo json_encode(['error' => 'Falta el ID de la tarea.']);
        http_response_code(400);
        exit;
    }

    $task = Task::findById($conn, $id);

    if (!$task) {
        echo json_encode(['error' => 'Tarea no encontrada.']);
        http_response_code(404);
        exit;
    }

    $result = $task->delete();

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Tarea eliminada correctamente.',
            'task_id' => $id
        ]);
    } else {
        echo json_encode(['error' => 'No se pudo eliminar la tarea.']);
        http_response_code(500);
    }
} else {
    echo json_encode(['error' => 'Método no permitido.']);
    http_response_code(405);
}
