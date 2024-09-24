<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set the headers for CORS and JSON response
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Handle preflight request
}

// Initialize the response variable
$response = [];

// Load environment variables
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Database connection details
$servername = $_ENV['DB_SERVER'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    $response['error'] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve JSON data from POST request
    $data = json_decode(file_get_contents("php://input"), true);

    // Check for valid JSON data
    if ($data === null) {
        $response['error'] = "Invalid JSON data";
        echo json_encode($response);
        exit();
    }
// Prepare variables
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
$au_comptant = json_encode($data['au_comptant'] ?? []); 
$a_credit = json_encode($data['a_credit'] ?? []); 
$duree_credit = json_encode($data['duree_credit'] ?? []); 
$comptant_documents = json_encode($data['comptant_documents'] ?? []); 
$domestique = json_encode($data['domestique'] ?? []); // Ensured ?? [] is added
$xport = json_encode($data['xport'] ?? []); // Ensured ?? [] is added
$autre = $data['autre'] ?? ''; 
$aucomptant = json_encode($data['aucomptant'] ?? []); 
$acredit = json_encode($data['acredit'] ?? []); 

// Prepare an SQL statement for inserting the company info
$stmt1 = $conn->prepare("
    INSERT INTO company_info (
        company_name, 
        raison_sociale, 
        adresse, 
        personne_contact, 
        fonction, 
        telephone, 
        fax, 
        email, 
        rc_number, 
        ice_number, 
        date_creation, 
        forme_juridique, 
        intermediaire, 
        nature_activite, 
        secteur_economique, 
        clientele, 
        au_comptant, 
        a_credit, 
        duree_credit, 
        comptant_documents,
        domestique, 
        xport,
        autre, 
        aucomptant, 
        acredit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

if ($stmt1 === false) {
    $response['error'] = "Prepare failed: " . $conn->error;
    echo json_encode($response);
    exit();
}

// Bind parameters by reference
$stmt1->bind_param(
    "sssssssssssssssssssssssss", // 25 's' characters for each variable
    $company_name, 
    $raison_sociale, 
    $adresse, 
    $personne_contact, 
    $fonction, 
    $telephone, 
    $fax, 
    $email, 
    $rc_number, 
    $ice_number, 
    $date_creation, 
    $forme_juridique, 
    $intermediaire, 
    $nature_activite, 
    $secteur_economique, 
    $clientele, 
    $au_comptant, 
    $a_credit, 
    $duree_credit, 
    $comptant_documents,
    $domestique, 
    $xport, 
    $autre, 
    $aucomptant, 
    $acredit
);

// Execute the statement
if ($stmt1->execute()) {
    $response = [
        "success" => true,
        "message" => "Data saved successfully"
    ];
} else {
    $response['error'] = "Error inserting record: " . $stmt1->error;
}

$stmt1->close();

// Close the connection
$conn->close();

// Send the response as JSON
echo json_encode($response);
exit();
}
?>
