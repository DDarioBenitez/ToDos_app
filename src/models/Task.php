<?php
require '../../db/database.php';

class Task {
    private $id;
    private $title;
    private $description;
    private $priority;
    private $status;
    private $created_at;
    private $updated_at;

    private $conn;

    public function __construct($conn,$title,$description,$priority,$status){
        $this->conn = $conn;
        $this->title = $title;
        $this->description = $description;
        $this->priority = $priority;
        $this->status = $status;
    }

    public function save(){
        $sql = "INSERT INTO tasks (title, description, priority, status, created_at, updated_at)
                VALUES (:title, :description, :priority, :status, NOW(), NOW())"; 

         $stmt = $this->conn->prepare($sql);
    }


    // Getters and Setters
}