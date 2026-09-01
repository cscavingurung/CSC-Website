document.addEventListener("DOMContentLoaded", function () {
  /* MOBILE NAVIGATION */

  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var navScrim = document.getElementById("navScrim");

  if (navToggle && mobileNav && navScrim) {

    function openMenu() {
      mobileNav.classList.add("is-open");
      navScrim.classList.add("is-open");
      navToggle.classList.add("is-open");

      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");

      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      mobileNav.classList.remove("is-open");
      navScrim.classList.remove("is-open");
      navToggle.classList.remove("is-open");

      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");

      document.body.classList.remove("menu-open");
    }

    navToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (mobileNav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navScrim.addEventListener("click", closeMenu);

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        mobileNav.classList.contains("is-open")
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (
        window.innerWidth > 900 &&
        mobileNav.classList.contains("is-open")
      ) {
        closeMenu();
      }
    });
  }


  /* SCROLL REVEAL */

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px"
        }
      );

      revealElements.forEach(function (element) {
        observer.observe(element);
      });
    }
  }


  /* BOOKING MODAL */

  var bookOverlay = document.getElementById("bookOverlay");
  var bookIframe = document.getElementById("bookIframe");
  var bookClose = document.getElementById("bookClose");

  if (bookOverlay && bookIframe && bookClose) {

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest('a[href="#book"]');

      if (!trigger) return;

      event.preventDefault();

      bookIframe.src = "booking-modal.html";
      bookOverlay.classList.add("open");

      requestAnimationFrame(function () {
        bookOverlay.classList.add("visible");
      });
    });

    function closeBooking() {
      bookOverlay.classList.remove("visible");

      setTimeout(function () {
        bookOverlay.classList.remove("open");
        bookIframe.src = "";
      }, 250);
    }

    bookClose.addEventListener("click", closeBooking);

    bookOverlay.addEventListener("click", function (event) {
      if (event.target === bookOverlay) {
        closeBooking();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeBooking();
      }
    });
  }
});

/* SERVICES SHOWCASE TABS */
(function () {
  var list = document.getElementById("showcaseList");
  var imgA = document.getElementById("showcaseImgA");
  var caption = document.getElementById("showcaseCaption");
  if (!list || !imgA || !caption) return;

  var data = [
    {
      a: "https://images.unsplash.com/photo-1514464750060-00e6e34c8b8c?q=80&w=900&auto=format&fit=crop",
      caption: "Express Entry, PNP, and CEC pathways from within Canada — profile scoring, document prep, and CRS improvement plans."
    },
    {
      a: "https://images.unsplash.com/photo-1503365194569-df4e1d04cec1?q=80&w=900&auto=format&fit=crop",
      caption: "Study permit extensions and the pathway from PGWP toward permanent residence."
    },
    {
      a: "https://images.unsplash.com/photo-1768055105012-4c53791b2877?q=80&w=900&auto=format&fit=crop",
      caption: "LMIA-backed and open work permit renewals, including post-graduation work permit (PGWP) planning."
    },
    {
      a: "https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?q=80&w=900&auto=format&fit=crop",
      caption: "Visiting family or exploring Canada — visitor visa applications and extensions handled from Nepal or from within Canada."
    },
    {
      a: "https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=900&auto=format&fit=crop",
      caption: "Citizenship applications for permanent residents who've met their residency requirement — filed and tracked end to end."
    },
    {
      a: "https://images.unsplash.com/photo-1514464750060-00e6e34c8b8c?q=80&w=900&auto=format&fit=crop",
      caption: "PR card expiring or already expired? Renewals and replacements filed directly with IRCC."
    }
  ];

  function setActive(index) {
    var items = list.querySelectorAll(".showcase-item");
    items.forEach(function (el) {
      el.classList.remove("is-active");
    });
    items[index].classList.add("is-active");

    var d = data[index];
    imgA.style.opacity = 0;
    caption.style.opacity = 0;
    setTimeout(function () {
      imgA.src = d.a;
      caption.textContent = d.caption;
      imgA.style.opacity = 1;
      caption.style.opacity = 1;
    }, 150);
  }

  list.addEventListener("click", function (e) {
    var btn = e.target.closest(".showcase-item");
    if (!btn) return;
    setActive(parseInt(btn.dataset.index, 10));
  });
})();

