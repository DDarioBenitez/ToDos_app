<?php
require_once dirname(__DIR__, 3) . '/db/database.php';
require_once dirname(__DIR__, 2) . '/models/User.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;

    if ($id) {
        $user = User::findById($conn, $id);
        if ($user) {
            echo json_encode([
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail()
            ]);
        } else {
            echo json_encode(['error' => 'Usuario no encontrado.']);
            http_response_code(404);
        }
    } else {
        $users = User::getAll($conn);
        $response = [];
        foreach ($users as $user) {
            $response[] = [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail()
            ];
        }
        echo json_encode($response);
    }
}
