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


const scrollIndicator = document.querySelector(".scroll");
function hideScrollIndicator() {
  scrollIndicator.classList.add("animate__animated", "animate__fadeOutUp");
  window.removeEventListener("scroll", hideScrollIndicator);
}
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollIndicator.classList.add("animate__animated", "animate__fadeOutUp");
  }
}, { passive: true });



