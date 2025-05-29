<?php
class User {
    private $id;
    private $name;
    private $email;
    private $password;
    private $created_at;

    // Constructor con inyección de conexión PDO
    public function __construct($db) {
        $this->conn = $db;
    }

    // Getters y Setters con validación
    public function setName($name) {
        $this->name = htmlspecialchars(strip_tags($name));
    }

    public function setEmail($email) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->email = $email;
        }
    }

    public function setPassword($password) {
        $this->password = password_hash($password, PASSWORD_BCRYPT);
    }

    // Registro de usuario
    public function register() {
        $query = "INSERT INTO users SET name=:name, email=:email, password=:password";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);

        return $stmt->execute();
    }

    // Login de usuario
    public function login($email, $password) {
        $query = "SELECT id, name, password FROM users WHERE email = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $this->id = $user['id'];
            $this->name = $user['name'];
            return true;
        }
        return false;
    }
}
?>