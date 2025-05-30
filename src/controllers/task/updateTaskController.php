<?php
require_once dirname(__DIR__, 3) . '/db/database.php';
require_once dirname(__DIR__, 2) . '/models/Task.php';
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Obtener el cuerpo JSON
    $input = json_decode(file_get_contents("php://input"), true);

    $id = $input['id'] ?? null;
    $title = $input['title'] ?? null;
    $description = $input['description'] ?? null;
    $category = $input['category'] ?? null;
    $priority = $input['priority'] ?? null;
    $status = $input['status'] ?? null;

    if (!$id) {
        echo json_encode(['error' => 'ID de tarea faltante.']);
        http_response_code(400);
        exit;
    }

    // ✅ Acá instanciás y conectás
    $db = new Database();
    $conn = $db->connect();

    // Buscar la tarea
    $task = Task::findById($conn, $id);

    if (!$task) {
        echo json_encode(['error' => 'Tarea no encontrada.']);
        http_response_code(404);
        exit;
    }

    // Actualizar campos si fueron enviados
    if ($title)
        $task->setTitle($title);
    if ($description)
        $task->setDescription($description);
    if ($category)
        $task->setCategory($category);
    if ($priority)
        $task->setPriority($priority);
    if ($status)
        $task->setStatus($status);

    // Guardar cambios
    $result = $task->update();

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Tarea actualizada correctamente.',
            'task_id' => $task->getId()
        ]);
    } else {
        echo json_encode(['error' => 'No se pudo actualizar la tarea.']);
        http_response_code(500);
    }
} else {
    echo json_encode(['error' => 'Método no permitido.']);
    http_response_code(405);
}
