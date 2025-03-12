import { Router } from "../router/index.route.js";

const title = document.querySelector("title");

title.textContent = "Landing page";

document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    "/": "views/Inicio/Inicio.page.html",
    "/inicio": "views/Inicio/Inicio.page.html",
  };

  new Router(routes);
});
