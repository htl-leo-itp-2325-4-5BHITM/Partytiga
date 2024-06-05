import { html, render } from "lit-html";
import L, { map, latLng, tileLayer, MapOptions, marker, LatLngExpression } from "leaflet";

export class FavoritenComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    console.log("favoriten connected");
    this.render();
  }

  render() {
    console.log("favoriten component loaded");
    render(this.displayContent(), this.shadowRoot);
  }

  displayContent() {
    return html`
      <h1>Favoriten</h1>
    `;
  }

  
}

customElements.define("event-favoriten", FavoritenComponent);
