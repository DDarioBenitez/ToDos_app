<?php
require_once dirname(__DIR__, 3) . '/db/database.php';
require_once dirname(__DIR__, 2) . '/models/User.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;

    if (!$name || !$email || !$password) {
        echo json_encode(['error' => 'Faltan campos.']);
        http_response_code(400);
        exit;
    }

    $user = new User($conn);
    $user->setName($name);
    $user->setEmail($email);
    $user->setPassword($password);

    if ($user->register()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'No se pudo registrar.']);
        http_response_code(500);
    }
}
