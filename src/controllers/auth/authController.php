<?php
require_once __DIR__ . '/../../models/User.php';
require_once __DIR__ . '/../../db/database.php';

class AuthController {
    private $db;
    private $user;

    public function __construct() {
        $this->db = (new Database())->connect();
        $this->user = new User($this->db);
    }

    public function register($data) {
        $this->user->setName($data['name']);
        $this->user->setEmail($data['email']);
        $this->user->setPassword($data['password']);

        if ($this->user->register()) {
            session_start();
            $_SESSION['user_id'] = $this->user->getId();
            return ['success' => true, 'redirect' => '/dashboard'];
        }
        return ['success' => false, 'error' => 'Error en el registro'];
    }

    public function login($email, $password) {
        if ($this->user->login($email, $password)) {
            session_start();
            $_SESSION['user_id'] = $this->user->getId();
            $_SESSION['user_name'] = $this->user->getName();
            return ['success' => true, 'redirect' => '/dashboard'];
        }
        return ['success' => false, 'error' => 'Credenciales inválidas'];
    }

    public function logout() {
        session_start();
        session_destroy();
        return ['success' => true, 'redirect' => '/login'];
    }
}
?>