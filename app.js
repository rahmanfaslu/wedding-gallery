const $ = s => document.querySelector(s), grid = $("#grid");
const wa = t => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
document.querySelectorAll("[data-wa]").forEach(a => { a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });

/* hero fan: 5 phones, rotations/offsets by position (commented out)
const R = [[-12,34,0],[-6,14,.6],[0,0,1.2],[6,14,.3],[12,34,.9]];
if ($("#fan")) {
  $("#fan").innerHTML = SAMPLES.filter(s => s.hero).sort((a,b) => a.hero - b.hero).slice(0,5).map((s,i) =>
    `<div class="phone" style="--r:${R[i][0]}deg;--y:${R[i][1]}px;--d:${R[i][2]}s"><div class="screen"><img src="${s.img}" alt="${s.bride} & ${s.groom}"></div></div>`).join("");
}
*/

/* features */
$("#fgrid").innerHTML = FEATURES.map(f => `<div class="f"><span>${f[0]}</span><b>${f[1]}</b><p>${f[2]}</p></div>`).join("");

/* gallery */
let cat = "All";
$("#tabs").innerHTML = ["All", ...new Set(SAMPLES.map(s => s.cat))].map(c => `<button class="tab${c==="All"?" on":""}" data-c="${c}">${c}</button>`).join("");
$("#tabs").onclick = e => { const b = e.target.closest(".tab"); if (!b) return; cat = b.dataset.c; document.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t === b)); render(); };
$("#q").oninput = render;

/* load the live invitation inside the phone, scaled like a 390px-wide phone */
function fit(screen) {
  const f = screen.querySelector("iframe"); if (!f) return;
  const k = screen.clientWidth / 390;
  f.style.width = "390px"; f.style.height = screen.clientHeight / k + "px"; f.style.transform = `scale(${k})`;
}
function goLive(btn) {
  const screen = btn.closest(".screen");
  const f = document.createElement("iframe");
  f.title = "Live invitation preview"; f.allow = "autoplay"; f.src = screen.dataset.url;
  screen.append(f); fit(screen);
  const openLink = document.createElement("a");
  openLink.className = "open";
  openLink.href = screen.dataset.url;
  openLink.target = "_blank";
  openLink.rel = "noopener";
  openLink.textContent = "Show in new tab ↗";
  btn.replaceWith(openLink);
}
addEventListener("resize", () => document.querySelectorAll(".screen").forEach(fit));
const mq = matchMedia("(max-width:820px)");
const newTab = s => (s.mode || MODE) === "newtab" || ((s.mode || MODE) === "auto" && mq.matches);
mq.addEventListener("change", () => render());
grid.onclick = e => {
  const b = e.target.closest(".live"); if (!b) return;
  const url = b.closest(".screen").dataset.url;
  newTab({mode: b.dataset.mode}) ? window.open(url, "_blank", "noopener") : goLive(b);
};

function render() {
  const q = $("#q").value.trim().toLowerCase();
  const list = SAMPLES.filter(s => (cat === "All" || s.cat === cat) && (s.bride + s.groom).toLowerCase().includes(q));
  grid.innerHTML = list.length ? list.map((s, i) => `
  <article class="card" style="animation-delay:${Math.min(i,8)*70}ms">
    <div class="phone"><div class="screen" data-url="${s.url}" ${!s.img && s.url ? 'data-auto="1"' : ""}>
      ${s.img ? `<img src="${s.img}" alt="${s.groom} &amp; ${s.bride}" loading="lazy">` : `<div class="fb"><small>${s.cat}</small><b>${s.bride}</b><span>&amp;</span><b>${s.groom}</b></div>`}
      ${s.url ? (newTab(s)
        ? `<a class="open" href="${s.url}" target="_blank" rel="noopener">Show in new tab ↗</a>`
        : (s.img
          ? `<button class="live" data-mode="embed">Live preview</button>`
          : `<a class="open" href="${s.url}" target="_blank" rel="noopener">Show in new tab ↗</a>`)) : ""}
    </div></div>
    <div class="meta">
      <div><div class="names">${s.bride} <span>&amp;</span> ${s.groom}</div><div class="cat">${s.cat}</div></div>
      <!-- <div class="price">₹${s.price.toLocaleString("en-IN")}</div> -->
    </div>
    <a class="wa" target="_blank" rel="noopener" href="${wa(`Hi! I like the ${s.bride} & ${s.groom} (${s.cat}) invitation. I'd like something similar.`)}">💬 Order on WhatsApp</a>
  </article>`).join("") : `<div class="empty">No samples match. Try another category or name.</div>`;
  observeAuto();
}
/* no poster image? load the site itself into the phone when it scrolls into view */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; io.unobserve(e.target);
  const sc = e.target, f = document.createElement("iframe");
  f.title = "Live invitation preview"; f.loading = "lazy"; f.src = sc.dataset.url;
  if (mq.matches) f.style.pointerEvents = "none";   /* mobile: tap opens new tab instead of trapping scroll */
  sc.append(f); fit(sc);
}), {rootMargin: "250px"});
function observeAuto(){ grid.querySelectorAll(".screen[data-auto]").forEach(el => io.observe(el)); }
addEventListener("scroll", () => $(".nav").classList.toggle("s", scrollY > 10), {passive:true});
render();
