/* ─────────────────────────────────────────────────────────────────────────────
   app.js — Wedding Gallery
   Zero dependencies. Samples are embedded below — no fetch, no server needed.
   To add a sample: add an object to SAMPLES, drop a thumb in thumbs/, done.
───────────────────────────────────────────────────────────────────────────── */

// ── SAMPLES — edit here to add / change cards ─────────────────────────────────
// Fields:
//   id        unique slug (used for thumb filename if no image path given)
//   title     "Name & Name" — shown on card and in WhatsApp message
//   url       live invitation link (leave "" to route clicks to WhatsApp)
//   category  drives the filter chips — any string, new ones appear automatically
//   image     relative path to thumb image, e.g. "thumbs/abc.jpg"  (leave "" for SVG design)
//   featured  true = pinned to top of grid
//   addedAt   ISO date — cards within 30 days get a "New" badge

const SAMPLES = [
  // ── Christian ────────────────────────────────────────────────────────────
  { id:"jishnu-karthika",      title:"Jishnu & Karthika",          url:"https://jishnu-karthika.skenllp.com/",                            category:"Christian", image:"", featured:true,  addedAt:"2026-10-06" },
  { id:"vishnu-sandra-sk",     title:"Vishnu & Sandra",             url:"https://vishnu-sandra.skenllp.com",                               category:"Christian", image:"", featured:true,  addedAt:"2026-10-05" },
  { id:"vishnu-sandra-vr",     title:"Vishnu & Sandra",             url:"https://vishnu-sandra.vercel.app/",                               category:"Christian", image:"", featured:false, addedAt:"2026-10-04" },
  { id:"gokul-greeshma-main",  title:"Gokul & Greeshma",            url:"https://gokul-greeshma-main.vercel.app/",                         category:"Christian", image:"", featured:false, addedAt:"2026-10-03" },
  { id:"gokul-greeshma-inv",   title:"Gokul & Greeshma",            url:"https://gokul-greeshma-invitation.vercel.app/",                   category:"Christian", image:"", featured:false, addedAt:"2026-10-02" },
  { id:"gokul-greshma",        title:"Gokul & Greshma",             url:"https://gokul-greshma.vercel.app/",                               category:"Christian", image:"", featured:false, addedAt:"2026-10-01" },
  { id:"merlymol-nikhil",      title:"Merlymol & Nikhil",           url:"https://merlymol-nikhil.skenllp.com/",                            category:"Christian", image:"", featured:true,  addedAt:"2026-09-30" },
  { id:"sanjo-rose-mary",      title:"Sanjo & Rose Mary",           url:"https://sanjo-rose-mary.skenllp.com/",                            category:"Christian", image:"", featured:false, addedAt:"2026-09-29" },
  { id:"christy-vinaya",       title:"Christy & Vinaya",            url:"https://christy-vinaya.skenllp.com/",                             category:"Christian", image:"", featured:false, addedAt:"2026-09-28" },
  { id:"jismon-aleena",        title:"Jismon & Aleena",             url:"https://jismon-aleena.skenllp.com/",                              category:"Christian", image:"", featured:false, addedAt:"2026-09-27" },
  { id:"sinimartin",           title:"Sini & Martin",               url:"https://sinimartin.vercel.app/",                                  category:"Christian", image:"", featured:false, addedAt:"2026-09-26" },
  { id:"gladson-nisha",        title:"Gladson & Nisha",             url:"https://gladson-nisha.skenllp.com/",                              category:"Christian", image:"", featured:false, addedAt:"2026-09-25" },
  { id:"albert-mariya",        title:"Albert & Mariya",             url:"https://albert-mariya.skenllp.com/",                              category:"Christian", image:"", featured:false, addedAt:"2026-09-24" },
  { id:"jeffin-sneha",         title:"Jeffin & Sneha",              url:"https://jeffin-sneha.skenllp.com/",                               category:"Christian", image:"", featured:false, addedAt:"2026-09-23" },
  { id:"ashik-irin",           title:"Ashik & Irin Mariya",         url:"https://ashikthomas-irinmariyaanto.skenllp.com",                  category:"Christian", image:"", featured:false, addedAt:"2026-09-22" },
  { id:"anitta-sunny",         title:"Anitta & Sunny",              url:"https://anitta-sunny.vercel.app/",                                category:"Christian", image:"", featured:false, addedAt:"2026-09-21" },
  { id:"nibin-asha",           title:"Nibin & Asha",                url:"https://nibin-asha.vercel.app",                                   category:"Christian", image:"", featured:false, addedAt:"2026-09-20" },
  { id:"nithin-daya",          title:"Nithin & Daya",               url:"https://nithin-daya.vercel.app/",                                 category:"Christian", image:"", featured:false, addedAt:"2026-09-19" },
  { id:"bestin-mareena",       title:"Bestin & Mareena",            url:"https://bestin-mareena.vercel.app/",                              category:"Christian", image:"", featured:false, addedAt:"2026-09-18" },
  { id:"jishnu-vibha",         title:"Jishnu & Vibha",              url:"https://jishnu-vibha.skenllp.com/",                               category:"Christian", image:"", featured:false, addedAt:"2026-09-17" },
  { id:"sample-wedding",       title:"Sample Wedding",              url:"http://sample-wedding-livid.vercel.app/",                         category:"Christian", image:"", featured:false, addedAt:"2026-09-16" },

  // ── Hindu ─────────────────────────────────────────────────────────────────
  { id:"wedding-invitation",   title:"Wedding Invitation",          url:"https://wedding-invitation-ten-jet.vercel.app/",                  category:"Hindu",     image:"", featured:true,  addedAt:"2026-10-06" },
  { id:"athira-vinay",         title:"Athira & Vinay",              url:"https://athira-vinay.skenllp.com",                                category:"Hindu",     image:"", featured:true,  addedAt:"2026-10-05" },
  { id:"vinay-athira-wedding", title:"Vinay & Athira",              url:"https://vinay-athirawedding.vercel.app/",                         category:"Hindu",     image:"", featured:false, addedAt:"2026-10-04" },
  { id:"vishnuamruthanath",    title:"Vishnu & Amruthanath",        url:"https://vishnuamruthanath.vercel.app/",                           category:"Hindu",     image:"", featured:false, addedAt:"2026-10-03" },
  { id:"umesh-neethu",         title:"Umesh & Neethu",              url:"https://umesh-neethu.skenllp.com/",                               category:"Hindu",     image:"", featured:false, addedAt:"2026-10-02" },
  { id:"thamanna-afeef",       title:"Thamanna & Afeef",            url:"https://thamanna-afeef.vercel.app/",                              category:"Hindu",     image:"", featured:false, addedAt:"2026-10-01" },
  { id:"naadham-rishi",        title:"Naadham & Rishi",             url:"https://naadham-rishi.vercel.app/",                               category:"Hindu",     image:"", featured:false, addedAt:"2026-09-30" },
  { id:"akash-sukanya",        title:"Akash & Sukanya",             url:"https://akash-sukanya.vercel.app/",                               category:"Hindu",     image:"", featured:false, addedAt:"2026-09-29" },
  { id:"imthiyas-rinshi",      title:"Imthiyas & Rinshi",           url:"https://imthiyas-rinshi.vercel.app",                              category:"Hindu",     image:"", featured:false, addedAt:"2026-09-28" },

  // ── Nikah ─────────────────────────────────────────────────────────────────
  { id:"rashid-salma",         title:"Rashid & Salma",              url:"https://rashid-salma.skenllp.com/",                               category:"Nikah",     image:"", featured:true,  addedAt:"2026-10-06" },
  { id:"sabith-nihana",        title:"Sabith & Nihana",             url:"https://sabith-nihana.skenllp.com/",                              category:"Nikah",     image:"", featured:true,  addedAt:"2026-10-05" },
  { id:"salih-rishana",        title:"Salih & Rishana",             url:"https://salih-rishana.skenllp.com/",                              category:"Nikah",     image:"", featured:true,  addedAt:"2026-10-04" },
  { id:"ashfak-afna",          title:"Ashfak & Afna",               url:"https://ashfak-afna.skenllp.com/",                                category:"Nikah",     image:"", featured:false, addedAt:"2026-10-03" },
  { id:"sinan-fida",           title:"Sinan & Fida",                url:"https://sinan-fida.skenllp.com/",                                 category:"Nikah",     image:"", featured:false, addedAt:"2026-10-02" },
  { id:"mubashir-rasin",       title:"Mubashir & Fathima Thanveera",url:"https://mubashir-rasin-fathima-thanveera.vercel.app/",            category:"Nikah",     image:"", featured:false, addedAt:"2026-10-01" },
  { id:"shaheer-shifna",       title:"Shaheer & Shifna + Ameena & Jasir", url:"https://shaheer-shifna-and-ameena-jasir.skenllp.com/",      category:"Nikah",     image:"", featured:false, addedAt:"2026-09-30" },
  { id:"sanoop-fidha-sk",      title:"Sanoop & Fidha",              url:"https://sanoop-fidha.skenllp.com/",                               category:"Nikah",     image:"", featured:false, addedAt:"2026-09-29" },
  { id:"shahabas-nadira",      title:"Shahabas & Nadira",           url:"https://shahabas-nadira.skenllp.com",                             category:"Nikah",     image:"", featured:false, addedAt:"2026-09-28" },
  { id:"shanu-hanna",          title:"Shanu & Hanna",               url:"https://shanu-hanna.skenllp.com/",                                category:"Nikah",     image:"", featured:false, addedAt:"2026-09-27" },
  { id:"salid-nesrin",         title:"Salid & Nesrin",              url:"https://salid-nesrin.skenllp.com/",                               category:"Nikah",     image:"", featured:false, addedAt:"2026-09-26" },
  { id:"afzal-vafa",           title:"Afzal & Vafa",                url:"https://afzal-vafa.skenllp.com",                                  category:"Nikah",     image:"", featured:false, addedAt:"2026-09-25" },
  { id:"azlam-riswana",        title:"Azlam & Riswana",             url:"https://azlam-riswana.skenllp.com/",                              category:"Nikah",     image:"", featured:false, addedAt:"2026-09-24" },
  { id:"afshan-anjum",         title:"Afshan & Anjum",              url:"https://afshan-anjum.skenllp.com",                                category:"Nikah",     image:"", featured:false, addedAt:"2026-09-23" },
  { id:"fahad-hubna",          title:"Fahad & Hubna",               url:"https://fahad-hubna.skenllp.com/",                                category:"Nikah",     image:"", featured:false, addedAt:"2026-09-22" },
  { id:"bilal-nafia",          title:"Bilal & Nafia",               url:"http://bilal-nafia.skenllp.com/",                                 category:"Nikah",     image:"", featured:false, addedAt:"2026-09-21" },
  { id:"thooba-anfal",         title:"Thooba & Anfal",              url:"https://thooba-anfal.skenllp.com/",                               category:"Nikah",     image:"", featured:false, addedAt:"2026-09-20" },
  { id:"askar-sufair",         title:"Askar & Sufair",              url:"https://askar-sufair.skenllp.com/",                               category:"Nikah",     image:"", featured:false, addedAt:"2026-09-19" },
  { id:"hanna-shanu",          title:"Hanna & Shanu",               url:"https://hanna-shanu.skenllp.com/",                                category:"Nikah",     image:"", featured:false, addedAt:"2026-09-18" },
  { id:"sajjadali-ayisha",     title:"Sajjad Ali & Ayisha Siddiqua",url:"https://sajjadali-ayisha.siddiqua.skenllp.com/",                  category:"Nikah",     image:"", featured:false, addedAt:"2026-09-17" },
];

