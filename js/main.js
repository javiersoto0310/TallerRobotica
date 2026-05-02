document.addEventListener('DOMContentLoaded', () => {
  
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

  // 1. Botón "Inscribirse" del menú hamburguesa
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
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      
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

  // ========== LOGO CLICKEABLE (Scroll al inicio) ==========
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