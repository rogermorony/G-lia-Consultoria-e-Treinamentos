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
    if (slides[index]) slides[index].classList.add("active");
    if (indicators[index]) indicators[index].classList.add("active");
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
     PÁGINA DE SERVIÇOS – NAVEGAÇÃO INTERNA
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
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  /* ========================================
     MENU MOBILE (HAMBURGUER)
  ======================================== */
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navList = document.querySelector(".nav-list");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("mobile-menu-open");
      menuToggle.classList.toggle("active");
      const isOpen = navList.classList.contains("mobile-menu-open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Fecha menu ao clicar em links comuns (exceto o que tem dropdown)
    const navLinks = document.querySelectorAll(".nav-link:not(.nav-link-dropdown), .dropdown-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("mobile-menu-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ========================================
     DROPDOWN MOBILE TOGGLE (SERVIÇOS)
  ======================================== */
  const dropdownToggle = document.querySelector(".nav-link-dropdown");
  const navItem = document.querySelector(".nav-item-dropdown");

  if (dropdownToggle && navItem) {
    dropdownToggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        navItem.classList.toggle("mobile-submenu-open");
      }
    });
  }

  /* ========================================
     FAQ ACCORDION
  ======================================== */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    button.addEventListener("click", () => {
      const isExpanded = item.classList.contains("active");
      faqItems.forEach((i) => i.classList.remove("active"));
      if (!isExpanded) item.classList.add("active");
    });
  });

  /* ========================================
     MODAL DE CONTATO
  ======================================== */
  const modalOverlay = document.getElementById("contact-modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  const formError = document.getElementById("form-error");
  const openModalButtons = document.querySelectorAll('[href="#contato"], .btn-contact');

  openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // ISSO É ESSENCIAL: Impede a página de pular/rolar
    openModal();        // Chama a função que abre o seu formulário
  });
});

  function openModal() {
    modalOverlay.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
    if(formSuccess) formSuccess.style.display = "none";
    if(formError) formError.style.display = "none";
  }

  openModalButtons.forEach(btn => btn.addEventListener("click", (e) => { e.preventDefault(); openModal(); }));
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
  }

  /* ========================================
     ENVIO DO FORMULÁRIO (FORMSPREE)
  ======================================== */
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitButton = contactForm.querySelector(".btn-submit");
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formSuccess.style.display = "block";
          contactForm.reset();
          setTimeout(closeModal, 3000);
        } else {
          formError.style.display = "block";
        }
      } catch (error) {
        formError.style.display = "block";
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Enviar Mensagem";
      }
    });
  }

  /* ========================================
     UTILITÁRIOS (ANO E TELEFONE)
  ======================================== */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
      v = v.replace(/(\d)(\d{4})$/, "$1-$2");
      e.target.value = v;
    });
  }
});