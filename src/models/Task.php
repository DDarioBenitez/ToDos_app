<?php
require_once dirname(__DIR__, 2) . '/db/database.php';

class Task
{
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

    public function __construct($conn, $user_id, $title, $description, $category, $priority, $status)
    {
        $this->conn = $conn;
        $this->user_id = $user_id;
        $this->title = $title;
        $this->description = $description;
        $this->category = $category;
        $this->priority = $priority;
        $this->status = $status;
    }

    public function save()
    {
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
            $this->id = $this->conn->lastInsertId();
            return true;
        } catch (PDOException $e) {
            echo "Error al guardar la tarea: " . $e->getMessage();
            return false;
        }
    }

    public function update()
    {
        if (!$this->id) {
            echo "ID no definido. No se puede actualizar.";
            return false;
        }

        $sql = "UPDATE tasks
                SET title = :title, description = :description, category = :category,
                    priority = :priority, status = :status, updated_at = NOW()
                WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        try {
            $stmt->execute([
                ':title' => $this->title,
                ':description' => $this->description,
                ':category' => $this->category,
                ':priority' => $this->priority,
                ':status' => $this->status,
                ':id' => $this->id
            ]);
            return true;
        } catch (PDOException $e) {
            echo "Error al actualizar la tarea: " . $e->getMessage();
            return false;
        }
    }

    // Getters
    public function getId()
    {
        return $this->id;
    }
    public function getUserId()
    {
        return $this->user_id;
    }
    public function getTitle()
    {
        return $this->title;
    }
    public function getDescription()
    {
        return $this->description;
    }
    public function getCategory()
    {
        return $this->category;
    }
    public function getPriority()
    {
        return $this->priority;
    }
    public function getStatus()
    {
        return $this->status;
    }
    public function getCreatedAt()
    {
        return $this->created_at;
    }
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    // Setters
    public function setId($id)
    {
        $this->id = $id;
    }
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }
    public function setTitle($title)
    {
        $this->title = $title;
    }
    public function setDescription($description)
    {
        $this->description = $description;
    }
    public function setCategory($category)
    {
        $this->category = $category;
    }
    public function setPriority($priority)
    {
        $this->priority = $priority;
    }
    public function setStatus($status)
    {
        $this->status = $status;
    }
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;
    }

    public static function findById($conn, $id)
    {
        $sql = "SELECT * FROM tasks WHERE id = :id LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute([':id' => $id]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $task = new Task(
                $conn,
                $row['user_id'],
                $row['title'],
                $row['description'],
                $row['category'],
                $row['priority'],
                $row['status']
            );
            $task->setId($row['id']);
            $task->setCreatedAt($row['created_at']);
            $task->setUpdatedAt($row['updated_at']);
            return $task;
        }

        return null;
    }

    public function delete()
    {
        if (!$this->id) {
            echo "ID no definido. No se puede eliminar.";
            return false;
        }

        $sql = "DELETE FROM tasks WHERE id = :id";
        $stmt = $this->conn->prepare($sql);

        try {
            $stmt->execute([':id' => $this->id]);
            return true;
        } catch (PDOException $e) {
            echo "Error al eliminar la tarea: " . $e->getMessage();
            return false;
        }
    }

    public static function findAllByUserId($conn, $userId)
    {
        $sql = "SELECT * FROM tasks WHERE user_id = :user_id ORDER BY created_at DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute([':user_id' => $userId]);

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $tasks = [];

        foreach ($rows as $row) {
            $task = new Task(
                $conn,
                $row['user_id'],
                $row['title'],
                $row['description'],
                $row['category'],
                $row['priority'],
                $row['status']
            );
            $task->setId($row['id']);
            $task->setCreatedAt($row['created_at']);
            $task->setUpdatedAt($row['updated_at']);
            $tasks[] = $task;
        }

        return $tasks;
    }


}
