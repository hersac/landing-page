export class Router {
  constructor(routes) {
    this.routes = routes;
    this.appContainer = document.getElementById("app");

    window.addEventListener("popstate", () => {
      this.loadView(location.pathname);
    });

    document.body.addEventListener("click", (event) => {
      if (event.target.matches("[data-link]")) {
        event.preventDefault();
        this.navigateTo(event.target.getAttribute("href"));
      }
    });

    this.loadView(location.pathname);
  }

  async loadView(path) {
    if (!this.routes[path]) {
      console.warn(`Ruta no encontrada: ${path}. Redirigiendo a '/'`);
      path = "/";
    }

    const viewPath = this.routes[path];
    try {
      const response = await fetch(viewPath);
      if (!response.ok) throw new Error(`Error al cargar la ${viewPath}`);
      const content = await response.text();
      this.appContainer.innerHTML = content;
    } catch (error) {
      console.error(error);
      this.appContainer.innerHTML = "<h2>Elemento no encontrado. 404</h2>";
    }
  }

  navigateTo(path) {
    history.pushState({}, "", path);
    this.loadView(path);
  }
}
