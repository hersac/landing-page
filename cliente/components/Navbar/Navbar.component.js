import { Component } from "../../prototypes/Component.prototype.js";

export class Navbar extends Component {
  constructor(props = {}) {
    super("#navbar", props);
    this.load("components/Navbar/Navbar.component.html").then(() => {
      const btnLogout = document.querySelector("#btnLogout");
      if (btnLogout) {
        btnLogout.addEventListener("click", () =>
          this.emit("navbar-click", "Hola Chicos")
        );
      }
    });
  }
}
