export class Component {
  constructor(selector, props = {}) {
    this.selector = selector;
    this.container = document.createElement("div");
    this.props = props;
    this.events = {};
  }

  async load(templatePath) {
    try {
      const response = await fetch(templatePath);
      if (!response.ok)
        throw new Error(`Error al cargar el template ${templatePath}`);

      const html = await response.text();
      const fragment = document.createElement("div");
      fragment.innerHTML = html;

      const selectedElement = fragment.querySelector(this.selector);
      if (!selectedElement) {
        console.error(
          `❌ No se encontró '${this.selector}' dentro del HTML cargado.`
        );
        return;
      }

      this.container.replaceWith(selectedElement);
      this.container = selectedElement;

      document.body.appendChild(this.container);

      this.renderProps();
      this.attachEvents();
    } catch (error) {
      console.error(error);
    }
  }

  renderProps() {
    if (!this.container) {
      console.error("❌ No se puede renderizar props porque this.container es null.");
      return;
    }

    let html = this.container.innerHTML;

    // Función recursiva para aplanar objetos y arrays
    function flatten(obj, prefix = "") {
      return Object.keys(obj).reduce((acc, key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        if (Array.isArray(value)) {
          // Convertimos los arrays en una cadena separada por comas
          acc[fullKey] = value.join(", ");
        } else if (typeof value === "object" && value !== null) {
          Object.assign(acc, flatten(value, fullKey)); // Llamado recursivo
        } else {
          acc[fullKey] = value.toString(); // Convertimos todo a string para evitar errores
        }
        return acc;
      }, {});
    }

    // Convertir `props` en una estructura aplanada
    const flatProps = flatten(this.props);

    // Reemplazar valores en el HTML
    Object.keys(flatProps).forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      html = html.replace(regex, flatProps[key]);
    });

    this.container.innerHTML = html;
  }



  attachEvents() {
    Object.keys(this.events).forEach((eventName) => {
      this.container.addEventListener(eventName, this.events[eventName]);
    });
  }

  on(eventName, callback) {
    this.events[eventName] = callback;
  }

  emit(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    this.container.dispatchEvent(event);
  }
}
