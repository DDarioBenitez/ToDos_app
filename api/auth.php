<?php
require_once dirname(__DIR__) . '/src/controllers/auth/AuthController.php';

header('Content-Type: application/json');
session_start();

$auth = new AuthController();
$action = $_GET['action'] ?? null;

switch ($action) {
    case 'register':
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($auth->register($data));
        break;

    case 'login':
        $data = json_decode(file_get_contents('php://input'), true);
        echo json_encode($auth->login($data['email'], $data['password']));
        break;

    case 'logout':
        echo json_encode($auth->logout());
        break;

    case 'session':
        echo json_encode($auth->getSession());
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Acción no válida']);
        break;
}
