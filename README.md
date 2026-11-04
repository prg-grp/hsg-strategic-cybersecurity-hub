# HSG Strategic Cybersecurity Hub – website

Static site: no server, no build step. Upload the whole folder to any web host
(or open index.html locally) and it works.

Files
- index.html  page structure
- styles.css  HSG-style theme (colours in the :root block at the top)
- app.js      renders the page from the content file (countdown, programme filters,
              events tracker, add-to-calendar, expandable focus areas, mobile menu)
- data.js     ALL CONTENT. Edit this file to update texts, programme, speakers,
              events, focus areas, team, partners, contact. Nothing else needs changing.

Notes
- Registration: set event.registration.url in data.js to the real registration link.
- Photos/logos: put images in an img/ folder and reference them as "img/name.jpg".
- Events are sorted into upcoming/past automatically by their date.
