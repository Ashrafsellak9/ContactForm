<?php 
  $db_host = "localhost";
  $db_user = "root";
  $db_password = "";
  $db_name = "contact_system";

  $pdo = new PDO('mysql:host=$db_host;dbname=$db_name', $db_user, $db_password);
  try {

  } catch (PDOException $e) {
    die("Connection Failed: " . $e->getMessage());
  }
?>