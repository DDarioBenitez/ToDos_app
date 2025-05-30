<?php
require_once dirname(__DIR__, 3) . '/db/database.php';
require_once dirname(__DIR__, 2) . '/models/User.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;

    if (!$id || !$name || !$email) {
        echo json_encode(['error' => 'Faltan campos.']);
        http_response_code(400);
        exit;
    }

    $user = User::findById($conn, $id);
    if (!$user) {
        echo json_encode(['error' => 'Usuario no encontrado.']);
        http_response_code(404);
        exit;
    }

    $user->setName($name);
    $user->setEmail($email);

    if ($user->update()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'No se pudo actualizar.']);
        http_response_code(500);
    }
}
