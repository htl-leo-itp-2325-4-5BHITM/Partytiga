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
      <p class="label">Name:</p>
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
      <p class="label">Datum:</p>
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
            //alterEvent(event);
          }}
        >
        <img src="https://www.gardasee.at/images/Feiernde-Leute.jpg" alt="festl">
        <!--<p>${rowImg}</p>-->
          <p>${rowName}</p>
          <!--<p>${rowOrganizer}</p>-->
          <p>${rowDate}</p>
          <!--<p>${rowLocation}</p>-->
        </div>
      `;
    });
    return html`
    <!--<div id="addNewEvent" @click=${() => this.eventClick(null)}>
      <i class="fa-solid"></i>
      <h2>Event hinzufügen</h2>
    </div>-->

    <!--<input
      type="text"
      id="searchbar"
      placeholder="Suchen.."
      @keyup=${() => this.searchEvent(events)}
    />-->

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
            <label for="eventName">Event:</label>
            <input
              type="text"
              id="eventName"
              required
              value="${currentEvent?.name}"
              @input=${() => this.updateSaveButtonState()}
            />

            <br />
            <br />

            <label for="organizerName">Veranstalter:</label>
            <input
              type="text"
              id="organizerName"
              required
              value="${currentEvent?.organization}"
              @input=${() => this.updateSaveButtonState()}
            />

            <br />
            <br />

            <label for="eventDate">Datum:</label>
            <input
              type="date"
              id="eventDate"
              required
              value="${currentEvent?.date}"
              @input=${() => this.updateSaveButtonState()}
            />

            <br />
            <br />

            <label for="eventAddress">Adresse:</label>
            <input
              type="text"
              id="eventAddress"
              required
              value="${currentEvent?.address}"
              @input=${() => this.updateSaveButtonState()}
            />

            <br />
            <br />

            <label for="eventLocation">Ort:</label>
            <input
              type="text"
              id="eventLocation"
              required
              value="${currentEvent?.location}"
              @input=${() => this.updateSaveButtonState()}
            />

            <br />
            <br />

            <label for="eventEinlassalter">Einlassalter:</label>
            <input
              type="number"
              id="eventEinlassalter"
              required
              value="${currentEvent?.age}"
              @input=${() => this.updateSaveButtonState()}
            />

              <br />
              <br />

              <label for="eventEintrittskarten">Eintrittskarten:</label>
              <input
                type="text"
                id="eventEintrittskarten"
                required
                value="${currentEvent?.tickets}"
                @input=${() => this.updateSaveButtonState()}
              />

              <br />
              <br />

              <label for="eventKontaktdaten">Kontaktdaten:</label>
              <input
                type="text"
                id="eventKontaktdaten"
                required
                value="${currentEvent?.contact}"
                @input=${() => this.updateSaveButtonState()}
              />

              <label for="eventXKoordinate">X-Koordinate:</label>
            <input
                type="number"
                id="eventXKoordinate"
                required
                value="${currentEvent?.xkoordinate}"
                @input=${() => this.updateSaveButtonState()}
            />

            <br />
            <br />

            <label for="eventYKoordinate">Y-Koordinate:</label>
            <input
                type="number"
                id="eventYKoordinate"
                required
                value="${currentEvent?.ykoordinate}"
                @input=${() => this.updateSaveButtonState()}
            />


                <br />
                <br />

                <label for="eventImage">Bild hochladen:</label>
                <input type="file" id="eventImage" @change=${this.previewImage.bind(this)} />

                <br />
                <br />

                <img id="imagePreview" src="${currentEvent?.img || ''}" alt="Image Preview" style="display:none; max-width: 200px;" />


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
    `;
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
        const img = this.shadowRoot.getElementById('imagePreview');
        if (img instanceof HTMLImageElement && typeof e.target.result === 'string') {
          img.src = e.target.result;
          img.style.display = 'block';
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  updateSaveButtonState() {
    const saveButton = this.shadowRoot.getElementById("addEvent") as HTMLButtonElement | null;
  
    if (saveButton) {
      const eventName = (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value;
      const organizerName = (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value;
      const eventDate = (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value;
      const eventAddress = (this.shadowRoot.getElementById("eventAddress") as HTMLInputElement).value;
      const eventLocation = (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value;
      const eventEinlassalter = Number((this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement).value);
      const eventEintrittskarten = (this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement).value;
      const eventKontaktdaten = (this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement).value;
      const xKoordinate = Number((this.shadowRoot.getElementById("eventXKoordinate") as HTMLInputElement).value);
      const yKoordinate = Number((this.shadowRoot.getElementById("eventYKoordinate") as HTMLInputElement).value);
  
      saveButton.disabled = !(eventName && organizerName && eventDate && eventLocation && eventAddress && eventEinlassalter && eventEintrittskarten && eventKontaktdaten && xKoordinate && yKoordinate);
    } else {
      console.log("Button nicht gefunden.");
    }
  }

  eventClick(event?: Event) {
    const model = Object.assign({}, store.getValue());
    console.log(model);
    console.log("CurrentEvent", event);
    let clonedEvent: Event = {
        id: undefined,
        name: "",
        organization: "",
        date: "",
        address: "",
        location: "",
        age: null,
        tickets: "",
        contact: "",
        img: "",
        xkoordinate: 0, // Standardwert setzen
        ykoordinate: 0 // Standardwert setzen
    };
    if (event) {
        clonedEvent = { ...event }; // Mit den vorhandenen Koordinaten klonen
    }
    const nextState = produce(model, (draft) => {
        draft.currentEvent = clonedEvent;
    });
    console.log("currentevent model", model.currentEvent);
    store.next(nextState);
    this.openDialog();
    (
        this.shadowRoot.getElementById("eventName") as HTMLInputElement
    ).focus();
}

saveEvent(eventId?: Number) {
  console.log("addEvent start");
  let eventName: string = (
      this.shadowRoot.getElementById("eventName") as HTMLInputElement
  ).value;
  let organizerName: string = (
      this.shadowRoot.getElementById("organizerName") as HTMLInputElement
  ).value;
  let eventDate: string = (
      this.shadowRoot.getElementById("eventDate") as HTMLInputElement
  ).value;
  let eventLocation: string = (
      this.shadowRoot.getElementById("eventLocation") as HTMLInputElement
  ).value;
  let eventAddress: string = (
      this.shadowRoot.getElementById("eventAddress") as HTMLInputElement
  ).value;
  let eventEinlassalter: Number = Number(
      (this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement).value
  );
  let eventEintrittskarten: string = (
      this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement
  ).value;
  let eventKontaktdaten: string = (
      this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement
  ).value;
  let eventImage: string = (
      this.shadowRoot.getElementById("eventImage") as HTMLInputElement
  ).value;
  let xKoordinate: number = (
    this.shadowRoot.getElementById("eventXKoordinate") as HTMLInputElement
  ).valueAsNumber;
  let yKoordinate: number = (
      this.shadowRoot.getElementById("eventYKoordinate") as HTMLInputElement
  ).valueAsNumber;

  console.log("yes");
  
  if (
      eventName != "" &&
      organizerName != "" &&
      eventDate != "" &&
      eventLocation != "" &&
      eventAddress != "" &&
      eventEinlassalter !== null &&
      eventEintrittskarten != "" &&
      eventKontaktdaten != "" &&
      xKoordinate !== null &&
      yKoordinate !== null
  ) {
      const event: Event = {
          id: eventId ?? null,
          name: eventName,
          organization: organizerName,
          date: eventDate,
          location: eventLocation,
          address: eventAddress,
          age: eventEinlassalter,
          tickets: eventEintrittskarten,
          contact: eventKontaktdaten,
          img: eventImage,
          xkoordinate: Number(xKoordinate),
          ykoordinate: Number(yKoordinate)
      };
        fetch("/api/events/updateEvent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Erfolgreiche Datenübertragung ins backend!");
              loadEvents();
            } else {
              console.error("Fehler beim Updaten der Daten.");
            }
          })
          .catch((error) => {
            console.error("Fehler beim Updaten der Daten:", error);
          });
        this.closeDialog();
      } else {
        const event: Event = {
            id: null,
            name: eventName,
            organization: organizerName,
            date: eventDate,
            location: eventLocation,
            address: eventAddress,
            age: eventEinlassalter,
            tickets: eventEintrittskarten,
            contact: eventKontaktdaten,
            img: eventImage,
            xkoordinate: 0, // Standardwert setzen
            ykoordinate: 0 // Standardwert setzen
        };
        
        fetch("/api/events/addEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        })
        .then((response) => {
            console.log(response);
            if (response.ok) {
                console.log("Erfolgreiche Datenübertragung ins backend!");
                loadEvents();
            } else {
                console.error("Fehler beim Speichern der Daten.");
            }
        })
        .catch((error) => {
            console.error("Fehler beim Speichern der Daten:", error);
        });
    }
    this.closeDialog();
  }
  
  
  removeEvent(eventId: Number) {
    console.log(eventId);
    fetch(`/api/events/removeEvent/${eventId}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Event wurde erfolgreich gelöscht.");
          loadEvents();
        } else {
          console.error("Fehler beim Löschen des Events.");
        }
      })
      .catch((error) => {
        console.error("Fehler beim Löschen des Events.", error);
      });
    this.closeDialog();
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
