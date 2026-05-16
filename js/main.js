document.addEventListener('DOMContentLoaded', () => {

  // ========== EFECTO DE TIPEO EN EL HERO ==========
  // Agrega un elemento <span id="hero-typed"> dentro del hero-title en tu index.html
  // Ejemplo: <h1 class="hero-title"><span id="hero-typed"></span><br>en <span class="accent">Roldán, Santa Fe</span></h1>

  const typedEl = document.getElementById('hero-typed');

  if (typedEl) {
    const phrases = [
      'Taller de robótica y programación',
      'Aprendé Arduino desde cero',
      'Creá tu propio robot',
      'Python, Arduino y mucho más',
    ];

    // Insertar cursor junto al elemento
    const cursor = document.createElement('span');
    cursor.id = 'hero-cursor';
    cursor.style.cssText = `
      display: inline-block;
      width: 3px;
      height: 0.9em;
      background: #C0DD97;
      vertical-align: middle;
      margin-left: 3px;
      border-radius: 2px;
      animation: cursorBlink 0.75s step-end infinite;
    `;
    typedEl.insertAdjacentElement('afterend', cursor);

    // Agregar keyframe de parpadeo al documento
    const style = document.createElement('style');
    style.textContent = `@keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }`;
    document.head.appendChild(style);

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const TYPING_SPEED   = 75;   // ms por caracter al escribir
    const DELETING_SPEED = 35;   // ms por caracter al borrar
    const PAUSE_END      = 2200; // ms de pausa al terminar de escribir
    const PAUSE_START    = 300;  // ms de pausa antes de empezar a borrar

    function typeLoop() {
      if (isPaused) return;

      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
          isPaused = true;
          setTimeout(() => { isPaused = false; isDeleting = true; typeLoop(); }, PAUSE_END);
          return;
        }
      } else {
        typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          isPaused = true;
          setTimeout(() => { isPaused = false; typeLoop(); }, PAUSE_START);
          return;
        }
      }

      setTimeout(typeLoop, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    }

    typeLoop();
  }


  // ========== ANIMACIONES DE ENTRADA AL HACER SCROLL ==========
  // Agrega la clase "reveal" a cualquier elemento que quieras animar.
  // En tu index.html: <article class="card reveal"> o <div class="info-card reveal">

  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(revealStyle);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Pequeño delay escalonado según posición entre hermanos
          const siblings = Array.from(entry.target.parentElement?.children || []);
          const index = siblings.indexOf(entry.target);
          const delay = index * 80; // 80ms entre cada tarjeta

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target); // Solo anima una vez
        }
      });
    },
    {
      threshold: 0.12,      // Empieza a aparecer cuando el 12% es visible
      rootMargin: '0px 0px -40px 0px', // Un poco antes del borde inferior
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });


  // ========== LIGHTBOX PARA LA GALERÍA ==========
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const closeBtn = document.querySelector('.lightbox-close');

  if (galleryItems.length && lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      const img = item.querySelector('img');
      if (img) {
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      }
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }


  // ========== FUNCIÓN PARA ABRIR WHATSAPP (reutilizable) ==========
  const phoneNumber = '5493412776526';

  const abrirWhatsApp = (mensajePersonalizado) => {
    const message = encodeURIComponent(mensajePersonalizado);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // 1. Botón "Inscribirse" del menú
  const inscribirBtnNav = document.getElementById('inscribirBtnNav');
  if (inscribirBtnNav) {
    inscribirBtnNav.addEventListener('click', (e) => {
      e.preventDefault();
      abrirWhatsApp('Hola, estuve visitando la web y quiero información del taller de programación y robótica.');
    });
  }

  // 2. Botón "¡Quiero participar!" del hero
  const inscribirBtnHero = document.getElementById('inscribirBtnHero');
  if (inscribirBtnHero) {
    inscribirBtnHero.addEventListener('click', (e) => {
      e.preventDefault();
      abrirWhatsApp('Hola, estuve visitando la web y quiero información del taller de programación y robótica.');
    });
  }

  // 3. Botón WhatsApp flotante
  const whatsappFloat = document.getElementById('whatsappFloat');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', (e) => {
      e.preventDefault();
      abrirWhatsApp('Hola, estuve visitando la web y quiero información del taller de programación y robótica.');
    });
  }

  // 4. Botón WhatsApp grande en la sección contacto
  const whatsappContactoBtn = document.getElementById('whatsappContactoBtn');
  if (whatsappContactoBtn) {
    whatsappContactoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      abrirWhatsApp('Hola, estuve visitando la web y quiero información del taller de programación y robótica.');
    });
  }


  // ========== INSTAGRAM ==========
  const instagramBtn = document.getElementById('instagramBtn');
  if (instagramBtn) {
    instagramBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://www.instagram.com/encenderidea', '_blank');
    });
  }


  // ========== NAVEGACIÓN SUAVE & CIERRE DE MENÚ ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }

        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ========== LOGO CLICKEABLE (scroll al inicio) ==========
  const logo = document.getElementById('logoHome');
  if (logo) {
    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ========== MENÚ HAMBURGUESA PARA MÓVILES ==========
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });
  }

});