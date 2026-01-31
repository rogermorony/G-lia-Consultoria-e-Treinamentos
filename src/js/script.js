document.addEventListener("DOMContentLoaded", () => {
  /* ========================================
     CARROSSEL HERO
  ======================================== */
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;
  const totalSlides = slides.length;

  const showSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((ind) => ind.classList.remove("active"));
    slides[index]?.classList.add("active");
    indicators[index]?.classList.add("active");
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  };

  if (totalSlides > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 8000);
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  /* ========================================
     VÍDEO DO GLOBO
  ======================================== */
  const video = document.querySelector(".globe-video");
  if (video) {
    video.muted = true;
    video.loop = true;
    video.play().catch((err) => console.error("Erro ao tocar vídeo:", err));
  }

  /* ========================================
     PÁGINA DE SERVIÇOS – NAVEGAÇÃO
  ======================================== */
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll(".service-section");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      sidebarLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = 140;
        const targetPosition = targetSection.offsetTop - headerHeight - 60;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";
    const headerHeight = 140;
    const scrollPosition = window.scrollY + headerHeight + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /* ========================================
     FAQ ACCORDION – MERGULHO
  ======================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const button = item.querySelector(".faq-question");

      button.addEventListener("click", () => {
        const isExpanded = item.classList.contains("active");
        
        // Fecha os outros
        faqItems.forEach((i) => {
          if (i !== item) {
            i.classList.remove("active");
            i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          }
        });

        // Alterna o atual
        item.classList.toggle("active");
        button.setAttribute("aria-expanded", !isExpanded);
      });
    });
  }

  /* ========================================
     DROPDOWN MENU
  ======================================== */
  document.querySelectorAll(".nav-link-dropdown").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });


  /* ========================================
     ANO DINÂMICO E ATUAL NO RODAPÉ
  ======================================== */
  const yearSpan = document.getElementById("current-year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
});