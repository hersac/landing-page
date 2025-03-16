import { Router } from "../router/index.route.js";
import { Navbar } from "../components/Navbar/Navbar.component.js";

// Rutas de la pagina
document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    "/": "views/Inicio/Inicio.page.html",
    "/nosotros": "views/Nosotros/Nosotros.page.html",
    "/servicios": "views/Servicios/Servicios.page.html",
    "/proyectos": "views/Proyectos/Proyectos.page.html",
    "/contacto": "views/Contacto/Contacto.page.html"
  };

  new Router(routes);
});

// Titulo de la pagina
const title = document.querySelector("title");
title.textContent = "Landing page";

// Obtener estado del Dark Mode desde localStorage
const darkModeStorage = localStorage.getItem("darkMode") === "true";

// Componente Navbar
const navbar = new Navbar({
  titulos: {
    inicioTitle: "Inicio",
    nosotrosTitle: "Nosótros",
    serviciosTitle: "Servicios",
    proyectosTitle: "Proyectos",
    contactoTitle: "Contacto",
  },
  estaDarkMode: darkModeStorage
});

// Aplicar el Dark Mode al cargar la página
if (darkModeStorage) {
  document.body.classList.add("dark-theme");
}

// Escuchar cambios del Dark Mode desde la Navbar
navbar.on("dark-mode-on", (event) => {
  const estaActivoDarkMode = event.detail;

  // Guardar en localStorage
  localStorage.setItem("darkMode", estaActivoDarkMode);

  // Aplicar el tema
  if (estaActivoDarkMode) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
});


