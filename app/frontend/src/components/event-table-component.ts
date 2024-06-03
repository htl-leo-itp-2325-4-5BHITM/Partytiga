import { loadEvents, loadEventsByList } from "../service/event-service";
import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { produce } from "immer";

export class EventTableComponent extends HTMLElement {
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
      <!--<p class="label">Datum:</p>
      <p class="output">${event.date}</p>-->
    </div>
  `;

  locationTemplate = (event: Event) => html`
    <div class="rowLocation">
      <!--<p class="label">Adresse:</p>
      <p class="output">${event.location}</p>-->
    </div>
  `;

  template(events: Event[], currentEvent: Event) {
    const eventBoxes = events.map((event) => {
      const rowName = this.nameTemplate(event);
      const rowOrganizer = this.organizerTemplate(event);
      const rowDate = this.dateTemplate(event);
      const rowLocation = this.locationTemplate(event);

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
          <p>${rowName}</p>
          <p>${rowOrganizer}</p>
          <!--<p>${rowDate}</p>
          <p>${rowLocation}</p>-->
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
              value="${currentEvent?.location}"
              @input=${() => this.updateSaveButtonState()}
            />

            <br />
            <br />

            <label for="eventOrt">Ort:</label>
            <input
              type="text"
              id="eventOrt"
              required
              value="${currentEvent?.address}"
              @input=${() => this.updateSaveButtonState()}
            />

            <br />
            <br />

            <label for="eventEinlassalter">Einlassalter:</label>
            <input
              type="text"
              id="eventEinlassalter"
              required
              value="${currentEvent?.einlassalter}"
              @input=${() => this.updateSaveButtonState()}
            />

              <br />
              <br />

              <label for="eventEintrittskarten">Eintrittskarten:</label>
              <input
                type="text"
                id="eventEintrittskarten"
                required
                value="${currentEvent?.eintrittskarten}"
                @input=${() => this.updateSaveButtonState()}
              />

              <br />
              <br />

              <label for="eventKontaktdaten">Kontaktdaten:</label>
              <input
                type="text"
                id="eventKontaktdaten"
                required
                value="${currentEvent?.kontaktdaten}"
                @input=${() => this.updateSaveButtonState()}
              />

                <br />
                <br />

                <label for="eventImage">Bild hochladen:</label>
                <input type="file" id="eventImage" @change=${this.previewImage.bind(this)} />

                <br />
                <br />

                <img id="imagePreview" src="${currentEvent?.image || ''}" alt="Image Preview" style="display:none; max-width: 200px;" />


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
        </div>
      </div>
    `;
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

  
  closeDialog() {
    console.log("close dialog");
    this.shadowRoot.getElementById("myModal").classList.remove("open");
  }

  updateSaveButtonState() {
    const saveButton = this.shadowRoot.getElementById("addEvent") as HTMLButtonElement | null;
  
    if (saveButton) {
      const eventName = (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value;
      const organizerName = (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value;
      const eventDate = (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value;
      const eventAddress = (this.shadowRoot.getElementById("eventAddress") as HTMLInputElement).value;
      const eventLocation = (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value;
      const eventEinlassalter = (this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement).value;
      const eventEintrittskarten = (this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement).value;
      const eventKontaktdaten = (this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement).value;
  
      saveButton.disabled = !(eventName && organizerName && eventDate && eventLocation && eventAddress && eventEinlassalter && eventEintrittskarten && eventKontaktdaten);
    }  else {
      console.log("Button nicht gefunden.");
    }
  }
  

  openDialog() {
    console.log("open dialog");
    this.shadowRoot.getElementById("myModal").classList.add("open");
    
  }

  eventClick(event?: Event) {
    const model = Object.assign({}, store.getValue());
    console.log(model)
    console.log("CurrentEvent", event)
    let clonedEvent: Event = {
      id: undefined,
      name: "",
      organization: "",
      date: "",
      address: "",
      location: "",
      einlassalter: "",
      eintrittskarten: "",
      kontaktdaten: "",
      image: ""
    };
    if (event) {
      clonedEvent = Object.assign({}, event);
    }
    const nextState = produce(model, (draft) => {
      model.currentEvent = clonedEvent;
    });
    console.log("currentevent model",model.currentEvent)
    store.next(nextState);
    this.openDialog();
    (
      this.shadowRoot.getElementById("eventName") as HTMLInputElement
    ).focus()
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
    let eventEinlassalter: string = (
      this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement
    ).value;
    let eventEintrittskarten: string = (
      this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement
    ).value;
    let eventKontaktdaten: string = (
      this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement
    ).value;
    let eventImage: string = (
      this.shadowRoot.getElementById("eventImage") as HTMLInputElement
    ).value;
    
    console.log("yes");
    
    if (
      eventName != "" &&
      organizerName != "" &&
      eventDate != "" &&
      eventLocation != "" &&
      eventAddress != "" &&
      eventEinlassalter != "" &&
      eventEintrittskarten != "" &&
      eventKontaktdaten != ""
    ) {
      if (eventId != null) {
        const event: Event = {
          id: eventId,
          name: eventName,
          organization: organizerName,
          date: eventDate,
          location: eventLocation,
          address: eventAddress,
          einlassalter: eventEinlassalter,
          eintrittskarten: eventEintrittskarten,
          kontaktdaten: eventKontaktdaten,
          image: eventImage
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
          einlassalter: eventEinlassalter,
          eintrittskarten: eventEintrittskarten,
          kontaktdaten: eventKontaktdaten,
          image: eventImage
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
    } else {
      console.log("no");
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
  }

}

customElements.define("event-table", EventTableComponent);
