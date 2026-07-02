/* IT Razlaf – Interaktionen */
(function () {
  "use strict";

  /* ---------- Sticky Nav ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile Menü ---------- */
  const burger = document.getElementById("navBurger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    // Menü schließen, wenn ein Link geklickt wird
    document.querySelectorAll("#navLinks a").forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Scroll-Reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Zähler-Animation ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count));
  }

  /* ---------- Kontaktformular (Versand über kontakt.php, mailto als Fallback) ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    const statusEl = document.getElementById("formStatus");
    const submitBtn = document.getElementById("formSubmitBtn");

    const mailtoFallback = (data) => {
      const subject = "Anfrage über it-razlaf.de – " + (data.get("name") || "");
      const body = [
        "Name: " + (data.get("name") || ""),
        "E-Mail: " + (data.get("email") || ""),
        "Telefon: " + (data.get("phone") || "–"),
        "",
        "Anliegen:",
        data.get("message") || "",
      ].join("\n");
      window.location.href =
        "mailto:info@it-razlaf.de?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (data.get("_honey")) return; // Spam-Schutz

      submitBtn.disabled = true;
      statusEl.textContent = "Nachricht wird gesendet …";
      statusEl.className = "form__status";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Versand fehlgeschlagen");
        form.reset();
        statusEl.textContent = "Vielen Dank! Ihre Nachricht ist bei uns eingegangen – wir melden uns schnellstmöglich.";
        statusEl.classList.add("form__status--ok");
      } catch (err) {
        // Fallback: E-Mail-Programm des Besuchers öffnen
        statusEl.textContent = "Der Direktversand hat nicht geklappt – Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Nachricht.";
        statusEl.classList.add("form__status--error");
        mailtoFallback(data);
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------- Jahr im Footer ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
