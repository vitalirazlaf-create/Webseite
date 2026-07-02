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
| `assets/favicon.svg` | Favicon |

## Technik

- Reines HTML/CSS/JavaScript – **kein Build-Schritt nötig**, auf jedem Webspace lauffähig
- Vollständig responsiv (Desktop, Tablet, Smartphone)
- SEO-optimiert: Meta-Tags, Open Graph, `LocalBusiness`-Schema (JSON-LD)
- Barrierearm: semantisches HTML, ARIA-Labels, funktioniert auch ohne JavaScript
- Kontaktformular sendet direkt über [FormSubmit](https://formsubmit.co) an info@it-razlaf.de
  (mit Spam-Honeypot; fällt bei Fehlern automatisch auf das E-Mail-Programm des Besuchers zurück).
  **Wichtig:** Beim allerersten Absenden schickt FormSubmit eine Aktivierungs-E-Mail an
  info@it-razlaf.de – einmal bestätigen, danach läuft der Versand automatisch.

## Veröffentlichen

Einfach alle Dateien in das Web-Root des Hosters hochladen (z. B. per FTP)
oder über GitHub Pages / Netlify / Vercel bereitstellen – es gibt keine Abhängigkeiten.

## Anpassen

- **Texte:** direkt in den HTML-Dateien ändern
- **Farben:** CSS-Variablen am Anfang von `css/style.css` (`--blue`, `--cyan`, `--ink`, …)
- **Online-Terminbuchung:** Der Button „Termin anfragen“ verweist aktuell auf den
  Kontaktbereich. Ein Buchungstool (z. B. Calendly, TIMIFY) kann dort verlinkt
  oder eingebettet werden.
