import { loadEvents, loadEventsByList } from "../service/event-service";
import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { produce } from "immer";
import L from 'leaflet';

export class EventTableComponent extends HTMLElement {
  private map: L.Map | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    console.log("eventtable connected");
    store.subscribe((model) => {
      this.render(model.events, model.currentEvent);
    });
    this.addStyles();
  }

  render(events: Event[], currentEvent?: Event) {
    console.log("table component loaded");
    render(this.template(events, currentEvent), this.shadowRoot);
  }

  nameTemplate = (event: Event) => html`
    <div class="rowName">
      <!--<p class="label">Name:</p>-->
      <p class="output">${event.name}</p>
    </div>
  `;

  organizerTemplate = (event: Event) => html`
    <div class="rowOrganizer">
      <p class="label">Veranstalter:</p>
      <p class="output">${event.organization}</p>
    </div>
  `;

  dateTemplate = (event: Event) => html`
    <div class="rowDate">
      <!--<p class="label">Datum:</p>-->
      <p class="output">${event.date}</p>
    </div>
  `;

  locationTemplate = (event: Event) => html`
    <div class="rowLocation">
      <p class="label">Adresse:</p>
      <p class="output">${event.location}</p>
    </div>
  `;
  
  imgTemplate = (event: Event) => html`
    <div class="rowImg">
      <img src="${event.img}">
    </div>
  `;

  template(events: Event[], currentEvent: Event) {
    const eventBoxes = events.map((event) => {
      const rowName = this.nameTemplate(event);
      const rowOrganizer = this.organizerTemplate(event);
      const rowDate = this.dateTemplate(event);
      const rowLocation = this.locationTemplate(event);
      const rowImg = this.imgTemplate(event);

      console.log("template entered", events, currentEvent);

      return html`
        <div
          id="eventBox"
          @click=${() => {
            this.eventClick(event);
          }}
        >
          <img src="https://www.gardasee.at/images/Feiernde-Leute.jpg" alt="festl">
          <p>${rowName}</p>
          <p>${rowDate}</p>
          <a @click=${(e) => this.toggleFavorite(e, event)}>
                    ${this.isFavorite(event) 
                      ? html`<img id="pfeil" src="../../img/fullheart.png" alt="Remove from Favorites">`
                      : html`<img id="pfeil" src="../../img/heart.png" alt="Add to Favorites">`}
                  </a>
        </div>
      `;
    });

    return html`
      <div id="events">${eventBoxes}</div>
      <div id="myModal" class="modal">
        <div class="modal-content">
        <div id="closeBox">
            <i
              class="fa-regular fa-rectangle-xmark"
              id="close"
              @click=${() => this.closeDialog()}
              ><img id="pfeil" src="../../img/pfeil.png"></i
            >
            <p>Details</p>
          </div>
          <form id="eventForm">
            <div>
              <label for="eventName">Event Name:</label>
              <input type="text" id="eventName" name="eventName" .value=${currentEvent?.name || ''}>
            </div>
            <div>
              <label for="organizerName">Organizer:</label>
              <input type="text" id="organizerName" name="organizerName" .value=${currentEvent?.organization || ''}>
            </div>
            <div>
              <label for="eventDate">Date:</label>
              <input type="text" id="eventDate" name="eventDate" .value=${currentEvent?.date || ''}>
            </div>
            <div>
              <label for="eventAddress">Address:</label>
              <input type="text" id="eventAddress" name="eventAddress" .value=${currentEvent?.address || ''}>
            </div>
            <div>
              <label for="eventLocation">Location:</label>
              <input type="text" id="eventLocation" name="eventLocation" .value=${currentEvent?.location || ''}>
            </div>
            <div>
              <label for="eventAge">Age:</label>
              <input type="number" id="eventAge" name="eventAge" .value=${currentEvent?.age || ''}>
            </div>
            <div>
              <label for="ticketURL">Tickets:</label>
              <input type="text" id="ticketURL" name="ticketURL" .value=${currentEvent?.tickets || ''}>
            </div>
            <div>
              <label for="contactInfo">Contact:</label>
              <input type="text" id="contactInfo" name="contactInfo" .value=${currentEvent?.contact || ''}>
            </div>
            <div>
              <label for="xCoord">X Coordinate:</label>
              <input type="number" step="any" id="xCoord" name="xCoord" .value=${currentEvent?.xkoordinate || ''}>
            </div>
            <div>
              <label for="yCoord">Y Coordinate:</label>
              <input type="number" step="any" id="yCoord" name="yCoord" .value=${currentEvent?.ykoordinate || ''}>
            </div>
            <div>
              <label for="imageUpload">Upload Image:</label>
              <input type="file" id="imageUpload" name="imageUpload" @change=${this.previewImage}>
              <img id="imagePreview" src=${currentEvent?.img || ''} alt="Event Image Preview" style="display: ${currentEvent?.img ? 'block' : 'none'};">
            </div>
            <button
              type="button"
              id="addEvent"
              @click=${() => this.saveEvent(currentEvent?.id)}
              ?disabled=${!(currentEvent?.name)}
            >
              Speichern
            </button>
            <button
              type="button"
              @click=${() => this.removeEvent(currentEvent?.id)}
            >
              Löschen
            </button>
          </form>
          <div id="map" style="width: 500px; height: 500px;"></div>
        </div>
      </div>
    `;
  }

  toggleFavorite(e, event) {
    e.stopPropagation();
    const model = store.getValue();
    const nextState = produce(model, (draft) => {
      if (this.isFavorite(event)) {
        draft.favorites = draft.favorites.filter(fav => fav.id !== event.id);
      } else {
        draft.favorites.push(event);
      }
    });
    store.next(nextState);
  }

  isFavorite(event) {
    const model = store.getValue();
    return model.favorites.some(fav => fav.id === event.id);
  }

  openDialog() {
    console.log("open dialog");
    const modal = this.shadowRoot?.getElementById("myModal");
    const currentEvent = store.getValue().currentEvent;

    if (modal) {
      modal.classList.add("open");

      if (currentEvent) {
        this.initializeMap(currentEvent.xkoordinate, currentEvent.ykoordinate);
      }
    }
  }

  closeDialog() {
    console.log("close dialog");
    const modal = this.shadowRoot?.getElementById("myModal");

    if (modal) {
      modal.classList.remove("open");

      // Entfernen der Karte, wenn sie vorhanden ist
      if (this.map) {
        this.map.remove();
        this.map = null;
        const mapContainer = this.shadowRoot?.getElementById('map') as HTMLElement;
        if (mapContainer) {
          mapContainer.innerHTML = ''; // Inhalt des Karten-Containers entfernen
        }
      }
    }
  }

  initializeMap(xkoordinate: number, ykoordinate: number) {
    const mapContainer = this.shadowRoot?.getElementById('map');
    if (mapContainer) {
      // Überprüfen, ob eine Karte bereits initialisiert wurde und entfernen Sie sie
      if (this.map) {
        this.map.remove();
        this.map = null;
      }

      this.map = L.map(mapContainer, {
        center: [xkoordinate, ykoordinate],
        zoom: 12,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      const coords: [number, number] = [xkoordinate, ykoordinate];
      L.marker(coords).addTo(this.map)
        .openPopup();
    }
  }

  previewImage(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = this.shadowRoot?.getElementById('imagePreview') as HTMLImageElement;
        preview.src = e.target.result as string;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  checkInput() {
    const saveButton = this.shadowRoot?.getElementById("addEvent") as HTMLButtonElement;
    if (saveButton) {
      const eventName = (this.shadowRoot?.getElementById("eventName") as HTMLInputElement).value;
      const organizerName = (this.shadowRoot?.getElementById("organizerName") as HTMLInputElement).value;
      const eventDate = (this.shadowRoot?.getElementById("eventDate") as HTMLInputElement).value;
      const eventAddress = (this.shadowRoot?.getElementById("eventAddress") as HTMLInputElement).value;
      const eventLocation = (this.shadowRoot?.getElementById("eventLocation") as HTMLInputElement).value;
      const eventAge = (this.shadowRoot?.getElementById("eventAge") as HTMLInputElement).value;
      const ticketURL = (this.shadowRoot?.getElementById("ticketURL") as HTMLInputElement).value;
      const contactInfo = (this.shadowRoot?.getElementById("contactInfo") as HTMLInputElement).value;
  
      saveButton.disabled = !(
        eventName.trim() &&
        organizerName.trim() &&
        eventDate.trim() &&
        eventAddress.trim() &&
        eventLocation.trim() &&
        eventAge.trim() &&
        ticketURL.trim() &&
        contactInfo.trim()
      );
    }
  }

  eventClick(event: Event) {
    console.log("Event clicked: ", event);
    const nextState = produce(store.getValue(), (draft) => {
      draft.currentEvent = event;
    });
    store.next(nextState);
    this.openDialog();
  }

  async saveEvent(id?: number) {
    console.log("save event clicked");
    const eventName = (this.shadowRoot?.getElementById("eventName") as HTMLInputElement)?.value;
    const organizerName = (this.shadowRoot?.getElementById("organizerName") as HTMLInputElement)?.value;
    const eventDate = (this.shadowRoot?.getElementById("eventDate") as HTMLInputElement)?.value;
    const eventAddress = (this.shadowRoot?.getElementById("eventAddress") as HTMLInputElement)?.value;
    const eventLocation = (this.shadowRoot?.getElementById("eventLocation") as HTMLInputElement)?.value;
    const eventAge = (this.shadowRoot?.getElementById("eventAge") as HTMLInputElement)?.value;
    const ticketURL = (this.shadowRoot?.getElementById("ticketURL") as HTMLInputElement)?.value;
    const contactInfo = (this.shadowRoot?.getElementById("contactInfo") as HTMLInputElement)?.value;
    const imgPreview = (this.shadowRoot?.getElementById('imagePreview') as HTMLImageElement)?.src;
    const xCoord = parseFloat((this.shadowRoot?.getElementById("xCoord") as HTMLInputElement)?.value);
    const yCoord = parseFloat((this.shadowRoot?.getElementById("yCoord") as HTMLInputElement)?.value);
  
    const newEvent: Event = {
      id: id ?? Date.now(),
      name: eventName,
      organization: organizerName,
      date: eventDate,
      address: eventAddress,
      location: eventLocation,
      age: parseInt(eventAge),
      tickets: ticketURL,
      contact: contactInfo,
      img: imgPreview,
      xkoordinate: xCoord,
      ykoordinate: yCoord
    };
  
    const nextState = produce(store.getValue(), (draft) => {
      const eventIndex = draft.events.findIndex((event) => event.id === newEvent.id);
  
      if (eventIndex !== -1) {
        draft.events[eventIndex] = newEvent;
      } else {
        draft.events.push(newEvent);
      }
    });
    store.next(nextState);
    this.closeDialog();
  }
  
  removeEvent(id?: number) {
    console.log("remove event clicked");
    const nextState = produce(store.getValue(), (draft) => {
      draft.events = draft.events.filter((event) => event.id !== id);
    });
    store.next(nextState);
    this.closeDialog();
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
}

customElements.define("event-table", EventTableComponent);
