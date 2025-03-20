import { Component } from "../../prototypes/Component.prototype.js";

export class Navbar extends Component {
  constructor(props = {}) {
    super("#navbar_component", props);

    this.load("components/Navbar/Navbar.component.html").then(() => {
      let estaActivoDarkMode = props.estaDarkMode;

      // Boton para menu en tabletas y android
      const navbar = document.querySelector("#navbar");
      const btnMenu = document.querySelector("#btnMenu");
      const mediaQuery = window.matchMedia("(min-width: 1025px)");
      if (!mediaQuery.matches) {
        navbar.style.display = "none";
      }

      if (btnMenu) {
        btnMenu.addEventListener("click", () => {
          navbar.style.display = navbar.style.display === "none" ? "block" : "none";
        });
      }

      // Reiniciar display al modificar el tamaño de la ventana
      window.addEventListener("resize", () => {
        if (!mediaQuery.matches) {
          navbar.style.display = "none";
          return;
        }
        navbar.style.display = "block";
      });

      // Boton para Dark Mode
      const btnDarkMode = document.querySelector("#btnDarkMode");
      const darkModeIcons = document.querySelector("#darkModeIcons");
      const lightModeIcons = document.querySelector("#lightModeIcons");

      const actualizarIconos = () => {
        darkModeIcons.style.display = estaActivoDarkMode ? "block" : "none";
        lightModeIcons.style.display = estaActivoDarkMode ? "none" : "block";
      };

      if (btnDarkMode) {
        btnDarkMode.addEventListener("click", () => {
          estaActivoDarkMode = !estaActivoDarkMode;
          actualizarIconos();

          this.emit("dark-mode-on", estaActivoDarkMode);
        });
      }

      actualizarIconos();
    });
  }
}
