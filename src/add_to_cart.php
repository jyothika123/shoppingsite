<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allowed request methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers

// Handle CORS preflight request (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require "config.php"; // Ensure this contains $conn

$data = json_decode(file_get_contents("php://input"), true); // Convert to associative array

if (isset($data["product_id"], $data["quantity"], $data["user_id"])) {
    $product_id = (int)$data["product_id"];
    $quantity = (int)$data["quantity"];
    $user_id = (int)$data["user_id"];

    // Check if the product is already in the cart
    $checkQuery = "SELECT id, quantity FROM cart WHERE product_id = ? AND user_id = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("ii", $product_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        // If product exists, update quantity
        $newQuantity = $row['quantity'] + $quantity;
        $updateQuery = "UPDATE cart SET quantity = ? WHERE id = ?";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param("ii", $newQuantity, $row['id']);
    } else {
        // Insert new record
        $insertQuery = "INSERT INTO cart (product_id, quantity, user_id) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("iii", $product_id, $quantity, $user_id);
    }

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product added to cart successfully"]);
    } else {
        echo json_encode(["error" => "Failed to add product to cart"]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();
?>