// ─────────────────────────────────────────────────────────────────────────────

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function isNew(addedAt) {
  return Date.now() - new Date(addedAt).getTime() <= THIRTY_DAYS_MS;
}

function waLink(number, text) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

// ── Apply config to DOM ───────────────────────────────────────────────────────

function applyConfig() {
  document.getElementById("studio-name").textContent = SITE.studioName;
  document.getElementById("headline").textContent    = SITE.headline;
  document.getElementById("footer-name").textContent = SITE.studioName;

  const igEl = document.getElementById("footer-ig");
  igEl.href        = SITE.instagramUrl;
  igEl.textContent = SITE.instagramHandle;

  const waEl = document.getElementById("footer-wa");
  waEl.href        = `https://wa.me/${SITE.whatsappNumber}`;
  waEl.textContent = SITE.whatsappDisplay;

  document.getElementById("footer-copy").textContent =
    `© ${new Date().getFullYear()} ${SITE.studioName}. All rights reserved.`;

  document.getElementById("wa-float").href = waLink(
    SITE.whatsappNumber,
    "Hi, I'd like to enquire about a digital wedding invitation."
  );

  document.title = `${SITE.studioName} — Digital Wedding Invitation Samples`;

  // hero CTA + services CTA both go to WhatsApp
  const heroBtn = document.getElementById("hero-wa-btn");
  if (heroBtn) {
    heroBtn.href = waLink(SITE.whatsappNumber,
      "Hi, I'd like to get a custom digital wedding invitation. Can you help?");
  }
  const svcBtn = document.getElementById("services-wa-btn");
  if (svcBtn) {
    svcBtn.href = waLink(SITE.whatsappNumber,
      "Hi, I'd like to get a custom digital wedding invitation. Can you help?");
  }
}

