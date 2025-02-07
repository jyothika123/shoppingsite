<?php

require "config.php"; // Include database connection

$sql = "SELECT id, name, description, image, price, shippingcost FROM Product";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
} else {
    echo json_encode(["message" => "No products found"]);
}

$conn->close();
?>