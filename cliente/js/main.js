import { Router } from "../router/index.route.js";
import { Navbar } from "../components/Navbar/Navbar.component.js";

// Titulo de la pagina
const title = document.querySelector("title");
title.textContent = "Landing page";

// componente Navbar
const navbar = new Navbar({
  inicioTitle: "Inicio",
  nosotrosTitle: "Nosotros",
});

navbar.on("navbar-click", (event) => {
  console.log("Evento:", event.detail);
});

// Rutas de la pagina
document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    "/": "views/Inicio/Inicio.page.html",
    "/nosotros": "views/Nosotros/Nosotros.page.html",
  };

  new Router(routes);
});
