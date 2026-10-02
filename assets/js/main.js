/* Arena of Valor — rebuild · interactions
 * Mirrors the functional blocks of the official site:
 * nav dropdowns, video modal, news carousel, heroes carousel,
 * hero roster filter + detail modal, news category tabs.
 */
(function () {
  "use strict";

  /* ---------- mobile nav ---------- */
  var burger = document.querySelector(".nav-burger");
  var links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      var drop = e.target.closest(".has-drop > a");
      if (drop && window.innerWidth <= 920) {
        e.preventDefault();
        drop.parentElement.classList.toggle("open");
      }
    });
  }

  /* ---------- video modal ---------- */
  var videoModal = document.getElementById("video-modal");
  document.querySelectorAll("[data-video]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(videoModal);
      var frame = videoModal.querySelector("iframe");
      if (frame && !frame.src) frame.src = frame.dataset.src;
    });
  });

  /* ---------- generic modal helpers ---------- */
  function openModal(root) {
    if (!root) return;
    root.classList.add("open");
    document.body.style.overflow = "hidden";
    var close = root.querySelector(".modal-close");
    if (close) close.focus();
  }
  function closeModal(root) {
    if (!root) return;
    root.classList.remove("open");
    document.body.style.overflow = "";
    if (root.id === "video-modal") {
      var frame = root.querySelector("iframe");
      if (frame) frame.src = ""; /* stop playback */
    }
  }
  document.querySelectorAll(".modal-root").forEach(function (root) {
    root.addEventListener("click", function (e) {
      if (e.target.closest(".modal-close") || e.target.classList.contains("modal-mask")) closeModal(root);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.querySelectorAll(".modal-root.open").forEach(closeModal);
  });

  /* ---------- carousel (banners + hero strip) ---------- */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".banner-track, .heroes-strip");
    if (!track) return;
    var step = Math.max(track.clientWidth * 0.6, 260);
    root.querySelectorAll("[data-prev]").forEach(function (b) {
      b.addEventListener("click", function () { track.scrollBy({ left: -step, behavior: "smooth" }); });
    });
    root.querySelectorAll("[data-next]").forEach(function (b) {
      b.addEventListener("click", function () { track.scrollBy({ left: step, behavior: "smooth" }); });
    });
    if (root.hasAttribute("data-auto")) {
      var timer = setInterval(function () {
        if (document.hidden) return;
        var max = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: "smooth" });
        else track.scrollBy({ left: step, behavior: "smooth" });
      }, 4500);
      root.addEventListener("pointerenter", function () { clearInterval(timer); });
    }
  });

  /* ---------- hero roster (heroes.html) ---------- */
  var grid = document.getElementById("hero-grid");
  if (grid && window.AOV_HEROES) {
    var tabs = document.getElementById("role-tabs");
    var count = document.getElementById("heroes-count");
    var ROLES = ["All", "Tank", "Warrior", "Assassin", "Mage", "Marksman", "Support"];

    ROLES.forEach(function (role) {
      var b = document.createElement("button");
      b.className = "tab";
      b.type = "button";
      b.textContent = role;
      b.setAttribute("aria-pressed", role === "All" ? "true" : "false");
      b.addEventListener("click", function () {
        tabs.querySelectorAll(".tab").forEach(function (t) { t.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        render(role);
      });
      tabs.appendChild(b);
    });

    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

    function render(role) {
      var list = window.AOV_HEROES.filter(function (h) { return role === "All" || h.role === role; });
      grid.innerHTML = list.map(function (h) {
        return '<button class="hero-card" type="button" data-id="' + h.id + '" aria-label="' + esc(h.name) + ', ' + h.role + '">' +
          '<img class="thumb" loading="lazy" src="assets/img/heroes/' + h.id + '.jpg" alt="' + esc(h.name) + ' portrait">' +
          '<img class="big" loading="lazy" src="assets/img/heroes/' + h.id + '_card.png" alt="">' +
          '<span class="meta"><span class="name">' + esc(h.name) + '</span><span class="role-tag">' + h.role + '</span></span>' +
          "</button>";
      }).join("");
      if (count) count.textContent = String(list.length).padStart(2, "0") + " / " + window.AOV_HEROES.length + " HEROES";
    }

    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".hero-card");
      if (!card) return;
      var h = window.AOV_HEROES.find(function (x) { return x.id === Number(card.dataset.id); });
      if (!h) return;
      var featured = ["112", "114", "135", "184", "501"].indexOf(String(h.id)) > -1;
      var art = featured ? "assets/img/heroes/" + h.id + "_featured.png" : "assets/img/heroes/" + h.id + "_card.png";
      document.getElementById("detail-art").src = art;
      document.getElementById("detail-art").alt = h.name + " official art";
      document.getElementById("detail-name").textContent = h.name;
      document.getElementById("detail-role").textContent = h.role + " · ID " + h.id;
      openModal(document.getElementById("detail-modal"));
    });

    render("All");
  }

  /* ---------- news tabs (news.html) ---------- */
  var newsTabs = document.getElementById("news-tabs");
  if (newsTabs) {
    newsTabs.addEventListener("click", function (e) {
      var tab = e.target.closest(".tab");
      if (!tab) return;
      newsTabs.querySelectorAll(".tab").forEach(function (t) { t.setAttribute("aria-pressed", "false"); });
      tab.setAttribute("aria-pressed", "true");
      var cat = tab.dataset.cat;
      document.querySelectorAll("[data-article]").forEach(function (card) {
        var show = cat === "all" || card.dataset.article === cat;
        card.style.display = show ? "" : "none";
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
