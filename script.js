/* Personal website script.
   Plain JavaScript, no modules, works when index.html is opened directly. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Mobile menu ----------
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });

    // Close after choosing a link
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    // Close with the Escape key and return focus to the button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    // Reset when resizing up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) closeMenu();
    });
  }

  // ---------- Header border on scroll ----------
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Move focus to the section after an in-page link ----------
  // (Helps keyboard and screen-reader users land where they jumped.)
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });

  // ---------- Scroll reveal + active nav link ----------
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  var navLinks = document.querySelectorAll(".nav__menu a");
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (a) {
        if (a.getAttribute("href") === "#" + entry.target.id) {
          a.setAttribute("aria-current", "true");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll("main section[id]").forEach(function (s) {
    sectionObserver.observe(s);
  });
})();

/* ---------- ASCII portrait shimmer ----------
   Every few frames, a handful of characters flicker to a neighbouring
   character of similar density, then settle back. Skipped for visitors
   who prefer reduced motion. */
(function () {
  "use strict";
  var pre = document.getElementById("ascii");
  if (!pre) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var ramp = " .-:/+=<>!?3I25468A0ON";
  var original = pre.textContent;
  var chars = original.split("");
  var spots = [];
  for (var i = 0; i < chars.length; i++) {
    if (chars[i] !== " " && chars[i] !== "\n") spots.push(i);
  }
  if (!spots.length) return;

  // Reveal: characters type in from top to bottom on load
  var revealed = 0;
  var step = Math.ceil(chars.length / 40);
  function reveal() {
    revealed = Math.min(chars.length, revealed + step);
    pre.textContent = original.slice(0, revealed);
    if (revealed < chars.length) requestAnimationFrame(reveal);
    else setInterval(shimmer, 90);
  }

  function shimmer() {
    var frame = chars.slice();
    for (var n = 0; n < 60; n++) {
      var idx = spots[(Math.random() * spots.length) | 0];
      var r = ramp.indexOf(frame[idx]);
      if (r < 1) continue;
      var shift = Math.random() < 0.5 ? -1 : 1;
      var next = Math.max(1, Math.min(ramp.length - 1, r + shift));
      frame[idx] = ramp[next];
    }
    pre.textContent = frame.join("");
  }

  reveal();
})();
