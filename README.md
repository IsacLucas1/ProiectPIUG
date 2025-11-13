# Descoperă România — site static (5 pagini)

Site web despre locuri de vizitat în România, format din 5 pagini:

- `index.html` — Acasă: hero + carusel, link-uri către celelalte pagini
- `destinatii.html` — Destinații: căutare + filtre (chip-uri), carduri
- `tabel.html` — Hartă destinații: Google Maps embedded, schimbă zona cu etichete (chip-uri)
- `video.html` — Video YouTube (nocookie)
- `contact.html` — Formular cu validare (email, telefon RO, câmpuri obligatorii)

Funcționalități cheie:
- Bară de navigare fixă cu evidențierea butonului activ (în funcție de pagina curentă)
- Carusel imagini (auto-play, butoane, bullets)
- Căutare și filtre rapide pentru destinații / tabel
- Icoane rețele sociale (link-uri placeholder)
- Help (modal) + butoane UP/DOWN
- Design responsive + Dark/Light mode cu persistare
- Google Analytics (GA4) – snippet comentat, cu ID placeholder

## Structura

- `index.html`, `destinatii.html`, `tabel.html`, `video.html`, `contact.html`
- `assets/css/styles.css` — stiluri (responsive, dark/light, layout)
- `assets/js/main.js` — interactivitate (carusel, căutare/filtre, validare formular, temă, hartă)
- `assets/img/` — (opțional) imagini locale

## Google Analytics

Fragmentele GA4 (comentate) există în pagini. Pentru a activa:
1. Obține Measurement ID (ex: `G-ABCDE12345`).
2. Înlocuiește `G-XXXXXXXXXX` cu ID-ul tău.
3. Decomentează blocul de script.

## Pentru începători (unde modifici ce-ți trebuie)

- Culori: vezi `assets/css/styles.css` la începutul fișierului (variabilele CSS din `:root` și din `[data-theme="dark"]`).
- Carusel (Acasă): în `index.html`, caută comentariul „Carusel imagini”; fiecare `<figure class="slide">` are o imagine (src/alt) și titlu (`<figcaption>`).
- Destinații (carduri): în `destinatii.html`, fiecare `<article class="card">` are atribute `data-name` și `data-tags` folosite la căutare/filtrare. Înlocuiește imaginile `placehold.co` cu pozele tale.
- Hartă: în `tabel.html`, etichetele (butonele rotunde) au `data-q` — textul trimis la Google Maps. Poți adăuga locații noi duplicând un buton și schimbând `data-q`.
- Video: în `video.html`, schimbă ID-ul YouTube după `/embed/`.
- Formular: în `contact.html` (structura) și `assets/js/main.js` (regulile de validare). Formularul este demo — nu trimite mesaje reale.

## Notițe

- Căutarea funcționează pe paginile respective: carduri în `destinatii.html`. Pagina `tabel.html` este hartă.
- Telefon valid: `07xxxxxxxx` sau `+407xxxxxxxx`.
- Imaginile folosesc `placehold.co` — înlocuiește cu poze proprii din `assets/img/`.
