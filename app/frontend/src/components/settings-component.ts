import { html,render } from "lit-html"
import { login } from "../";

export class settingsComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
      this.render();
  }

  render() {
    render(this.displayContent(), this.shadowRoot)
    console.log("setting component loaded");
  }
  displayContent() {
    login();
    return html`
      <h1>Anmeldedaten</h1>
      <p>Vorname</p>
      <p>Nachname</p>
      <p>Email</p>
      <p>Passwort</p>
      `;
  }
}

customElements.define("event-settings", settingsComponent)

