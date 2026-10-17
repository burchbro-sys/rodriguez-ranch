/* =========================================================
   RODRIGUEZ RANCH
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     BASIC SETTINGS
  ======================================================= */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================================
     AUTOMATIC COPYRIGHT YEAR
  ======================================================= */

  const copyright = document.querySelector(".copyright");

  if (copyright) {
    const currentYear = new Date().getFullYear();

    copyright.innerHTML =
      `&copy; ${currentYear} Rodriguez Ranch. Concept project. All Rights Reserved.`;
  }


  /* =======================================================
     SMOOTH SECTION SCROLLING
  ======================================================= */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const targetSection =
        document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      event.preventDefault();

      const header =
        document.querySelector("header");

      const headerHeight =
        header ?
        header.offsetHeight :
        0;

      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior:
          prefersReducedMotion ?
          "auto" :
          "smooth"
      });

    });

  });


  /* =======================================================
     ACTIVE NAVIGATION LINK
  ======================================================= */

  const navLinks =
    document.querySelectorAll("nav a[href^='#']");

  const sections = [];

  navLinks.forEach((link) => {

    const target =
      document.querySelector(
        link.getAttribute("href")
      );

    if (target) {
      sections.push({
        section: target,
        link: link
      });
    }

  });


  function updateActiveNavigation() {

    const scrollPosition =
      window.scrollY + 180;

    let currentSection = null;

    sections.forEach((item) => {

      if (
        scrollPosition >= item.section.offsetTop
      ) {
        currentSection = item;
      }

    });


    navLinks.forEach((link) => {

      link.style.color = "";

      link.style.setProperty(
        "--active-width",
        "0%"
      );

    });


    if (currentSection) {

      currentSection.link.style.color =
        "var(--brass)";

    }

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation
  );

  updateActiveNavigation();


  /* =======================================================
     SCROLL REVEAL ANIMATIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(`
    #story > *,
    .section-heading,
    .business-card,
    .vet-visual,
    .vet-content,
    .portal-intro,
    .portal-demo,
    .rescue-content,
    .rescue-quote,
    .values-grid article,
    .future-heading,
    .timeline article,
    #contact > *
  `);


  if (!prefersReducedMotion) {

    revealElements.forEach((element) => {

      element.style.opacity = "0";

      element.style.transform =
        "translateY(35px)";

    });


    const revealObserver =
      new IntersectionObserver(

        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            const element =
              entry.target;


            let delay = 0;


            if (
              element.classList.contains(
                "business-card"
              )
            ) {

              const cards =
                Array.from(
                  document.querySelectorAll(
                    ".business-card"
                  )
                );

              const index =
                cards.indexOf(element);

              delay =
                (index % 3) * 100;

            }


            if (
              element.matches(
                ".values-grid article"
              )
            ) {

              const cards =
                Array.from(
                  document.querySelectorAll(
                    ".values-grid article"
                  )
                );

              const index =
                cards.indexOf(element);

              delay =
                index * 90;

            }


            element.animate(

              [
                {
                  opacity: 0,
                  transform:
                    "translateY(35px)"
                },

                {
                  opacity: 1,
                  transform:
                    "translateY(0)"
                }
              ],

              {
                duration: 700,
                delay: delay,
                easing:
                  "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards"
              }

            );


            observer.unobserve(element);

          });

        },

        {
          threshold: 0.15,
          rootMargin:
            "0px 0px -50px 0px"
        }

      );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const header =
    document.querySelector("header");


  function updateHeader() {

    if (!header) {
      return;
    }


    if (window.scrollY > 60) {

      header.style.boxShadow =
        "0 8px 30px rgba(9, 29, 24, 0.12)";

      header.style.backgroundColor =
        "rgba(251, 248, 241, 0.985)";

    }

    else {

      header.style.boxShadow =
        "";

      header.style.backgroundColor =
        "";

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader
  );

  updateHeader();


  /* =======================================================
     HERO PARALLAX EFFECT
  ======================================================= */

  const hero =
    document.querySelector("#hero");


  function updateHeroParallax() {

    if (
      !hero ||
      prefersReducedMotion ||
      window.innerWidth < 850
    ) {
      return;
    }


    const scrollAmount =
      window.scrollY;


    if (
      scrollAmount >
      hero.offsetHeight
    ) {
      return;
    }


    const movement =
      scrollAmount * 0.12;


    hero.style.backgroundPosition =
      `center calc(50% + ${movement}px)`;

  }


  window.addEventListener(
    "scroll",
    updateHeroParallax
  );


  /* =======================================================
     PORTAL WINDOW INTERACTION
  ======================================================= */

  const portalWindow =
    document.querySelector(
      ".portal-window"
    );


  if (
    portalWindow &&
    !prefersReducedMotion
  ) {

    portalWindow.addEventListener(
      "mousemove",
      (event) => {

        if (
          window.innerWidth < 850
        ) {
          return;
        }


        const rect =
          portalWindow.getBoundingClientRect();


        const mouseX =
          event.clientX -
          rect.left;


        const mouseY =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;


        const centerY =
          rect.height / 2;


        const rotateY =
          (
            mouseX -
            centerX
          ) / 45;


        const rotateX =
          -(
            mouseY -
            centerY
          ) / 55;


        portalWindow.style.transform =
          `
          perspective(1400px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
          `;

      }
    );


    portalWindow.addEventListener(
      "mouseleave",
      () => {

        portalWindow.style.transform =
          "";

      }
    );

  }


  /* =======================================================
     BUSINESS CARD MICROINTERACTIONS
  ======================================================= */

  const businessCards =
    document.querySelectorAll(
      ".business-card"
    );


  businessCards.forEach((card) => {

    card.addEventListener(
      "mouseenter",
      () => {

        if (prefersReducedMotion) {
          return;
        }


        const number =
          card.querySelector(
            ".business-number"
          );


        if (number) {

          number.animate(

            [
              {
                transform:
                  "translateY(0)",
                opacity: 1
              },

              {
                transform:
                  "translateY(-8px)",
                opacity: 0.75
              },

              {
                transform:
                  "translateY(0)",
                opacity: 1
              }
            ],

            {
              duration: 350,
              easing: "ease-out"
            }

          );

        }

      }
    );

  });


  /* =======================================================
     TIMELINE HIGHLIGHTING
  ======================================================= */

  const timelineItems =
    document.querySelectorAll(
      ".timeline article"
    );


  if (
    timelineItems.length &&
    !prefersReducedMotion
  ) {

    const timelineObserver =
      new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.style.opacity =
                "1";


              entry.target.style.transform =
                "translateX(0)";

            }

          });

        },

        {
          threshold: 0.45
        }

      );


    timelineItems.forEach(
      (item, index) => {

        item.style.transition =
          `
          opacity 0.7s ease
          ${index * 0.08}s,
          transform 0.7s
          cubic-bezier(
            0.22,
            1,
            0.36,
            1
          )
          ${index * 0.08}s
          `;


        timelineObserver.observe(item);

      }
    );

  }


  /* =======================================================
     HERO BUTTON MICROINTERACTION
  ======================================================= */

  const heroButtons =
    document.querySelectorAll(
      ".hero-actions .button"
    );


  heroButtons.forEach((button) => {

    button.addEventListener(
      "mouseenter",
      () => {

        if (prefersReducedMotion) {
          return;
        }


        button.animate(

          [
            {
              letterSpacing:
                "1.1px"
            },

            {
              letterSpacing:
                "1.8px"
            },

            {
              letterSpacing:
                "1.1px"
            }
          ],

          {
            duration: 300,
            easing: "ease-out"
          }

        );

      }
    );

  });


  /* =======================================================
     CONSOLE MESSAGE
  ======================================================= */

  console.log(
    "Rodriguez Ranch website loaded successfully."
  );

});
