<?php
require_once dirname(__DIR__, 2) . '/models/User.php';
require_once dirname(__DIR__, 3) . '/db/database.php';

class AuthController
{
    private $db;
    private $user;

    public function __construct()
    {
        $this->db = (new Database())->connect();
        $this->user = new User($this->db);
        session_start();
    }

    public function register($data)
    {
        $this->user->setName($data['name']);
        $this->user->setEmail($data['email']);
        $this->user->setPassword($data['password']);

        if ($this->user->register()) {
            // Buscar el usuario recién creado (para obtener su ID)
            $usuario = User::findByEmail($this->db, $data['email']);
            if ($usuario) {
                $_SESSION['user_id'] = $usuario->getId();
                $_SESSION['user_name'] = $usuario->getName();

                // setear cookie
                setcookie("user_id", $usuario->getId(), time() + 86400, "/"); // 1 día
                return ['success' => true, 'redirect' => '/dashboard'];
            }
        }

        return ['success' => false, 'error' => 'Error en el registro'];
    }

    public function login($email, $password)
    {
        if ($this->user->login($email, $password)) {
            $_SESSION['user_id'] = $this->user->getId();
            $_SESSION['user_name'] = $this->user->getName();

            // Opcional: setear cookie
            setcookie("user_id", $this->user->getId(), time() + 86400, "/"); // 1 día

            return ['success' => true, 'redirect' => '/dashboard'];
        }

        return ['success' => false, 'error' => 'Credenciales inválidas'];
    }

    public function logout()
    {
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params["path"]);
        }

        session_destroy();
        setcookie("user_id", "", time() - 3600, "/");

        return ['success' => true, 'redirect' => '/login'];
    }

    public function getSession()
    {
        if (isset($_SESSION['user_id'])) {
            return [
                'logged_in' => true,
                'user_id' => $_SESSION['user_id'],
                'user_name' => $_SESSION['user_name'] ?? null
            ];
        } else {
            return ['logged_in' => false];
        }
    }
}
