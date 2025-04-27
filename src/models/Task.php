<?php
require_once __DIR__ . '/../../db/database.php';

class Task {
    private $id;
    private $user_id;
    private $title;
    private $description;
    private $category;
    private $priority;
    private $status;
    private $created_at;
    private $updated_at;

    private $conn;

    public function __construct($conn, $user_id, $title, $description, $category, $priority, $status){
        $this->conn = $conn;
        $this->user_id = $user_id;
        $this->title = $title;
        $this->description = $description;
        $this->category = $category;
        $this->priority = $priority;
        $this->status = $status;
    }

    public function save(){
        $sql = "INSERT INTO tasks (user_id, title, description, category, priority, status, created_at, updated_at)
                VALUES (:user_id, :title, :description, :category, :priority, :status, NOW(), NOW())";

        $stmt = $this->conn->prepare($sql);

        try {
            $stmt->execute([
                ':user_id' => $this->user_id,
                ':title' => $this->title,
                ':description' => $this->description,
                ':category' => $this->category,
                ':priority' => $this->priority,
                ':status' => $this->status
            ]);
            // Guardar el id insertado
            $this->id = $this->conn->lastInsertId();
            return true;
        } catch (PDOException $e) {
            // Puedes loguear el error o manejarlo aquí
            echo "Error al guardar la tarea: " . $e->getMessage();
            return false;
        }
    }

    // Aquí puedes agregar getters y setters según necesites

    public function get_id(){
        return $this->id;
    }
}
