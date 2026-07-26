// =====================================================
// Portafolio — Interactividad
// Menú móvil, animación de aparición y manejo de
// imágenes pendientes (placeholders).
// =====================================================

// ----- Menú móvil -----
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

// ----- Animación de aparición al hacer scroll -----
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px -10% 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ----- Visor de PDF con carga manual -----
// Los PDF no se cargan al abrir la página (algunos navegadores inician
// una descarga automática). El visor embebido se crea solo cuando la
// persona presiona "Ver documento aquí".
document.querySelectorAll(".pdf-loader").forEach((box) => {
  const btn = box.querySelector("[data-load-pdf]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.className = "pdf-embed";
    iframe.src = box.dataset.pdf;
    iframe.title = box.dataset.title || "Documento PDF";
    box.replaceWith(iframe);
  });
});

// ----- Imágenes pendientes -----
// Las imágenes marcadas con data-optional que aún no existen se
// reemplazan por un recuadro indicando qué archivo falta agregar,
// en lugar de mostrar un ícono de imagen rota.
document.querySelectorAll("img[data-optional]").forEach((img) => {
  const showPlaceholder = () => {
    if (img.classList.contains("nav__badge")) {
      img.remove(); // la insignia simplemente se oculta si falta
      return;
    }
    const placeholder = document.createElement("div");
    placeholder.className = "img-placeholder";
    const file = img.getAttribute("src");
    placeholder.textContent = `📷 Imagen pendiente — agregar ${file}`;
    img.replaceWith(placeholder);
  };

  if (img.complete && img.naturalWidth === 0) {
    showPlaceholder();
  } else {
    img.addEventListener("error", showPlaceholder);
  }
});
