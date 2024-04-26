import { loadEvents, loadEventsByList } from "../service/event-service";
import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { produce } from "immer";

import { EventTableComponent } from "./event-table-component";

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
    render(this.displayContent(), this.shadowRoot)
  }

  displayContent() {
    return html`
      <h1>Favoriten</h1>
      <!--<event-table></event-table>-->`;
  }

}

customElements.define("event-favoriten", FavoritenComponent);

