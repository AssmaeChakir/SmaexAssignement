<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve data from form submission
    $entreprise = $_POST['entreprise'] ?? '';
    $raison_sociale = $_POST['raison_sociale'] ?? '';
    $adresse = $_POST['adresse'] ?? '';

    $contact_person = $_POST['contact_person'] ?? '';
    $fonction = $_POST['fonction'] ?? '';
    $telephone = $_POST['telephone'] ?? '';
    $fax = $_POST['fax'] ?? '';
    $email = $_POST['email'] ?? '';

    $rc = $_POST['rc'] ?? '';
    $ice = $_POST['ice'] ?? '';
    $date_creation = $_POST['date_creation'] ?? '';
    $forme_juridique = $_POST['forme_juridique'] ?? '';

    $intermediaire = $_POST['intermediaire'] ?? '';

    // Retrieve nature of activity
    $nature_activite = $_POST['nature_activite'] ?? [];
    $nature_activite_list = implode(', ', $nature_activite);

    // Retrieve sector of activity and descriptions
    $secteur_economique = $_POST['secteur_economique'] ?? [];
    $descriptions = [];
    foreach ($secteur_economique as $secteur) {
        $description_key = 'description_' . str_replace(' ', '_', strtolower($secteur));
        $descriptions[$secteur] = $_POST[$description_key] ?? '';
    }

    // Retrieve clientele composition
    $clientele = $_POST['clientele'] ?? [];
    $clientele_list = implode(', ', $clientele);

    // Display or process the data
    echo "<h1>Formulaire soumis</h1>";
    echo "<p><strong>Nom de l'entreprise:</strong> $entreprise</p>";
    echo "<p><strong>Raison sociale:</strong> $raison_sociale</p>";
    echo "<p><strong>Adresse:</strong> $adresse</p>";
    echo "<p><strong>Personne à contacter:</strong> $contact_person</p>";
    echo "<p><strong>Fonction:</strong> $fonction</p>";
    echo "<p><strong>Téléphone:</strong> $telephone</p>";
    echo "<p><strong>Fax:</strong> $fax</p>";
    echo "<p><strong>E-mail:</strong> $email</p>";
    echo "<p><strong>N° de RC:</strong> $rc</p>";
    echo "<p><strong>N° ICE:</strong> $ice</p>";
    echo "<p><strong>Date de création:</strong> $date_creation</p>";
    echo "<p><strong>Forme juridique:</strong> $forme_juridique</p>";
    echo "<p><strong>Intermédiaire:</strong> $intermediaire</p>";

    echo "<p><strong>Nature de l'activité:</strong> $nature_activite_list</p>";
    foreach ($descriptions as $secteur => $description) {
        echo "<p><strong>Description pour $secteur:</strong> $description</p>";
    }

    echo "<p><strong>Composition de la clientèle:</strong> $clientele_list</p>";
}
?>
