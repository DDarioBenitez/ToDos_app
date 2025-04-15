<?php
header('Content-Type: application/json');
require_once 'database.php';

$action = $_POST['action'] ?? '';

try {
    $db = new Database();
    $conn = $db->connect();

    switch ($action) {
        case 'login':
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            // Validación y autenticación
            echo json_encode(['success' => true]);
            break;

        case 'register':
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT);

            // Registro de usuario
            echo json_encode(['success' => true]);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no válida']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>