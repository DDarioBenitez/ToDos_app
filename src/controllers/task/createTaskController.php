<?php
require_once dirname(__DIR__, 3) . '/db/database.php';
require_once dirname(__DIR__, 2) . '/models/Task.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $user_id = $data['user_id'] ?? null;
    $title = $data['title'] ?? null;
    $description = $data['description'] ?? null;
    $category = $data['category'] ?? null;
    $priority = $data['priority'] ?? null;
    $status = $data['status'] ?? 'pendiente';

    if (!$user_id || !$title || !$description || !$category || !$priority) {
        echo json_encode(['error' => 'Faltan campos obligatorios.']);
        http_response_code(400);
        exit;
    }

    // ✅ Acá instanciás y conectás
    $db = new Database();
    $conn = $db->connect();

    try {
        $task = new Task($conn, $user_id, $title, $description, $category, $priority, $status);
        $result = $task->save();

        if ($result) {
            echo json_encode([
                'success' => true,
                'message' => 'Tarea creada correctamente.',
                'task_id' => $task->getId()
            ]);
        } else {
            echo json_encode(['error' => 'No se pudo guardar la tarea.']);
            http_response_code(500);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
        http_response_code(500);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
    http_response_code(405);
}
