# IT Razlaf – Webseite

Moderne, schnelle Unternehmens-Webseite für **IT Razlaf** (www.it-razlaf.de) –
IT-Service, Support und KI-Automatisierung in Dülmen.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite (Hero, Leistungen, Automatisierung, Ablauf, Über uns, FAQ, Kontakt) |
| `impressum.html` | Impressum |
| `datenschutz.html` | Datenschutzerklärung |
| `css/style.css` | Komplettes Design-System (responsiv, Animationen) |
| `js/main.js` | Interaktionen (Navigation, Scroll-Animationen, FAQ, Kontaktformular) |
| `kontakt.php` | Serverseitiger Versand des Kontaktformulars (PHP, für IONOS) |
| `assets/favicon.svg` | Favicon |

## Technik

- Reines HTML/CSS/JavaScript – **kein Build-Schritt nötig**, auf jedem Webspace lauffähig
- Vollständig responsiv (Desktop, Tablet, Smartphone)
- SEO-optimiert: Meta-Tags, Open Graph, `LocalBusiness`-Schema (JSON-LD)
- Barrierearm: semantisches HTML, ARIA-Labels, funktioniert auch ohne JavaScript
- Kontaktformular sendet über das eigene Skript `kontakt.php` (PHP `mail()`, läuft auf
  IONOS-Webhosting ohne weitere Konfiguration) direkt an info@it-razlaf.de – kein Drittanbieter,
  mit Spam-Honeypot; fällt bei Fehlern automatisch auf das E-Mail-Programm des Besuchers zurück.
  **Voraussetzung:** Die Absenderadresse `formular@it-razlaf.de` (konfigurierbar oben in
  `kontakt.php`) muss zur Domain gehören – bei IONOS ggf. als E-Mail-Adresse oder Alias anlegen.

## Veröffentlichen

Einfach alle Dateien in das Web-Root des Hosters hochladen (z. B. per FTP)
oder über GitHub Pages / Netlify / Vercel bereitstellen – es gibt keine Abhängigkeiten.

## Anpassen

- **Texte:** direkt in den HTML-Dateien ändern
- **Farben:** CSS-Variablen am Anfang von `css/style.css` (`--blue`, `--cyan`, `--ink`, …)
- **Online-Terminbuchung:** Der Button „Termin anfragen“ verweist aktuell auf den
  Kontaktbereich. Ein Buchungstool (z. B. Calendly, TIMIFY) kann dort verlinkt
  oder eingebettet werden.
