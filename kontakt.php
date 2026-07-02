<?php
/**
 * IT Razlaf – Kontaktformular-Versand (für IONOS Webhosting)
 *
 * Nimmt die Formulardaten per POST entgegen, prüft sie und sendet sie
 * per E-Mail an die unten konfigurierte Adresse. Antwortet mit JSON.
 */

header('Content-Type: application/json; charset=utf-8');

// ---------- Konfiguration ----------
$empfaenger = 'info@it-razlaf.de';
// Absender muss eine Adresse der eigenen Domain sein, sonst lehnt IONOS den Versand ab:
$absender   = 'formular@it-razlaf.de';
// -----------------------------------

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Methode nicht erlaubt']);
    exit;
}

// Honeypot: von Bots ausgefüllt, von Menschen nicht sichtbar
if (!empty($_POST['_honey'])) {
    // Bots bekommen "Erfolg", damit sie nicht weiterprobieren
    echo json_encode(['ok' => true]);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$telefon = trim($_POST['phone'] ?? '');
$text    = trim($_POST['message'] ?? '');

if ($name === '' || $text === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Bitte füllen Sie alle Pflichtfelder korrekt aus.']);
    exit;
}

// Header-Injection verhindern
$name  = str_replace(["\r", "\n"], ' ', mb_substr($name, 0, 200));
$email = str_replace(["\r", "\n"], '', mb_substr($email, 0, 200));
$telefon = str_replace(["\r", "\n"], ' ', mb_substr($telefon, 0, 100));
$text  = mb_substr($text, 0, 5000);

$betreff = mb_encode_mimeheader('Neue Anfrage über it-razlaf.de – ' . $name, 'UTF-8');

$nachricht = "Neue Anfrage über das Kontaktformular auf it-razlaf.de\n"
    . "------------------------------------------------------\n\n"
    . "Name:    $name\n"
    . "E-Mail:  $email\n"
    . "Telefon: " . ($telefon !== '' ? $telefon : '–') . "\n\n"
    . "Anliegen:\n$text\n\n"
    . "------------------------------------------------------\n"
    . "Gesendet am: " . date('d.m.Y H:i') . " Uhr\n";

$headers = [
    'From: IT Razlaf Webseite <' . $absender . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$gesendet = mail($empfaenger, $betreff, $nachricht, implode("\r\n", $headers));

if ($gesendet) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Versand fehlgeschlagen']);
}