/* VERTICAL TESTIMONIAL MARQUEE */
(function () {
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var rows = [
    {
      row: document.querySelector(".marquee-left"),
      track: document.getElementById("marqueeTrackLeft"),
      dir: -1 // Moves up
    },
    {
      row: document.querySelector(".marquee-right"),
      track: document.getElementById("marqueeTrackRight"),
      dir: 1  // Moves down (if present)
    }
  ];

  var STAGGER = 120; // Offsets vertical positions between tracks

  rows.forEach(function (r) {
    if (!r.track) return;
    r.loopHeight = r.track.scrollHeight / 2; // Swapped to scrollHeight
    r.pos = r.dir === -1 ? 0 : -r.loopHeight + STAGGER;
    r.speedFactor = 1;
    r.targetFactor = 1;
    r.baseSpeed = r.loopHeight / (46 * 60); // Speed calibrated to vertical size

    r.row.addEventListener("mouseenter", function () {
      r.targetFactor = 0.18;
    });
    r.row.addEventListener("mouseleave", function () {
      r.targetFactor = 1;
    });
    r.row.addEventListener(
      "touchstart",
      function () {
        r.targetFactor = 0.18;
      },
      { passive: true }
    );
    r.row.addEventListener(
      "touchend",
      function () {
        r.targetFactor = 1;
      },
      { passive: true }
    );
  });

  function recalc() {
    rows.forEach(function (r) {
      if (!r.track) return;
      r.loopHeight = r.track.scrollHeight / 2; // Recalculate heights on resize
      r.baseSpeed = r.loopHeight / (46 * 60);
    });
  }
  window.addEventListener("resize", recalc);

  function tick() {
    rows.forEach(function (r) {
      if (!r.track || !r.loopHeight) return;
      r.speedFactor += (r.targetFactor - r.speedFactor) * 0.06;
      r.pos += r.dir * r.baseSpeed * r.speedFactor;

      if (r.dir === -1 && r.pos <= -r.loopHeight) r.pos += r.loopHeight;
      if (r.dir === 1 && r.pos >= 0) r.pos -= r.loopHeight;

      // Swapped from translateX to translateY
      r.track.style.transform = "translateY(" + r.pos + "px)";
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();




/* CONTACT FORM — EMAILJS WITH DUAL-REGION PHONE & STRICT EMAIL VALIDATION */
(function () {
  var form = document.getElementById("contactForm");
  if (!form) return;

  var phoneInput = document.getElementById("cfPhone");
  var emailInput = document.getElementById("cfEmail");

  // --- Real-time Phone Formatting Middleware ---
  phoneInput.addEventListener("input", function (e) {
    var raw = e.target.value;
    var digits = raw.replace(/\D/g, ""); 
    
    if (raw.trim().startsWith("+977") || digits.startsWith("977") || (digits.startsWith("9") && !digits.startsWith("1"))) {
      if (digits.startsWith("977")) {
        digits = digits.substring(3);
      }
      digits = digits.substring(0, 10);
      e.target.value = digits.length > 0 ? "+977 " + digits : "";
      return;
    }

    if (digits.startsWith("1")) {
      digits = digits.substring(1);
    }
    digits = digits.substring(0, 10);

    if (digits.length === 0) {
      e.target.value = "";
    } else if (digits.length <= 3) {
      e.target.value = "+1 (" + digits;
    } else if (digits.length <= 6) {
      e.target.value = "+1 (" + digits.slice(0, 3) + ") " + digits.slice(3);
    } else {
      e.target.value = "+1 (" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
    }
  });

  // --- Strict Validation Matchers ---
  function isPhoneValid(value) {
    var clean = value.replace(/\s+/g, ""); 
    var canadaRegex = /^\+1\([2-9]\d{2}\)\d{3}-\d{4}$/;
    var nepalRegex = /^\+977(98|97)\d{8}$/;
    return canadaRegex.test(clean) || nepalRegex.test(clean);
  }

  function isEmailStrictlyValid(value) {
    // This regex explicitly mandates a dot and limits the domain extension to 2-6 letters maximum.
    // The "$" at the end means NOTHING can be typed after the extension (kills trailing junk like .com121212)
      var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,4})?$/;
    return emailRegex.test(value.trim());
  }

  // --- Initialize EmailJS ---
  emailjs.init({ publicKey: "XH5h0hcPAU5Rj5oWz" });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Core Browser Checks (Required fields, basic types)
    if (!form.checkValidity()) {
      return;
    }

    // 2. Strict Email Verification
    if (!isEmailStrictlyValid(emailInput.value)) {
      alert("Please enter a valid email address.\nExample: you@email.com (Do not include trailing numbers or text)");
      emailInput.focus();
      return;
    }

    // 3. Strict Phone Validation 
    if (!isPhoneValid(phoneInput.value)) {
      alert("Please enter a valid phone number format.\nCanada: +1 (555) 555-5555\nNepal: +977 98XXXXXXXX");
      phoneInput.focus();
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending...";

    emailjs.sendForm("service_w4c8767", "template_ke7lfdl", form)
      .then(function () {
        btn.textContent = "Message sent — we'll reply within 24 hours";
        form.reset(); 
      })
      .catch(function (err) {
        console.error(err);
        btn.disabled = false;
        btn.textContent = originalText;
        alert("Something went wrong — please try WhatsApp instead.");
      });
  });
})();


/* PARTNER MARQUEE */
(function () {
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var rows = [
    {
      row: document.querySelector(".partner-marquee-left"),
      track: document.getElementById("partnerTrackLeft"),
      dir: -1
    },
    {
      row: document.querySelector(".partner-marquee-right"),
      track: document.getElementById("partnerTrackRight"),
      dir: 1
    }
  ];

  var STAGGER = 112; // Adjusted offset relative to partner card width + gap

  rows.forEach(function (r) {
    if (!r.track || !r.row) return;
    r.loopWidth = r.track.scrollWidth / 2;
    r.pos = r.dir === -1 ? 0 : -r.loopWidth + STAGGER;
    r.speedFactor = 1;
    r.targetFactor = 1;
    r.baseSpeed = r.loopWidth / (46 * 60);

    r.row.addEventListener("mouseenter", function () {
      r.targetFactor = 0.18;
    });
    r.row.addEventListener("mouseleave", function () {
      r.targetFactor = 1;
    });
    r.row.addEventListener(
      "touchstart",
      function () {
        r.targetFactor = 0.18;
      },
      { passive: true }
    );
    r.row.addEventListener(
      "touchend",
      function () {
        r.targetFactor = 1;
      },
      { passive: true }
    );
  });

  function recalc() {
    rows.forEach(function (r) {
      if (!r.track) return;
      r.loopWidth = r.track.scrollWidth / 2;
      r.baseSpeed = r.loopWidth / (46 * 60);
    });
  }
  window.addEventListener("resize", recalc);

  function tick() {
    rows.forEach(function (r) {
      if (!r.track || !r.loopWidth) return;
      r.speedFactor += (r.targetFactor - r.speedFactor) * 0.06;
      r.pos += r.dir * r.baseSpeed * r.speedFactor;

      if (r.dir === -1 && r.pos <= -r.loopWidth) r.pos += r.loopWidth;
      if (r.dir === 1 && r.pos >= 0) r.pos -= r.loopWidth;

      r.track.style.transform = "translateX(" + r.pos + "px)";
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();



/* STAT COUNTERS */
(function () {
  var counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10) || 0;
    var suffix = el.dataset.suffix || "";
    var duration = 1400; // ms
    var start = null;

    if (reduceMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // ease-out for a natural deceleration
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);

      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach(function (el) {
    observer.observe(el);
  });
})();




/* BACK TO TOP */
(function () {
  var btn = document.getElementById("backToTop");
  if (!btn) return;

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ticking = false;

  function toggleVisibility() {
    if (window.scrollY > 480) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(toggleVisibility);
      ticking = true;
    }
  });

  toggleVisibility(); // in case the page loads already scrolled

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });
})();

