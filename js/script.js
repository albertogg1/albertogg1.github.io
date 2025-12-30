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



