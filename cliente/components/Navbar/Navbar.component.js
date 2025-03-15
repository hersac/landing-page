import { Component } from "../../prototypes/Component.prototype.js";

export class Navbar extends Component {
  constructor(props = {}) {
    super("#navbar", props);

    this.load("components/Navbar/Navbar.component.html").then(() => {
      const btnDarkMode = document.querySelector("#btnDarkMode");
      const darkModeIcons = document.querySelector("#darkModeIcons");
      const lightModeIcons = document.querySelector("#lightModeIcons");

      let estaActivoDarkMode = props.estaDarkMode;

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
