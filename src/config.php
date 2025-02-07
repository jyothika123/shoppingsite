<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (change "*" to specific domain for security)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);
$host = "localhost";  // Change if using a remote server
$user = "root";       // Change to your MySQL username
$pass = "";           // Change to your MySQL password
$dbname = "shoppingSite";     // Name of the database

$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}
?>