<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *"); // Allow all domains (you can specify a domain if needed)
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS"); // Allow DELETE and other methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow these headers
require "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond to preflight request
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit;
}

// DELETE request to remove item from cart
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!isset($_GET['item_id'])) {
        echo json_encode(["error" => "Item ID is required"]);
        exit();
    }

    $item_id = (int)$_GET['item_id'];
   
    $query = "DELETE FROM cart WHERE id = ?";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        echo json_encode(["error" => "SQL Error: " . $conn->error]);
        exit();
    }

    $stmt->bind_param("i", $item_id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Item removed from cart"]);
    } else {
        echo json_encode(["error" => "Failed to remove item"]);
    }
    exit();
}

// GET request to fetch cart items
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['user_id'])) {
        echo json_encode(["error" => "User ID is required"]);
        exit();
    }

    $user_id = (int)$_GET['user_id'];

    $query = "SELECT cart.id, cart.quantity, product.name, product.description, product.image, product.price 
              FROM cart 
              JOIN product ON cart.product_id = product.id
              WHERE cart.user_id = ?";

    $stmt = $conn->prepare($query);
    if (!$stmt) {
        echo json_encode(["error" => "SQL Error: " . $conn->error]);
        exit();
    }

    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $cartItems = [];
    while ($row = $result->fetch_assoc()) {
        $cartItems[] = $row;
    }

    echo json_encode($cartItems);
    $conn->close();
    exit();
}

echo json_encode(["error" => "Invalid request"]);
?>