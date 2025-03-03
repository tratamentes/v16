<?php
$access_token = "AIzaSyDJCujjoFFMahshXTpDpMHQbiqQE9-BQ8U"; // Precisa obter via OAuth2
$location_id = "13999067718945286900"; // ID do seu negócio 13999067718945286900

$url = "https://mybusiness.googleapis.com/v4/accounts/SEU_ACCOUNT_ID/locations/$location_id/reviews";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Bearer $access_token",
    "Content-Type: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

// Salvar JSON em um arquivo para usar depois
file_put_contents("data/reviews.json", $response);

echo "Reviews salvas com sucesso!";
?>
