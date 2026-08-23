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