// ── Sort ──────────────────────────────────────────────────────────────────────

function sortSamples(samples) {
  return [...samples].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return  1;
    return new Date(b.addedAt) - new Date(a.addedAt);
  });
}

// ── Build filter chips ────────────────────────────────────────────────────────

function buildChips(categories, selected, onChange) {
  const row = document.getElementById("chips-row");
  row.innerHTML = "";
  ["All", ...categories].forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = cat;
    btn.setAttribute("aria-pressed", String(cat === selected));
    btn.addEventListener("click", () => onChange(cat));
    row.appendChild(btn);
  });
}

// ── SVG dummy designs ─────────────────────────────────────────────────────────

const DESIGNS = {
  Hindu: (name) => {
    const [a, b] = splitName(name);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%">
  <defs><radialGradient id="hbg${uid()}" cx="50%" cy="40%" r="65%"><stop offset="0%" stop-color="#4a1525"/><stop offset="100%" stop-color="#1e0a0e"/></radialGradient></defs>
  <rect width="300" height="400" fill="#2a1018"/>
  <rect x="10" y="10" width="280" height="380" fill="none" stroke="#d2ab62" stroke-width="1" opacity="0.5"/>
  <rect x="18" y="18" width="264" height="364" fill="none" stroke="#d2ab62" stroke-width="0.5" opacity="0.25"/>
  <g transform="translate(38,38)" opacity="0.55"><path d="M0,0 Q-8,-12 0,-18 Q8,-12 0,0Z" fill="#d2ab62"/><path d="M0,0 Q-14,-6 -16,2 Q-8,4 0,0Z" fill="#d2ab62"/><path d="M0,0 Q14,-6 16,2 Q8,4 0,0Z" fill="#d2ab62"/><circle cx="0" cy="0" r="3" fill="#f0c060"/></g>
  <g transform="translate(262,38) scale(-1,1)" opacity="0.55"><path d="M0,0 Q-8,-12 0,-18 Q8,-12 0,0Z" fill="#d2ab62"/><path d="M0,0 Q-14,-6 -16,2 Q-8,4 0,0Z" fill="#d2ab62"/><path d="M0,0 Q14,-6 16,2 Q8,4 0,0Z" fill="#d2ab62"/><circle cx="0" cy="0" r="3" fill="#f0c060"/></g>
  <g transform="translate(150,60)" opacity="0.9"><ellipse cx="0" cy="-14" rx="5" ry="8" fill="#f0c060" opacity="0.85"/><ellipse cx="0" cy="-14" rx="3" ry="5" fill="#fff" opacity="0.4"/><rect x="-1" y="-7" width="2" height="6" fill="#d2ab62"/><path d="M-16,0 Q-14,-10 0,-12 Q14,-10 16,0 Q10,6 0,7 Q-10,6 -16,0Z" fill="#c8963c"/><ellipse cx="0" cy="2" rx="18" ry="4" fill="#a07030" opacity="0.7"/></g>
  <text x="150" y="108" text-anchor="middle" font-size="26" fill="#d2ab62" opacity="0.8" font-family="serif">ॐ</text>
  <line x1="55" y1="120" x2="245" y2="120" stroke="#d2ab62" stroke-width="0.5" opacity="0.45"/><circle cx="150" cy="120" r="3" fill="#d2ab62" opacity="0.5"/>
  <text x="150" y="165" text-anchor="middle" font-size="22" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${a}</text>
  <text x="150" y="188" text-anchor="middle" font-size="13" fill="#d2ab62" font-family="Georgia,serif" letter-spacing="4">&amp;</text>
  <text x="150" y="214" text-anchor="middle" font-size="22" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${b}</text>
  <line x1="55" y1="228" x2="245" y2="228" stroke="#d2ab62" stroke-width="0.5" opacity="0.45"/><circle cx="150" cy="228" r="3" fill="#d2ab62" opacity="0.5"/>
  <text x="150" y="254" text-anchor="middle" font-size="9.5" fill="#b9a58f" font-family="Georgia,serif" letter-spacing="2">WEDDING INVITATION</text>
  <g transform="translate(150,330)" opacity="0.3"><circle cx="0" cy="0" r="32" fill="none" stroke="#d2ab62" stroke-width="0.8"/><circle cx="0" cy="0" r="22" fill="none" stroke="#d2ab62" stroke-width="0.5"/>${spokes(12,22,32,"#d2ab62")}<circle cx="0" cy="0" r="5" fill="#d2ab62" opacity="0.6"/></g>
</svg>`;
  },

  Nikah: (name) => {
    const [a, b] = splitName(name);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%">
  <rect width="300" height="400" fill="#0c1c2a"/>
  <rect x="10" y="10" width="280" height="380" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.55"/>
  <rect x="17" y="17" width="266" height="366" fill="none" stroke="#c9a84c" stroke-width="0.4" opacity="0.25"/>
  <path d="M70,78 L70,38 Q150,2 230,38 L230,78 Q200,54 150,51 Q100,54 70,78Z" fill="none" stroke="#c9a84c" stroke-width="0.8" opacity="0.65"/>
  <g transform="translate(150,50)" opacity="0.85">${star8("#c9a84c")}</g>
  <g transform="translate(28,90)" opacity="0.25">${diamonds(10,"#c9a84c")}</g>
  <g transform="translate(28,298)" opacity="0.25">${diamonds(10,"#c9a84c")}</g>
  <text x="150" y="120" text-anchor="middle" font-size="11" fill="#c9a84c" font-family="Georgia,serif" letter-spacing="3" opacity="0.75">بِسْمِ ٱللَّٰهِ</text>
  <line x1="50" y1="130" x2="250" y2="130" stroke="#c9a84c" stroke-width="0.5" opacity="0.4"/>
  <text x="150" y="172" text-anchor="middle" font-size="22" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${a}</text>
  <text x="150" y="196" text-anchor="middle" font-size="12" fill="#c9a84c" letter-spacing="5" font-family="Georgia,serif">&amp;</text>
  <text x="150" y="224" text-anchor="middle" font-size="22" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${b}</text>
  <line x1="50" y1="238" x2="250" y2="238" stroke="#c9a84c" stroke-width="0.5" opacity="0.4"/>
  <text x="150" y="261" text-anchor="middle" font-size="9.5" fill="#9a8060" font-family="Georgia,serif" letter-spacing="3">NIKAH INVITATION</text>
  <g transform="translate(150,335)" opacity="0.35">${hexRosette("#c9a84c")}</g>
</svg>`;
  },

  Christian: (name) => {
    const [a, b] = splitName(name);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%">
  <rect width="300" height="400" fill="#14142a"/>
  <rect x="12" y="12" width="276" height="376" fill="none" stroke="#c8b882" stroke-width="1" opacity="0.5"/>
  <rect x="20" y="20" width="260" height="360" fill="none" stroke="#c8b882" stroke-width="0.4" opacity="0.25"/>
  ${cornerCurls("#c8b882")}
  <g transform="translate(150,58)" opacity="0.9"><rect x="-2.5" y="-22" width="5" height="44" rx="2" fill="#c8b882"/><rect x="-14" y="-8" width="28" height="5" rx="2" fill="#c8b882"/><rect x="-1.5" y="-21" width="3" height="42" rx="1.5" fill="#fff" opacity="0.2"/></g>
  <g transform="translate(150,96)" opacity="0.45"><path d="M-80,0 Q-60,-8 -40,0 Q-20,8 0,0 Q20,-8 40,0 Q60,8 80,0" fill="none" stroke="#c8b882" stroke-width="0.8"/>${vine4Dots("#c8b882")}</g>
  <text x="150" y="144" text-anchor="middle" font-size="22" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${a}</text>
  <text x="150" y="168" text-anchor="middle" font-size="10" fill="#c8b882" letter-spacing="6" font-family="Georgia,serif">together with</text>
  <text x="150" y="198" text-anchor="middle" font-size="22" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${b}</text>
  <g transform="translate(150,214)" opacity="0.45"><path d="M-80,0 Q-60,8 -40,0 Q-20,-8 0,0 Q20,8 40,0 Q60,-8 80,0" fill="none" stroke="#c8b882" stroke-width="0.8"/>${vine4Dots("#c8b882")}</g>
  <text x="150" y="244" text-anchor="middle" font-size="9.5" fill="#9090a8" letter-spacing="3" font-family="Georgia,serif">REQUEST YOUR PRESENCE</text>
  <text x="150" y="261" text-anchor="middle" font-size="9" fill="#9090a8" letter-spacing="2" font-family="Georgia,serif">AT THEIR WEDDING</text>
  <g transform="translate(150,330)" opacity="0.35">${dotRing(16,26,"#c8b882")}<circle cx="0" cy="0" r="6" fill="none" stroke="#c8b882" stroke-width="1"/><circle cx="0" cy="0" r="2" fill="#c8b882"/></g>
</svg>`;
  },

  Engagement: (name) => {
    const [a, b] = splitName(name);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%">
  <rect width="300" height="400" fill="#130c20"/>
  <ellipse cx="150" cy="0" rx="130" ry="70" fill="#a87fd4" opacity="0.06"/>
  <rect x="12" y="12" width="276" height="376" fill="none" stroke="#c4a0e0" stroke-width="0.8" opacity="0.45"/>
  <g transform="translate(150,64)" opacity="0.88"><path d="M-22,8 Q-22,-4 0,-8 Q22,-4 22,8" fill="none" stroke="#c4a0e0" stroke-width="2.5"/><path d="M-22,8 Q-10,18 0,18 Q10,18 22,8" fill="none" stroke="#c4a0e0" stroke-width="2.5"/><polygon points="0,-30 14,-10 0,4 -14,-10" fill="none" stroke="#c4a0e0" stroke-width="1.2"/><polygon points="0,-30 14,-10 0,-18 -14,-10" fill="#c4a0e0" opacity="0.28"/><polygon points="14,-10 0,4 -14,-10 0,-18" fill="#c4a0e0" opacity="0.14"/></g>
  <line x1="55" y1="116" x2="245" y2="116" stroke="#c4a0e0" stroke-width="0.5" opacity="0.38"/>
  <text x="150" y="111" text-anchor="middle" font-size="8" fill="#c4a0e0" letter-spacing="5" opacity="0.65">ENGAGEMENT</text>
  <text x="150" y="156" text-anchor="middle" font-size="22" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${a}</text>
  <text x="150" y="180" text-anchor="middle" font-size="26" fill="#c4a0e0" font-family="Georgia,serif" opacity="0.75">&amp;</text>
  <text x="150" y="212" text-anchor="middle" font-size="22" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${b}</text>
  <line x1="55" y1="226" x2="245" y2="226" stroke="#c4a0e0" stroke-width="0.5" opacity="0.38"/>
  <text x="150" y="248" text-anchor="middle" font-size="9" fill="#9070b0" letter-spacing="3" font-family="Georgia,serif">ARE GETTING ENGAGED</text>
  <g transform="translate(150,320)" opacity="0.35">${petals(8,22,"#c4a0e0")}<circle cx="0" cy="0" r="7" fill="#130c20"/><circle cx="0" cy="0" r="4" fill="#c4a0e0" opacity="0.8"/></g>
</svg>`;
  },

  Malayalam: (name) => {
    const [a, b] = splitName(name);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%">
  <rect width="300" height="400" fill="#0c160c"/>
  ${leafStripes()}
  <rect x="10" y="10" width="280" height="380" fill="none" stroke="#b8c85a" stroke-width="1" opacity="0.45"/>
  <rect x="17" y="17" width="266" height="366" fill="none" stroke="#b8c85a" stroke-width="0.4" opacity="0.22"/>
  <g transform="translate(150,56)" opacity="0.75"><path d="M0,-40 Q18,0 0,40 Q-18,0 0,-40Z" fill="#3a7c3a" opacity="0.65"/><line x1="0" y1="-40" x2="0" y2="40" stroke="#b8c85a" stroke-width="0.8" opacity="0.55"/>${leafVeins()}<path d="M0,0 Q-28,-12 -40,-5 Q-30,5 0,0Z" fill="#3a7c3a" opacity="0.5"/><path d="M0,0 Q28,-12 40,-5 Q30,5 0,0Z" fill="#3a7c3a" opacity="0.5"/></g>
  <line x1="50" y1="128" x2="250" y2="128" stroke="#b8c85a" stroke-width="0.6" opacity="0.4"/>
  <text x="150" y="123" text-anchor="middle" font-size="8.5" fill="#b8c85a" letter-spacing="4" opacity="0.65">KERALA WEDDING</text>
  <text x="150" y="170" text-anchor="middle" font-size="21" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${a}</text>
  <text x="150" y="194" text-anchor="middle" font-size="14" fill="#b8c85a" font-family="Georgia,serif">&amp;</text>
  <text x="150" y="222" text-anchor="middle" font-size="21" fill="#f4ead8" font-family="Georgia,serif" font-style="italic">${b}</text>
  <line x1="50" y1="236" x2="250" y2="236" stroke="#b8c85a" stroke-width="0.6" opacity="0.4"/>
  <text x="150" y="257" text-anchor="middle" font-size="9.5" fill="#7a9040" letter-spacing="2" font-family="Georgia,serif">WEDDING INVITATION</text>
  <g transform="translate(150,328)" opacity="0.35">${petals(8,26,"#3a7c3a")}<circle cx="0" cy="0" r="14" fill="none" stroke="#b8c85a" stroke-width="0.8"/><circle cx="0" cy="0" r="7" fill="#3a7c3a"/><circle cx="0" cy="0" r="3.5" fill="#b8c85a"/></g>
</svg>`;
  },
};

// ── SVG helper functions ──────────────────────────────────────────────────────

let _uid = 0;
function uid() { return ++_uid; }

function splitName(title) {
  const parts = title.split("&");
  return [parts[0]?.trim() || "", parts[1]?.trim() || ""];
}

function spokes(n, r1, r2, color) {
  return Array.from({length: n}, (_, i) => {
    const a = (i * 360 / n) * Math.PI / 180;
    return `<line x1="${(r1*Math.cos(a)).toFixed(1)}" y1="${(r1*Math.sin(a)).toFixed(1)}" x2="${(r2*Math.cos(a)).toFixed(1)}" y2="${(r2*Math.sin(a)).toFixed(1)}" stroke="${color}" stroke-width="0.8"/>`;
  }).join("");
}

function star8(color) {
  const pts = Array.from({length:16}, (_, i) => {
    const r = i % 2 === 0 ? 22 : 10;
    const a = (i * 22.5 - 90) * Math.PI / 180;
    return `${(r*Math.cos(a)).toFixed(1)},${(r*Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return `<polygon points="${pts}" fill="none" stroke="${color}" stroke-width="1"/><circle cx="0" cy="0" r="5" fill="${color}"/>`;
}

function diamonds(n, color) {
  return Array.from({length: n}, (_, i) =>
    `<rect x="${i*24}" y="0" width="12" height="12" fill="none" stroke="${color}" stroke-width="0.6" transform="rotate(45,${i*24+6},6)"/>`
  ).join("");
}

function hexRosette(color) {
  const petals = Array.from({length:6}, (_, i) => {
    const a = i * 60 * Math.PI / 180;
    return `<circle cx="${(20*Math.cos(a)).toFixed(1)}" cy="${(20*Math.sin(a)).toFixed(1)}" r="8" fill="none" stroke="${color}" stroke-width="0.6"/>`;
  }).join("");
  return `<circle cx="0" cy="0" r="28" fill="none" stroke="${color}" stroke-width="0.6"/>${petals}<circle cx="0" cy="0" r="8" fill="none" stroke="${color}" stroke-width="0.6"/><circle cx="0" cy="0" r="3" fill="${color}"/>`;
}

function cornerCurls(color) {
  return [
    "translate(12,12)", "translate(288,12) scale(-1,1)",
    "translate(12,388) scale(1,-1)", "translate(288,388) scale(-1,-1)"
  ].map(t =>
    `<g transform="${t}" opacity="0.5"><path d="M0,0 Q20,0 20,20" fill="none" stroke="${color}" stroke-width="1.2"/><circle cx="4" cy="4" r="1.5" fill="${color}"/></g>`
  ).join("");
}

function vine4Dots(color) {
  return [-60,-20,20,60].map(x =>
    `<circle cx="${x}" cy="${x % 40 === 0 ? -5 : 5}" r="2.5" fill="${color}"/>`
  ).join("") + `<circle cx="0" cy="0" r="3.5" fill="${color}"/>`;
}

function dotRing(n, r, color) {
  return Array.from({length: n}, (_, i) => {
    const a = i * (360/n) * Math.PI / 180;
    return `<circle cx="${(r*Math.cos(a)).toFixed(1)}" cy="${(r*Math.sin(a)).toFixed(1)}" r="${i%2===0?2:1.2}" fill="${color}"/>`;
  }).join("");
}

function petals(n, r, color) {
  return Array.from({length: n}, (_, i) => {
    const a = i * (360/n) * Math.PI / 180;
    const cx = (r*Math.cos(a)).toFixed(1), cy = (r*Math.sin(a)).toFixed(1);
    return `<ellipse cx="${cx}" cy="${cy}" rx="9" ry="5" fill="${color}" transform="rotate(${i*(360/n)},${cx},${cy})"/>`;
  }).join("");
}

function leafStripes() {
  return Array.from({length:6}, (_, i) =>
    `<line x1="${-20+i*60}" y1="0" x2="${80+i*60}" y2="400" stroke="#2d5c2d" stroke-width="18" opacity="0.1"/>`
  ).join("");
}

function leafVeins() {
  return Array.from({length:6}, (_, i) => {
    const y = -30 + i*12;
    return `<path d="M0,${y} Q12,${y+4} 0,${y+8}" fill="none" stroke="#b8c85a" stroke-width="0.5" opacity="0.45"/><path d="M0,${y} Q-12,${y+4} 0,${y+8}" fill="none" stroke="#b8c85a" stroke-width="0.5" opacity="0.45"/>`;
  }).join("");
}

function getDesign(category, title) {
  const fn = DESIGNS[category] || DESIGNS.Hindu;
  return fn(title);
}

// ── Scroll-reveal ─────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll(".card-wrap")];
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${(idx % 4) * 65}ms`;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.07 });

function observeCards() {
  document.querySelectorAll(".card-wrap:not(.visible)").forEach(el => revealObserver.observe(el));
}

// ── iPhone 16 viewport width used for all iframe renders ─────────────────────
const IPHONE_W = 393; // iPhone 16 / 16 Pro logical width

// ── Build one card ────────────────────────────────────────────────────────────

function buildCard(sample) {
  const waText  = `Hi, I like the ${sample.title} sample and want an invitation like it.`;
  const hasUrl  = !!sample.url;

  const wrap = document.createElement("div");
  wrap.className = "card-wrap";

  // ── card-link (whole card is one clickable link) ──────────────────────────
  const link = document.createElement("a");
  link.className = "card-link";
  link.href   = sample.url || waLink(SITE.whatsappNumber, `Hi, I'd like to see the ${sample.title} invitation.`);
  link.target = "_blank";
  link.rel    = "noopener noreferrer";
  link.setAttribute("aria-label", `View ${sample.title} live invitation`);

  // thumb container
  const thumb = document.createElement("div");
  thumb.className = "card-thumb";

  // SVG design — always present as fallback / loading bg
  const svgWrap = document.createElement("div");
  svgWrap.className = "card-dummy";
  svgWrap.setAttribute("aria-hidden", "true");
  svgWrap.innerHTML = getDesign(sample.category, sample.title);
  thumb.appendChild(svgWrap);

  // New badge
  if (isNew(sample.addedAt)) {
    const badge = document.createElement("span");
    badge.className   = "badge-new";
    badge.textContent = "New";
    thumb.appendChild(badge);
  }

  // real photo (covers SVG if provided)
  if (sample.image) {
    const img   = document.createElement("img");
    img.className = "card-img";
    img.src       = sample.image;
    img.alt       = `${sample.title} invitation thumbnail`;
    img.loading   = "lazy";
    img.onerror   = () => img.remove();
    thumb.appendChild(img);
  }

  // ── Auto-loading iframe preview (only for cards with a live URL) ──────────
  if (hasUrl) {
    const layer = document.createElement("div");
    layer.className = "card-iframe-layer";

    // slim top bar: url label + open-in-tab link
    const bar = document.createElement("div");
    bar.className = "card-iframe-bar";
    bar.addEventListener("click", e => e.stopPropagation()); // bar clicks don't fire card link

    const urlLabel = document.createElement("span");
    urlLabel.className   = "card-iframe-url";
    urlLabel.textContent = sample.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

    const openBtn = document.createElement("a");
    openBtn.className   = "card-iframe-open";
    openBtn.href        = sample.url;
    openBtn.target      = "_blank";
    openBtn.rel         = "noopener noreferrer";
    openBtn.textContent = "Open ↗";
    openBtn.addEventListener("click", e => e.stopPropagation());

    bar.appendChild(urlLabel);
    bar.appendChild(openBtn);
    layer.appendChild(bar);

    // blocked-site fallback panel
    const blocked = document.createElement("div");
    blocked.className = "card-iframe-blocked";
    blocked.innerHTML = `
      <p>This site can't be previewed<br>due to security settings.</p>
      <a href="${sample.url}" target="_blank" rel="noopener noreferrer">Open invitation ↗</a>`;
    layer.appendChild(blocked);

    // ── the iframe itself ──
    const iframe = document.createElement("iframe");
    iframe.className = "card-iframe";
    iframe.src       = sample.url;
    iframe.setAttribute("loading",   "lazy"); // browser defers offscreen iframes
    iframe.setAttribute("sandbox",   "allow-scripts allow-same-origin allow-forms allow-popups");
    iframe.setAttribute("title",     `${sample.title} live preview`);
    iframe.setAttribute("aria-hidden", "true");

    // ── scale iframe from IPHONE_W down to card thumb width ──
    function scaleIframe() {
      const barH    = bar.offsetHeight || 26;
      const thumbW  = thumb.offsetWidth  || 200;
      const thumbH  = thumb.offsetHeight || Math.round(thumbW * 4 / 3);
      const scale   = thumbW / IPHONE_W;
      const iframeH = Math.round((thumbH - barH) / scale);

      iframe.style.width     = `${IPHONE_W}px`;
      iframe.style.height    = `${iframeH}px`;
      iframe.style.transform = `scale(${scale})`;
      // push iframe below the bar
      iframe.style.top = `${barH}px`;
    }

    scaleIframe();

    // re-scale if card resizes (e.g. window resize, orientation change)
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(scaleIframe).observe(thumb);
    } else {
      window.addEventListener("resize", scaleIframe, { passive: true });
    }

    // detect blocked iframes: if load fires but document is empty/inaccessible
    let loaded = false;
    const blockTimer = setTimeout(() => {
      if (!loaded) {
        iframe.style.display = "none";
        blocked.classList.add("show");
        layer.classList.add("loaded"); // still show the layer (with fallback)
      }
    }, 8000);

    iframe.addEventListener("load", () => {
      loaded = true;
      clearTimeout(blockTimer);
      // cross-origin check: if we can read the doc it loaded; if not, assume ok
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc || !doc.body || doc.body.innerHTML.trim() === "") {
          iframe.style.display = "none";
          blocked.classList.add("show");
        }
      } catch {
        // cross-origin = loaded fine, can't inspect — that's expected
      }
      layer.classList.add("loaded"); // fade in
    });

    iframe.addEventListener("error", () => {
      clearTimeout(blockTimer);
      iframe.style.display = "none";
      blocked.classList.add("show");
      layer.classList.add("loaded");
    });

    layer.appendChild(iframe);
    thumb.appendChild(layer);
  }

  link.appendChild(thumb);

  // card text body
  const body    = document.createElement("div");
  body.className = "card-body";
  const titleEl = document.createElement("p");
  titleEl.className   = "card-title";
  titleEl.textContent = sample.title;
  const catEl   = document.createElement("p");
  catEl.className   = "card-cat";
  catEl.textContent = sample.category;
  body.appendChild(titleEl);
  body.appendChild(catEl);
  link.appendChild(body);

  wrap.appendChild(link);

  // WhatsApp sibling link (outside .card-link, no nesting)
  const wa  = document.createElement("a");
  wa.className   = "card-wa";
  wa.href        = waLink(SITE.whatsappNumber, waText);
  wa.target      = "_blank";
  wa.rel         = "noopener noreferrer";
  wa.textContent = "I want this style";
  wa.setAttribute("aria-label", `I want a style like ${sample.title} — open WhatsApp`);
  wa.addEventListener("click", e => e.stopPropagation());
  wrap.appendChild(wa);

  return wrap;
}

