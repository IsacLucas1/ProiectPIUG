## ✨ De ce acest proiect?
România are locuri superbe pe care mulți le descoperă întâmplător. Acest site demonstrează cât de repede poți construi o experiență clară pentru prezentare de destinații, hărți, video și contact – fără backend, doar HTML/CSS/JS modern. Perfect pentru un proiect universitar, un prototip de portal turistic sau baza pentru ceva mai mare.

## 🧭 Ce găsești aici
- Pagina Acasă cu hero, carusel și call‑to‑action
- Listă filtrabilă de destinații (căutare textuală + tag‑uri)
- Hartă dinamică (Google Maps embed cu zone schimbabile)
- Pagină video (YouTube embed privacy‑friendly)
- Formular de contact validat (email, telefon RO, câmpuri obligatorii)
- Mod Întunecat/Luminos cu preferință salvată
- Navigație sticky + evidențiere automată a paginii curente
- Butoane flotante Sus/Jos și un mic dialog „Ajutor”

## 🛠️ Tehnologii & abordare
Doar <strong>HTML + CSS + Vanilla JS</strong>. Fără framework-uri grele. Arhitectură simplă: fiecare pagină își are rolul, iar JS-ul comun (`assets/js/main.js`) activează tema, filtrarea, caruselul și restul interacțiunilor.

## 📂 Structură rapidă
```
index.html            # Acasă
destinatii.html       # Filtre + carduri destinații
harta.html            # Hartă + zone mapabile
video.html            # Embed video
contact.html          # Formular validat
assets/css/styles.css # Stiluri + variabile + responsive
assets/js/main.js     # Interactivitate
assets/img/           # Imagini (personalizabile)
```

## 🔍 Personalizare instant
- Culori: primele variabile din `styles.css` (inclusiv modul dark)
- Destinații: editează `<article class="card" ...>` și imaginile (înlocuiește placeholder)
- Hartă: butoanele au `data-q` – adaugă/editează pentru noi zone
- Video: schimbă ID‑ul după `/embed/`
- Formular: ajustează regulile în `main.js`

## 📈 Analytics (opțional)
Există un snippet GA4 comentat. Pentru activare:
1. Ia Measurement ID (`G-XXXXXX`).
2. Înlocuiește placeholder-ul.
3. Decomentează blocul.

## 🚀 Cum pornești
Pur și simplu deschizi `index.html` în browser. Pentru live hosting rapid:
1. Creează un repo GitHub
2. Pune fișierele
3. Activează GitHub Pages (branch `main`, root folder)
4. Gata – site static online