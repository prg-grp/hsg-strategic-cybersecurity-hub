/* Renders the page from window.SITE_DATA (see data.js). No server, no build step. */
(function () {
  const D = window.SITE_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  /* ---------- Section switches ---------- */
  const show = Object.assign({ event: true, eventsTracker: true, participate: true, partners: true }, D.show || {});
  const remove = (sel) => document.querySelectorAll(sel).forEach((n) => n.remove());
  if (!show.event) {
    remove("#event-card, #event, #programme, .cta, nav a[href='#event'], nav a[href='#programme'], .hero .actions a[href='#event']");
    document.querySelector(".hero .container").style.gridTemplateColumns = "1fr";
  }
  if (!show.eventsTracker) remove("#events, nav a[href='#events']");
  if (!show.partners) remove("#partners-title, #partners");
  if (!show.participate) remove("#participate, nav a[href='#participate'], .hero .actions a[href='#participate']");
  document.querySelectorAll("nav li").forEach((li) => { if (!li.querySelector("a")) li.remove(); });
  if (!document.querySelector(".hero .actions a")) remove(".hero .actions");

  /* ---------- Header / hero ---------- */
  document.title = D.hub.name;
  $("hero-eyebrow").textContent = D.hub.eyebrow || "";
  $("hero-title").textContent = D.hub.name;
  $("hero-tagline").textContent = D.hub.tagline;
  $("hero-verbs").innerHTML = (D.hub.verbs || []).map((v) => `<span>${esc(v)}</span>`).join("");
  $("hero-intro").textContent = D.hub.intro;

  /* ---------- Event card with countdown ---------- */
  const ev = D.event;
  const reg = ev.registration;
  const regBtn = (cls) => reg.open
    ? `<a class="btn ${cls}" href="${esc(reg.url)}" ${reg.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${esc(reg.label)}</a>`
    : `<span class="btn ${cls}" aria-disabled="true">Registration opens soon</span>`;

  if (show.event) {
  $("event-card").innerHTML = `
    <span class="eyebrow">${esc(ev.label)}</span>
    <h3>${esc(ev.title)}</h3>
    <div class="when">${esc(ev.dateLabel)} · ${esc(ev.timeLabel)}<br><span class="muted" style="font-weight:400">${esc(ev.location)}</span></div>
    <div class="countdown"><div class="label">Countdown</div><div id="countdown"></div></div>
    <div class="actions">${regBtn("")}<button class="btn outline" id="ics-btn" type="button">Add to calendar</button></div>`;
  }

  function renderCountdown() {
    const now = Date.now(), start = new Date(ev.start).getTime(), end = new Date(ev.end).getTime();
    const el = $("countdown");
    if (now >= end) { el.innerHTML = '<div class="done">Thank you for joining us.</div>'; return; }
    if (now >= start) { el.innerHTML = '<div class="done">Happening now</div>'; return; }
    let s = Math.floor((start - now) / 1000);
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    el.innerHTML = `<div class="units">
      <div class="unit"><b>${d}</b><small>days</small></div>
      <div class="unit"><b>${h}</b><small>hours</small></div>
      <div class="unit"><b>${m}</b><small>min</small></div>
      <div class="unit"><b>${s}</b><small>sec</small></div></div>`;
  }
  if (show.event) { renderCountdown(); setInterval(renderCountdown, 1000); }

  /* ---------- Calendar (.ics) download ---------- */
  function icsDate(iso) { return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  function downloadIcs(title, start, end, location, description, url) {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//HSG Strategic Cybersecurity Hub//EN", "BEGIN:VEVENT",
      "UID:" + Date.now() + "@cybersecurity-hub.unisg.ch", "DTSTAMP:" + icsDate(new Date().toISOString()),
      "DTSTART:" + icsDate(start), "DTEND:" + icsDate(end),
      "SUMMARY:" + title, "LOCATION:" + (location || ""), "DESCRIPTION:" + (description || "") + (url ? "\\n" + url : ""),
      "END:VEVENT", "END:VCALENDAR"];
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = title.replace(/[^\w]+/g, "-").toLowerCase() + ".ics"; document.body.appendChild(a); a.click(); a.remove();
  }
  if (show.event) $("ics-btn").addEventListener("click", () => downloadIcs(ev.title, ev.start, ev.end, ev.location, ev.subtitle, location.href.split("#")[0]));

  /* ---------- About ---------- */
  $("about-title").textContent = D.hub.tagline;
  $("about-text").innerHTML = D.hub.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("flow").innerHTML = (D.hub.flow || []).map((s) => `<div class="step"><strong>${esc(s)}</strong></div>`).join("");

  /* ---------- Event section ---------- */
  if (show.event) {
  $("event-label").textContent = ev.label;
  $("event-title").textContent = ev.title;
  $("event-subtitle").textContent = ev.subtitle;
  $("event-facts").innerHTML = ev.keyFacts.map((f) => `<div class="card"><small class="muted" style="text-transform:uppercase;letter-spacing:.1em;font-size:.75rem">${esc(f.label)}</small><h3 style="margin:6px 0 0">${esc(f.value)}</h3></div>`).join("");
  $("event-audience").innerHTML = ev.audience.map((a) => `<li>${esc(a)}</li>`).join("");
  $("event-reg-note").textContent = [reg.note, reg.deadline].filter(Boolean).join(" ");
  $("event-reg").innerHTML = regBtn("");
  $("cta-text").textContent = ev.subtitle + " " + (reg.note || "");
  $("cta-btn").innerHTML = regBtn("on-dark");
  }

  /* ---------- Programme with filters and search ---------- */
  if (show.event) {
  const types = [...new Set(D.programme.map((p) => p.type))].filter((t) => t !== "break");
  const labels = { keynote: "Keynotes", talk: "Talks", panel: "Panels", workshop: "Workshops" };
  let activeType = "all", query = "";
  $("prog-filters").innerHTML =
    `<button class="chip active" data-type="all" type="button">All</button>` +
    types.map((t) => `<button class="chip" data-type="${esc(t)}" type="button">${esc(labels[t] || t)}</button>`).join("") +
    `<input type="search" id="prog-search" placeholder="Search programme…" aria-label="Search programme">`;
  $("prog-filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    activeType = b.dataset.type;
    document.querySelectorAll("#prog-filters .chip").forEach((c) => c.classList.toggle("active", c === b));
    renderProgramme();
  });
  $("prog-search").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); renderProgramme(); });

  function renderProgramme() {
    const items = D.programme.filter((p) => {
      if (activeType !== "all" && p.type !== activeType) return false;
      if (!query) return true;
      const hay = [p.title, p.abstract, ...(p.speakers || [])].join(" ").toLowerCase();
      return hay.includes(query);
    });
    if (!items.length) { $("prog-list").innerHTML = '<li class="empty">No programme items match.</li>'; return; }
    $("prog-list").innerHTML = items.map((p, i) => `
      <li class="${esc(p.type)}" data-i="${i}">
        <div class="time">${esc(p.time)}</div>
        <div>
          <div class="title">${esc(p.title)}${p.type !== "break" ? `<span class="type ${esc(p.type)}">${esc(p.type)}</span>` : ""}</div>
          ${p.speakers && p.speakers.length ? `<div class="speakers">${esc(p.speakers.join(", "))}</div>` : ""}
          ${p.abstract ? `<div class="abstract">${esc(p.abstract)}</div><button class="more" type="button">Details</button>` : ""}
        </div>
      </li>`).join("");
  }
  $("prog-list").addEventListener("click", (e) => {
    const li = e.target.closest("li"); if (!li || !li.querySelector(".abstract")) return;
    li.classList.toggle("open");
    const b = li.querySelector(".more"); if (b) b.textContent = li.classList.contains("open") ? "Hide details" : "Details";
  });
  renderProgramme();
  }

  /* ---------- Focus areas ---------- */
  $("focus-grid").innerHTML = D.focusAreas.map((f, i) => `
    <div class="card focus">
      <div class="num">${String(i + 1).padStart(2, "0")}</div>
      <h3>${esc(f.title)}</h3>
      <p class="muted" style="margin:0">${esc(f.summary)}</p>
      ${f.more ? `<div class="more-text">${esc(f.more)}</div><button class="more" type="button">More</button>` : ""}
      ${f.links && f.links.length ? `<div class="links">${f.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join(" · ")}</div>` : ""}
    </div>`).join("");
  $("focus-grid").addEventListener("click", (e) => {
    const b = e.target.closest("button.more"); if (!b) return;
    const card = b.closest(".focus"); card.classList.toggle("open");
    b.textContent = card.classList.contains("open") ? "Less" : "More";
  });

  /* ---------- Events tracker ---------- */
  if (show.eventsTracker) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const sorted = [...D.events].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => new Date(e.date) >= today);
  const past = sorted.filter((e) => new Date(e.date) < today).reverse();
  function evHtml(e, isPast) {
    const d = new Date(e.date);
    return `<div class="ev ${isPast ? "past" : ""}">
      <div class="d"><b>${d.getDate()}</b><small>${months[d.getMonth()]} ${d.getFullYear()}</small></div>
      <div>
        <div class="t">${esc(e.title)}</div>
        <div class="m">${[e.type, e.time, e.location].filter(Boolean).map(esc).join(" · ")}</div>
        <div class="a">
          ${e.url ? `<a href="${esc(e.url)}" ${e.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>Details</a>` : ""}
          ${!isPast ? `<button type="button" data-cal="${esc(e.date)}" data-title="${esc(e.title)}" data-loc="${esc(e.location || "")}">Add to calendar</button>` : ""}
          ${e.location ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.location)}" target="_blank" rel="noopener">Map</a>` : ""}
        </div>
      </div></div>`;
  }
  $("events-upcoming").innerHTML = upcoming.length ? upcoming.map((e) => evHtml(e, false)).join("") : '<p class="empty">No upcoming events announced yet.</p>';
  $("events-past").innerHTML = past.length ? past.map((e) => evHtml(e, true)).join("") : '<p class="empty">No past events yet.</p>';
  $("events-upcoming").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-cal]"); if (!b) return;
    const d = b.dataset.cal;
    downloadIcs(b.dataset.title, d + "T09:00:00+01:00", d + "T17:00:00+01:00", b.dataset.loc, "", location.href.split("#")[0]);
  });
  }

  /* ---------- Participate ---------- */
  if (show.participate) $("participate-grid").innerHTML = D.participate.map((p) => `
    <div class="path"><h3>${esc(p.audience)}</h3><p>${esc(p.text)}</p>
      <a href="${esc(p.url)}" ${p.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${esc(p.cta)}</a></div>`).join("");

  /* ---------- Team and partners ---------- */
  $("team-grid").innerHTML = D.team.map((t) => `
    <div class="person">
      ${t.url ? `<a href="${esc(t.url)}" target="_blank" rel="noopener">` : ""}<div class="photo" data-initials="${esc(initials(t.name))}">${t.photo ? `<img src="${esc(t.photo)}" alt="${esc(t.name)}" onerror="this.parentNode.textContent=this.parentNode.dataset.initials">` : esc(initials(t.name))}</div>${t.url ? `</a>` : ""}
      <h3>${t.url ? `<a href="${esc(t.url)}" target="_blank" rel="noopener">${esc([t.title, t.name].filter(Boolean).join(" "))}</a>` : esc([t.title, t.name].filter(Boolean).join(" "))}</h3>
      <div class="role">${esc(t.role)}</div>
      <div class="aff">${esc(t.affiliation)}</div>
    </div>`).join("");
  if (show.partners) $("partners").innerHTML = D.partners.map((p) => `
    <a href="${esc(p.url)}" target="_blank" rel="noopener" title="${esc(p.name)}">${p.logo ? `<img src="${esc(p.logo)}" alt="${esc(p.name)}">` : esc(p.name)}</a>`).join("");

  /* ---------- Contact and footer ---------- */
  const c = D.contact;
  $("contact-block").innerHTML = `
    <div>
      <h3>${esc(c.organiser)}</h3>
      <p>${esc(c.address)}</p>
      ${c.email ? `<p><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>` : ""}
    </div>
    <div>
      <h3>Follow and links</h3>
      <ul>${c.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`).join("")}</ul>
    </div>`;
  $("footer-legal").textContent = D.footer.legal;
  $("footer-links").innerHTML = D.footer.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("");

  /* ---------- Navigation: mobile toggle and active section ---------- */
  const nav = $("main-nav"), toggle = $("nav-toggle");
  toggle.addEventListener("click", () => { const o = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });
  const links = [...nav.querySelectorAll("a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)); });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => io.observe(s));
})();
