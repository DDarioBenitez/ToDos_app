<?php
require 'database.php';
require '../src/models/Task.php';

$database = new Database();
$con = $database->connect();

if($con){
    echo 'conectado';
}else{
    echo 'no conectado';
}