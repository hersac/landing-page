import { Router } from "../router/index.route.js";

// Titulo de la pagina
const title = document.querySelector("title");
title.textContent = "Landing page";

// Rutas de la pagina
document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    "/": "views/Inicio/Inicio.page.html",
    "/nosotros": "views/Nosotros/Nosotros.page.html",
  };

  new Router(routes);
});
