import { html, render } from "lit-html";
import { store, Event, Model } from "../model/model";
import { BehaviorSubject } from "rxjs";
import { produce } from "immer";

export class FavoritenComponent extends HTMLElement {
  private favorites: Event[] = [];
  private currentEvent?: Event;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
  }

  connectedCallback(): void {
    console.log("favoriten connected");
    store.subscribe((model) => {
      this.favorites = model.favorites;
      this.currentEvent = model.currentEvent;
      this.render();
    });
    this.addStyles();
  }

  render() {
    console.log("favoriten component loaded");
    render(this.template(), this.shadowRoot);
  }

  template() {
    const eventBoxes = this.favorites.map((event, index) => {
      return html`
        <div id="eventBox" @click=${() => this.showDetails(event)}>
          <img src="https://www.gardasee.at/images/Feiernde-Leute.jpg" alt="festl">
          <p>${event.name}</p>
          <p>${event.date}</p>
          <a @click=${() => this.toggleFavorite(event)}>
            ${this.isFavorite(event) ?  html`<img id="pfeil" src="../../img/fullheart.png" alt="Remove from Favorites">`
              : html`<img id="pfeil" src="../../img/heart.png" alt="Add to Favorites">`}
          
          </a>
        </div>
        ${index % 2 === 1 ? html`<div style="width: 100%; height: 0;"></div>` : ''}
      `;
    });

    return html`
      <div id="events" >
        ${eventBoxes}
      </div>
      ${this.currentEvent ? this.renderEventDetails() : ''}
      <div id="map" style="width: 500px; height: 500px;"></div>
    `;
  }

  renderEventDetails() {
    const currentEvent = this.currentEvent;
    return html`
      <div id="myModal" class="modal">
        <div class="modal-content">
          <div id="closeBox">
            <i class="fa-regular fa-rectangle-xmark" id="close" @click=${() => this.closeDialog()}><img id="pfeil" src="../../img/pfeil.png"></i>
            <p>Details</p>
          </div>
          <form id="eventForm">
            <div>
              <label for="eventName">Event Name:</label>
              <input type="text" id="eventName" name="eventName" .value=${currentEvent.name || ''}>
            </div>
            <div>
              <label for="organizerName">Organizer:</label>
              <input type="text" id="organizerName" name="organizerName" .value=${currentEvent.organization || ''}>
            </div>
            <div>
              <label for="eventDate">Date:</label>
              <input type="text" id="eventDate" name="eventDate" .value=${currentEvent.date || ''}>
            </div>
            <div>
              <label for="eventAddress">Address:</label>
              <input type="text" id="eventAddress" name="eventAddress" .value=${currentEvent.address || ''}>
            </div>
            <div>
              <label for="eventLocation">Location:</label>
              <input type="text" id="eventLocation" name="eventLocation" .value=${currentEvent.location || ''}>
            </div>
            <div>
              <label for="eventAge">Age:</label>
              <input type="number" id="eventAge" name="eventAge" .value=${currentEvent.age || ''}>
            </div>
            <div>
              <label for="ticketURL">Tickets:</label>
              <input type="text" id="ticketURL" name="ticketURL" .value=${currentEvent.tickets || ''}>
            </div>
            <div>
              <label for="contactInfo">Contact:</label>
              <input type="text" id="contactInfo" name="contactInfo" .value=${currentEvent.contact || ''}>
            </div>
            <div>
              <label for="xCoord">X Coordinate:</label>
              <input type="number" step="any" id="xCoord" name="xCoord" .value=${currentEvent.xkoordinate || ''}>
            </div>
            <div>
              <label for="yCoord">Y Coordinate:</label>
              <input type="number" step="any" id="yCoord" name="yCoord" .value=${currentEvent.ykoordinate || ''}>
            </div>
            <div>
              <label for="imageUpload">Upload Image:</label>
              <input type="file" id="imageUpload" name="imageUpload">
              <img id="imagePreview" src=${currentEvent.img || ''} alt="Event Image Preview" style="display: ${currentEvent.img ? 'block' : 'none'};">
            </div>
            <button type="button" id="addEvent" @click=${() => this.saveEvent()}>
              Speichern
            </button>
            <button type="button" @click=${() => this.removeEvent()}>
              Löschen
            </button>
          </form>
        </div>
      </div>
    `;
  }

  toggleFavorite(event: Event) {
    const newFavorites = produce(this.favorites, (draft) => {
      const index = draft.findIndex((e) => e.id === event.id);
      if (index !== -1) {
        draft.splice(index, 1);
      } else {
        draft.push(event);
      }
    });

    store.next({ ...store.getValue(), favorites: newFavorites });
  }

  isFavorite(event: Event): boolean {
    return this.favorites.some((fav) => fav.id === event.id);
  }

  showDetails(event: Event) {
    store.next({ ...store.getValue(), currentEvent: event });
  }

  closeDialog() {
    store.next({ ...store.getValue(), currentEvent: undefined });
  }

  addStyles() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "../../styles/event-table-style.css");
    this.shadowRoot.appendChild(linkElem);

    const leafletCSSLink = document.createElement("link");
    leafletCSSLink.setAttribute("rel", "stylesheet");
    leafletCSSLink.setAttribute("href", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    leafletCSSLink.setAttribute("integrity", "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=");
    leafletCSSLink.setAttribute("crossorigin", "");
    this.shadowRoot.appendChild(leafletCSSLink);

    const leafletScript = document.createElement("script");
    leafletScript.setAttribute("src", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
    leafletScript.setAttribute("integrity", "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=");
    leafletScript.setAttribute("crossorigin", "");
    this.shadowRoot.appendChild(leafletScript);
  }

  // Implement saveEvent and removeEvent methods if they are not external
  saveEvent() {
    console.log("saveEvent method called");
    // Implement your save logic here
  }

  removeEvent() {
    console.log("removeEvent method called");
    // Implement your remove logic here
  }
}

customElements.define("event-favoriten", FavoritenComponent);
