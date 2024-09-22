<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$servername = $_ENV['DB_SERVER'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve JSON data from POST request
    $data = json_decode(file_get_contents("php://input"), true);

    // Prepare an SQL statement for inserting the data
$stmt = $conn->prepare("INSERT INTO company_info (company_name, raison_sociale, adresse, personne_contact, fonction, telephone, fax, email, rc_number, ice_number, date_creation, forme_juridique, intermediaire, nature_activite, secteur_economique, clientele) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if ($stmt === false) {
        die(json_encode(["error" => "Prepare failed: " . $conn->error]));
    }

    // Extract values from the data array
    $company_name = $data['company_name'] ?? '';
    $raison_sociale = $data['raison_sociale'] ?? '';
    $adresse = $data['adresse'] ?? '';
    $personne_contact = $data['personne_contact'] ?? '';
    $fonction = $data['fonction'] ?? '';
    $telephone = $data['telephone'] ?? '';
    $fax = $data['fax'] ?? '';
    $email = $data['email'] ?? '';
    $rc_number = $data['rc_number'] ?? '';
    $ice_number = $data['ice_number'] ?? '';
    $date_creation = $data['date_creation'] ?? '';
    $forme_juridique = $data['forme_juridique'] ?? '';
    $intermediaire = $data['intermediaire'] ?? '';
    $nature_activite = $data['nature_activite'] ?? '';
    $secteur_economique = $data['secteur_economique'] ?? '';
    $clientele = $data['clientele'] ?? '';

    // Bind parameters
$stmt->bind_param("ssssssssssssssss", $company_name, $raison_sociale, $adresse, $personne_contact, $fonction, $telephone, $fax, $email, $rc_number, $ice_number, $date_creation, $forme_juridique, $intermediaire, $nature_activite, $secteur_economique, $clientele);

    // Execute and handle errors
    if ($stmt->execute()) {
        echo json_encode(["message" => "Data saved successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
