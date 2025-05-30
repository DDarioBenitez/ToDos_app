<?php
require_once dirname(__DIR__, 3) . '/db/database.php';
require_once dirname(__DIR__, 2) . '/models/Task.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $mode = $_GET['mode'] ?? null;

    $db = new Database();
    $conn = $db->connect();

    switch ($mode) {
        case 'byUser':
            $userId = $_SESSION['user_id'] ?? null;

            if (!$userId) {
                echo json_encode(['error' => 'Usuario no autenticado.']);
                http_response_code(401);
                break;
            }
            $tasks = Task::findAllByUserId($conn, $userId);
            $response = [];

            foreach ($tasks as $task) {
                $response[] = [
                    'id' => $task->getId(),
                    'user_id' => $task->getUserId(),
                    'title' => $task->getTitle(),
                    'description' => $task->getDescription(),
                    'category' => $task->getCategory(),
                    'priority' => $task->getPriority(),
                    'status' => $task->getStatus(),
                    'created_at' => $task->getCreatedAt(),
                    'updated_at' => $task->getUpdatedAt()
                ];
            }

            echo json_encode([
                'user_id' => $userId,
                'count' => count($response),
                'tasks' => $response
            ]);
            break;

        default:
            echo json_encode(['error' => 'Modo inválido.']);
            http_response_code(400);
            break;
    }
} else {
    echo json_encode(['error' => 'Método no permitido.']);
    http_response_code(405);
}