// ── Render grid ───────────────────────────────────────────────────────────────

function renderGrid(samples) {
  const grid  = document.getElementById("grid");
  const empty = document.getElementById("empty-state");
  const count = document.getElementById("result-count");

  [...grid.children].forEach(c => { if (c !== empty) c.remove(); });

  if (samples.length === 0) {
    empty.style.display = "block";
    count.textContent   = "0 samples";
  } else {
    empty.style.display = "none";
    count.textContent   = samples.length === 1 ? "1 sample" : `${samples.length} samples`;
    const frag = document.createDocumentFragment();
    samples.forEach(s => frag.appendChild(buildCard(s)));
    grid.insertBefore(frag, empty);
    observeCards();
  }
}

// ── URL state ─────────────────────────────────────────────────────────────────

function readParams() {
  const p = new URLSearchParams(window.location.search);
  return { cat: p.get("cat") || "All", query: p.get("q") || "" };
}

function pushParams(cat, query) {
  const p = new URLSearchParams();
  if (cat && cat !== "All") p.set("cat", cat);
  if (query) p.set("q", query);
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

// ── Filter ────────────────────────────────────────────────────────────────────

function filterSamples(samples, cat, query) {
  const lq = query.toLowerCase();
  return samples.filter(s => {
    const matchCat = cat === "All" || s.category === cat;
    const matchQ   = !lq || s.title.toLowerCase().includes(lq);
    return matchCat && matchQ;
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  applyConfig();

  const sorted     = sortSamples(SAMPLES);
  const categories = [...new Set(sorted.map(s => s.category))];

  let { cat, query } = readParams();

  const searchInput = document.getElementById("search-input");
  const searchClear = document.getElementById("search-clear");

  searchInput.value = query;
  searchClear.classList.toggle("hidden", !query);

  buildChips(categories, cat, onCatChange);
  renderGrid(filterSamples(sorted, cat, query));

  function onCatChange(newCat) {
    cat = newCat;
    pushParams(cat, query);
    buildChips(categories, cat, onCatChange);
    renderGrid(filterSamples(sorted, cat, query));
  }

  searchInput.addEventListener("input", () => {
    query = searchInput.value;
    searchClear.classList.toggle("hidden", !query);
    pushParams(cat, query);
    renderGrid(filterSamples(sorted, cat, query));
  });

  searchClear.addEventListener("click", () => {
    query = "";
    searchInput.value = "";
    searchClear.classList.add("hidden");
    pushParams(cat, query);
    renderGrid(filterSamples(sorted, cat, query));
    searchInput.focus();
  });

  window.addEventListener("popstate", () => {
    ({ cat, query } = readParams());
    searchInput.value = query;
    searchClear.classList.toggle("hidden", !query);
    buildChips(categories, cat, onCatChange);
    renderGrid(filterSamples(sorted, cat, query));
  });
}

init();
