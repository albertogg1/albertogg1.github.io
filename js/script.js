// === POPUP MODAL PARA PROYECTOS ===
document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll('.project');
  let modal = document.getElementById('projectModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'projectModal';
    modal.innerHTML = `
      <div class="modal-bg"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Cerrar">&times;</button>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  const modalBg = modal.querySelector('.modal-bg');
  const modalClose = modal.querySelector('.modal-close');
  const modalBody = modal.querySelector('.modal-body');

  function openModal(html) {
    modalBody.innerHTML = html;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  modalBg.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);

  projects.forEach(card => {
    card.addEventListener('click', function () {
      const title = card.getAttribute('data-title');
      const imgs = card.getAttribute('data-imgs') || card.getAttribute('data-img') || '';
      const logo = card.getAttribute('data-logo');
      const company = card.getAttribute('data-company') || '';
      const desc = card.getAttribute('data-desc');
      const tags = card.getAttribute('data-tags');
      const link = card.getAttribute('data-link');
      const tagsArr = tags ? tags.split(',') : [];
      // Soporte para varias imágenes separadas por coma
      const imgArr = imgs.split(',').map(s => s.trim()).filter(Boolean);
      let carouselHtml = '';
      if (imgArr.length > 1) {
        carouselHtml = `
          <div class="modal-carousel">
            <div class="carousel-track-inner" style="display:flex;transition:transform 0.35s cubic-bezier(.4,0,.2,1);width:100%;">
              ${imgArr.map((src, i) => `<div class="carousel-slide" style="flex:0 0 100%;display:flex;align-items:center;justify-content:center;"><img src="${src}" alt="${title} imagen ${i + 1}" class="carousel-img" draggable="false"></div>`).join('')}
            </div>
          </div>
        `;
      } else {
        carouselHtml = `<div class="modal-carousel"><img src="${imgArr[0] || ''}" alt="${title}" class="carousel-img" style="display:block;" draggable="false"></div>`;
      }
      openModal(`
        <div class="modal-left">${carouselHtml}</div>
        <div class="modal-right">
          <div class="modal-title">${title}</div>
          ${company ? `<div class="modal-company">${company}</div>` : ''}
          <div class="modal-desc">${desc}</div>
          <div class="modal-tags">
            ${tagsArr.map(t => `<span class="tag">${t}</span>`).join(' ')}
          </div>
          ${link ? `<a href="${link}" target="_blank" class="btn">Ver proyecto</a>` : ''}
        </div>
      `);
      // Carrusel funcional con slide
      if (imgArr.length > 1) {
        let current = 0;
        const carousel = modal.querySelector('.modal-carousel');
        const trackInner = carousel.querySelector('.carousel-track-inner');
        // Crear indicadores
        let indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        indicators.style.cssText = 'display:flex;gap:8px;justify-content:center;align-items:center;position:absolute;bottom:18px;left:0;right:0;z-index:3;';
        for (let i = 0; i < imgArr.length; i++) {
          let dot = document.createElement('span');
          dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          dot.style.cssText = 'width:10px;height:10px;border-radius:50%;background:#bbb;display:inline-block;transition:background 0.2s;cursor:pointer;';
          indicators.appendChild(dot);
        }
        carousel.parentElement.appendChild(indicators);
        function updateIndicators(idx) {
          const dots = indicators.querySelectorAll('.carousel-dot');
          dots.forEach((d, i) => d.style.background = i === idx ? '#666' : '#bbb');
        }
        function goTo(idx, animate = true) {
          current = idx;
          trackInner.style.transition = animate ? 'transform 0.35s cubic-bezier(.4,0,.2,1)' : 'none';
          trackInner.style.transform = `translateX(-${current * 100}%)`;
          updateIndicators(current);
        }
        // Click en los puntitos
        indicators.addEventListener('click', function(e) {
          if (e.target.classList.contains('carousel-dot')) {
            const idx = Array.from(indicators.children).indexOf(e.target);
            if (idx !== -1) goTo(idx);
          }
        });
        // Touch/swipe y drag unificado
        let startX = 0, startY = 0, currentX = 0, isDragging = false, startTime = 0;
        function getX(e) {
          return e.touches ? e.touches[0].clientX : e.clientX;
        }
        function getY(e) {
          return e.touches ? e.touches[0].clientY : e.clientY;
        }
        function onStart(e) {
          isDragging = true;
          startX = getX(e);
          startY = getY(e);
          currentX = startX;
          startTime = Date.now();
          trackInner.style.transition = 'none';
          carousel.style.cursor = 'grabbing';
        }
        function onMove(e) {
          if (!isDragging) return;
          currentX = getX(e);
          const diff = currentX - startX;
          const offset = -current * 100;
          const percent = (diff / carousel.offsetWidth) * 100;
          trackInner.style.transform = `translateX(calc(${offset}% + ${percent}%))`;
        }
        function onEnd(e) {
          if (!isDragging) return;
          isDragging = false;
          carousel.style.cursor = '';
          const diff = currentX - startX;
          const elapsed = Date.now() - startTime;
          const velocity = Math.abs(diff) / elapsed;
          // Umbral de swipe: 40px o velocidad rápida
          if (diff < -40 || (diff < -10 && velocity > 0.3)) {
            if (current < imgArr.length - 1) goTo(current + 1);
            else goTo(current);
          } else if (diff > 40 || (diff > 10 && velocity > 0.3)) {
            if (current > 0) goTo(current - 1);
            else goTo(current);
          } else {
            goTo(current);
          }
        }
        // Touch
        carousel.addEventListener('touchstart', onStart, { passive: true });
        carousel.addEventListener('touchmove', onMove, { passive: true });
        carousel.addEventListener('touchend', onEnd);
        carousel.addEventListener('touchcancel', onEnd);
        // Mouse
        carousel.addEventListener('mousedown', function(e) {
          e.preventDefault();
          onStart(e);
        });
        carousel.addEventListener('mousemove', onMove);
        carousel.addEventListener('mouseup', onEnd);
        carousel.addEventListener('mouseleave', onEnd);
      }
    });
  });
});
const track = document.querySelector(".carousel-track");

// Pausar al tocar (móviles)
track.addEventListener("touchstart", () => {
  track.classList.add("paused");
}, { passive: true });

// Reanudar cuando se quita el dedo
track.addEventListener("touchend", () => {
  track.classList.remove("paused");
}, { passive: true });

track.addEventListener("touchcancel", () => {
  track.classList.remove("paused");
}, { passive: true });


// === THEME TOGGLE ===
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Detectar preferencia del sistema
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// Cargar tema guardado o usar preferencia del sistema
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    // Si hay un tema guardado, usarlo
    html.setAttribute("data-theme", savedTheme);
  } else if (prefersDark.matches) {
    // Si no hay guardado pero el sistema prefiere oscuro, usar oscuro
    html.setAttribute("data-theme", "dark");
  } else {
    // Si no hay guardado y sistema prefiere claro, usar claro
    html.setAttribute("data-theme", "light");
  }
}

// Alternar tema
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Detectar cambios de preferencia del sistema
prefersDark.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    const newTheme = e.matches ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
  }
});

// Cargar tema al iniciar
loadTheme();


const header = document.querySelector("header");
const brand = document.querySelector(".brand");

let lastScroll = 0;
window.addEventListener("scroll", () => {
  const current = window.scrollY;

  if (current > 60 && current > lastScroll) {
    header.classList.add("shrink");
    brand.classList.add("shrink");
  } else if (current < 60) {
    header.classList.remove("shrink");
    brand.classList.remove("shrink");
  }

  lastScroll = current;
});


// Indicador de scroll - solo aparece si el usuario pasa tiempo sin moverse
const scrollIndicator = document.querySelector(".scroll-indicator");
let scrollTimer = null;
let inactivityTimer = null;
const INACTIVITY_TIME = 4000; // 4 segundos sin movimiento

if (scrollIndicator) {
  // Función para ocultar el indicador
  function hideIndicator() {
    scrollIndicator.classList.remove("show");
    if (scrollTimer) {
      clearTimeout(scrollTimer);
      scrollTimer = null;
    }
  }

  // Función para mostrar el indicador después de inactividad
  function showIndicatorAfterInactivity() {
    // Solo mostrar si estamos en la parte superior de la página
    if (window.scrollY < 100) {
      scrollIndicator.classList.add("show");
    }
  }

  // Función para resetear el timer de inactividad
  function resetInactivityTimer() {
    // Ocultar el indicador inmediatamente cuando hay movimiento
    hideIndicator();

    // Limpiar timer anterior
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // Solo iniciar nuevo timer si estamos en la parte superior
    if (window.scrollY < 100) {
      inactivityTimer = setTimeout(showIndicatorAfterInactivity, INACTIVITY_TIME);
    }
  }

  // Detectar scroll
  window.addEventListener("scroll", () => {
    // Ocultar si el usuario hace scroll hacia abajo
    if (window.scrollY > 100) {
      hideIndicator();
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
      }
    } else {
      // Si vuelve arriba, resetear el timer
      resetInactivityTimer();
    }
  }, { passive: true });

  // Detectar movimiento del mouse (opcional, para detectar actividad)
  let mouseMoveTimer;
  document.addEventListener("mousemove", () => {
    if (window.scrollY < 100) {
      // Si hay movimiento del mouse, resetear el timer
      if (mouseMoveTimer) {
        clearTimeout(mouseMoveTimer);
      }
      hideIndicator();
      mouseMoveTimer = setTimeout(() => {
        resetInactivityTimer();
      }, 500);
    }
  }, { passive: true });

  // Iniciar el timer cuando la página carga
  // Solo si estamos en la parte superior
  if (window.scrollY < 100) {
    inactivityTimer = setTimeout(showIndicatorAfterInactivity, INACTIVITY_TIME);
  }
}



