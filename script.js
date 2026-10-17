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
  document.body.classList.contains("portal-page")
    ? null
    : document.querySelector("header");

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
/* =========================================================
   RR VETERINARY CLIENT PORTAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  if (!document.body.classList.contains("portal-page")) {
    return;
  }


  /* =======================================================
     DEMO PATIENT DATA
  ======================================================= */

  const pets = {

    maverick: {
      initial: "M",
      name: "Maverick",
      description:
        "Golden Retriever • Male • 4 years old",
      status: "Doing Well",
      appointmentDate: "Nov 14",
      appointmentType: "Annual Wellness Exam",
      vaccinationStatus: "Current",
      vaccinationNote: "No vaccines currently due",
      medicationCount: "1",
      medicationSummary: "Simparica Trio",
      weight: "72 lb",
      lastExam: "Aug 14, 2026",
      rabies: "Current",
      microchip: "Registered"
    },

    luna: {
      initial: "L",
      name: "Luna",
      description:
        "Quarter Horse • Mare • 8 years old",
      status: "Healthy",
      appointmentDate: "Dec 6",
      appointmentType: "Equine Wellness Visit",
      vaccinationStatus: "Current",
      vaccinationNote: "Routine vaccines current",
      medicationCount: "0",
      medicationSummary: "No active medications",
      weight: "1,050 lb",
      lastExam: "Sep 4, 2026",
      rabies: "Current",
      microchip: "Registered"
    }

  };


  /* =======================================================
     PORTAL NAVIGATION
  ======================================================= */

  const navigationButtons =
    document.querySelectorAll(
      ".portal-nav-item"
    );

  const portalViews =
    document.querySelectorAll(
      ".portal-view"
    );


  function openPortalView(viewName) {

    portalViews.forEach((view) => {

      view.classList.remove("active");

    });


    navigationButtons.forEach((button) => {

      button.classList.remove("active");

      if (
        button.dataset.view === viewName
      ) {
        button.classList.add("active");
      }

    });


    const requestedView =
      document.querySelector(
        `#view-${viewName}`
      );


    if (requestedView) {

      requestedView.classList.add(
        "active"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  }


  navigationButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        openPortalView(
          button.dataset.view
        );

      }
    );

  });


  /* =======================================================
     DASHBOARD QUICK LINKS
  ======================================================= */

  const quickViewButtons =
    document.querySelectorAll(
      "[data-open-view]"
    );


  quickViewButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        openPortalView(
          button.dataset.openView
        );

      }
    );

  });


  /* =======================================================
     PET SWITCHING
  ======================================================= */

  const petButtons =
    document.querySelectorAll(
      ".pet-selector-card"
    );


  function selectPet(petId) {

    const pet =
      pets[petId];


    if (!pet) {
      return;
    }


    petButtons.forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.pet === petId
      );

    });


    const values = {

      "selected-pet-avatar":
        pet.initial,

      "selected-pet-name":
        pet.name,

      "selected-pet-description":
        pet.description,

      "selected-pet-status":
        pet.status,

      "next-appointment-date":
        pet.appointmentDate,

      "next-appointment-type":
        pet.appointmentType,

      "vaccination-status":
        pet.vaccinationStatus,

      "vaccination-note":
        pet.vaccinationNote,

      "medication-count":
        pet.medicationCount,

      "medication-summary":
        pet.medicationSummary,

      "pet-weight":
        pet.weight,

      "last-exam":
        pet.lastExam,

      "rabies-status":
        pet.rabies,

      "microchip-status":
        pet.microchip

    };


    Object.entries(values).forEach(
      ([id, value]) => {

        const element =
          document.getElementById(id);

        if (element) {
          element.textContent = value;
        }

      }
    );

  }


  petButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        selectPet(
          button.dataset.pet
        );

      }
    );

  });


  /* =======================================================
     APPOINTMENT MODAL
  ======================================================= */

  const appointmentModal =
    document.getElementById(
      "appointment-modal"
    );

  const appointmentButtons = [
    document.getElementById(
      "request-appointment-button"
    ),

    document.getElementById(
      "appointment-page-request"
    )
  ];


  const modalClose =
    document.getElementById(
      "modal-close"
    );


  function openAppointmentModal() {

    if (!appointmentModal) {
      return;
    }

    appointmentModal.classList.add(
      "open"
    );

    appointmentModal.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function closeAppointmentModal() {

    if (!appointmentModal) {
      return;
    }

    appointmentModal.classList.remove(
      "open"
    );

    appointmentModal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  appointmentButtons.forEach(
    (button) => {

      if (!button) {
        return;
      }

      button.addEventListener(
        "click",
        openAppointmentModal
      );

    }
  );


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeAppointmentModal
    );

  }


  if (appointmentModal) {

    appointmentModal.addEventListener(
      "click",
      (event) => {

        if (
          event.target ===
          appointmentModal
        ) {
          closeAppointmentModal();
        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {
        closeAppointmentModal();
      }

    }
  );


  /* =======================================================
     DEMO APPOINTMENT FORM
  ======================================================= */

  const appointmentForm =
    document.getElementById(
      "appointment-form"
    );

  const appointmentSuccess =
    document.getElementById(
      "appointment-success"
    );


  if (appointmentForm) {

    appointmentForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        if (appointmentSuccess) {

          appointmentSuccess.textContent =
            "Demo appointment request submitted successfully.";

        }


        appointmentForm.reset();

      }
    );

  }

});
/* =========================================================
   RODRIGUEZ RANCH STORY PAGE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      !document.body.classList.contains(
        "story-page"
      )
    ) {
      return;
    }


    /* =====================================================
       STORY ROADMAP REVEAL
    ===================================================== */

    const storyTimelineItems =
      document.querySelectorAll(
        ".story-timeline article"
      );


    if (
      "IntersectionObserver" in window
    ) {

      const storyObserver =
        new IntersectionObserver(
          (entries) => {

            entries.forEach(
              (entry) => {

                if (
                  entry.isIntersecting
                ) {

                  entry.target.classList.add(
                    "visible"
                  );

                  storyObserver.unobserve(
                    entry.target
                  );

                }

              }
            );

          },
          {
            threshold: 0.2
          }
        );


      storyTimelineItems.forEach(
        (item) => {

          storyObserver.observe(item);

        }
      );

    } else {

      storyTimelineItems.forEach(
        (item) => {

          item.classList.add(
            "visible"
          );

        }
      );

    }

  }
);
/* =========================================================
   RODRIGUEZ RANCH CONTACT PAGE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      !document.body.classList.contains(
        "contact-page"
      )
    ) {
      return;
    }


    /* =====================================================
       INQUIRY CARDS
    ===================================================== */

    const inquiryCards =
      document.querySelectorAll(
        ".contact-option-card"
      );

    const inquirySelect =
      document.getElementById(
        "contact-inquiry"
      );

    const contactFormSection =
      document.getElementById(
        "contact-form-section"
      );


    inquiryCards.forEach(
      (card) => {

        card.addEventListener(
          "click",
          () => {

            inquiryCards.forEach(
              (otherCard) => {

                otherCard.classList.remove(
                  "selected"
                );

              }
            );


            card.classList.add(
              "selected"
            );


            const inquiry =
              card.dataset.inquiry;


            if (
              inquirySelect &&
              inquiry
            ) {

              inquirySelect.value =
                inquiry;

            }


            if (
              contactFormSection
            ) {

              contactFormSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }

          }
        );

      }
    );


    /* =====================================================
       DEMO CONTACT FORM
    ===================================================== */

    const contactForm =
      document.getElementById(
        "contact-form"
      );

    const contactStatus =
      document.getElementById(
        "contact-form-status"
      );


    if (
      contactForm
    ) {

      contactForm.addEventListener(
        "submit",
        (event) => {

          event.preventDefault();


          const nameInput =
            document.getElementById(
              "contact-name"
            );


          const firstName =
            nameInput &&
            nameInput.value.trim()
              ?
              nameInput.value
                .trim()
                .split(" ")[0]
              :
              "there";


          if (
            contactStatus
          ) {

            contactStatus.textContent =
              `Thanks, ${firstName}. Your demo message has been submitted.`;

          }


          contactForm.reset();


          inquiryCards.forEach(
            (card) => {

              card.classList.remove(
                "selected"
              );

            }
          );

        }
      );

    }


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems =
      document.querySelectorAll(
        ".faq-item"
      );


    faqItems.forEach(
      (item) => {

        const question =
          item.querySelector(
            ".faq-question"
          );


        if (
          !question
        ) {
          return;
        }


        question.addEventListener(
          "click",
          () => {

            const isOpen =
              item.classList.contains(
                "open"
              );


            faqItems.forEach(
              (otherItem) => {

                otherItem.classList.remove(
                  "open"
                );

              }
            );


            if (
              !isOpen
            ) {

              item.classList.add(
                "open"
              );

            }

          }
        );

      }
    );

  }
);
/* =========================================================
   GLOBAL PAGE NAVIGATION
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      document.body.classList.contains(
        "portal-page"
      )
    ) {
      return;
    }


    const pageLinks =
      document.querySelectorAll(
        "header nav a"
      );


    let currentPage =
      window.location.pathname
        .split("/")
        .pop();


    if (
      !currentPage
    ) {
      currentPage =
        "index.html";
    }


    pageLinks.forEach(
      (link) => {

        const linkPage =
          link.getAttribute("href");


        if (
          linkPage === currentPage
        ) {

          link.classList.add(
            "current-page"
          );

          link.setAttribute(
            "aria-current",
            "page"
          );

        }

      }
    );

  }
);
