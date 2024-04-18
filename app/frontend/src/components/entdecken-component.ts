import { loadEvents, loadEventsByList } from "../service/event-service";
import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { produce } from "immer";

import { EventTableComponent } from "./event-table-component";

export class EntdeckenComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    store.subscribe((model) => {
      this.render(model.events);
    });
    this.addStyles();
  }

  render(events: Event[]) {
    render(this.displayHeader(events), this.shadowRoot)
    console.log("entdecken component loaded");
  }

  displayHeader(events: Event[]) {
    return html`
    <div id="searchBox">
      <img id="lupe" src="../../img/lupe.png">
      <input
      type="text"
      id="searchbar"
      placeholder="Suchen.."
      @keyup=${() => this.searchEvent(events)}/>
    </div>
      <event-table></event-table>
      `;
  }

  
  searchEvent(events: Event[]) {
    const searchString = (
      this.shadowRoot.getElementById("searchbar") as HTMLInputElement
    ).value.toLowerCase();
    console.log("search " + searchString);
    if (searchString !== "") {
      let loadedEvents = loadEventsByList(searchString, events);
      console.log(loadedEvents);
    } else {
      loadEvents();
    }
  }

  addStyles() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "../../styles/entdecken-style.css");
    this.shadowRoot.appendChild(linkElem);
  }
}

customElements.define("event-entdecken", EntdeckenComponent);

