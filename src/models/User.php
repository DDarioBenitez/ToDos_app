<?php

require_once dirname(__DIR__, 2) . '/db/database.php';

class User
{
    private $conn;
    private $id;
    private $name;
    private $email;
    private $password;
    private $created_at;

    // Constructor con inyección de conexión PDO
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Getters y Setters con validación
    public function setName($name)
    {
        $this->name = htmlspecialchars(strip_tags($name));
    }

    public function setEmail($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->email = $email;
        }
    }

    public function setPassword($password)
    {
        $this->password = password_hash($password, PASSWORD_BCRYPT);
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getEmail()
    {
        return $this->email;
    }


    // Registro de usuario
    public function register()
    {
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
    public function login($email, $password)
    {
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

    // Buscar usuario por ID
    public static function findById($conn, $id)
    {
        $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $user = new User($conn);
            $user->id = $row['id'];
            $user->name = $row['name'];
            $user->email = $row['email'];
            $user->password = $row['password'];
            $user->created_at = $row['created_at'];
            return $user;
        }

        return null;
    }

    // Obtener todos los usuarios
    public static function getAll($conn)
    {
        $stmt = $conn->query("SELECT * FROM users");
        $results = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $user = new User($conn);
            $user->id = $row['id'];
            $user->name = $row['name'];
            $user->email = $row['email'];
            $user->password = $row['password'];
            $user->created_at = $row['created_at'];
            $results[] = $user;
        }

        return $results;
    }

    // Actualizar usuario
    public function update()
    {
        $stmt = $this->conn->prepare("UPDATE users SET name = :name, email = :email WHERE id = :id");
        return $stmt->execute([
            ':name' => $this->name,
            ':email' => $this->email,
            ':id' => $this->id
        ]);
    }

    // Eliminar usuario
    public function delete()
    {
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$this->id]);
    }

    public static function findByEmail($conn, $email)
    {
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $user = new User($conn);
            $user->id = $row['id'];
            $user->name = $row['name'];
            $user->email = $row['email'];
            $user->password = $row['password'];
            $user->created_at = $row['created_at'];
            return $user;
        }

        return null;
    }

}
?>