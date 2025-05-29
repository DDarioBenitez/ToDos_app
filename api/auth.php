<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../src/controllers/auth/AuthController.php';

$auth = new AuthController();
$data = json_decode(file_get_contents('php://input'), true);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        if ($_GET['action'] == 'register') {
            echo json_encode($auth->register($data));
        } elseif ($_GET['action'] == 'login') {
            echo json_encode($auth->login($data['email'], $data['password']));
        }
        break;
    case 'GET':
        if ($_GET['action'] == 'logout') {
            echo json_encode($auth->logout());
        }
        break;
}
?>