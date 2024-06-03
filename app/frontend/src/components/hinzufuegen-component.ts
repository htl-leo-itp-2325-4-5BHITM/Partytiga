import { loadEvents, loadEventsByList } from "../service/event-service";
import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { produce } from "immer";

import { EventTableComponent } from "./event-table-component";

export class HinzufuegenComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    console.log("hinzufuegen connected");
    this.render();
  }

  render() {
    console.log("hinzufuegen component loaded");
    render(this.displayContent(), this.shadowRoot);
  }

  displayContent() {
    return html`
      <h2>Event hinzufügen</h2>

      <form id="eventForm">
        <label for="eventName">Name des Events:</label>
        <input type="text" id="eventName" required @input=${this.updateSaveButtonState.bind(this)} />

        <br /><br />

        <label for="organizerName">Veranstalter:</label>
        <input type="text" id="organizerName" required @input=${this.updateSaveButtonState.bind(this)} />

        <br /><br />

        <label for="eventDate">Datum:</label>
        <input type="date" id="eventDate" required @input=${this.updateSaveButtonState.bind(this)} />

        <br /><br />

        <label for="eventLocation">Adresse:</label>
        <input type="text" id="eventLocation" required @input=${this.updateSaveButtonState.bind(this)} />

        <br /><br />

        <label for="eventOrt">Ort:</label>
        <input type="text" id="eventOrt" required @input=${this.updateSaveButtonState.bind(this)} />

        <br /><br />

        <label for="eventEinlassalter">Einlassalter:</label>
        <input type="text" id="eventEinlassalter" required @input=${this.updateSaveButtonState.bind(this)} />

        <br /><br />

        <label for="eventEintrittskarten">Eintrittskarten:</label>
        <input type="text" id="eventEintrittskarten" required @input=${this.updateSaveButtonState.bind(this)} />

        <br /><br />

        <label for="eventKontaktdaten">Kontaktdaten:</label>
        <input type="text" id="eventKontaktdaten" required @input=${this.updateSaveButtonState.bind(this)} />

        <br /><br />

        <label for="eventImage">Bild hochladen:</label>
        <input type="file" id="eventImage" @change=${this.previewImage.bind(this)} />

        <br /><br />

        <img id="imagePreview" src="" alt="Image Preview" style="display:none; max-width: 200px;" />

        <br /><br />

        <button type="button" id="addEvent" @click=${this.saveEvent.bind(this)} disabled>Speichern</button>
      </form>
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

  updateSaveButtonState() {
    const saveButton = this.shadowRoot.getElementById("addEvent") as HTMLButtonElement | null;
    if (saveButton) {
      const eventName = (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value;
      const organizerName = (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value;
      const eventDate = (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value;
      const eventLocation = (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value;
      const eventOrt = (this.shadowRoot.getElementById("eventOrt") as HTMLInputElement).value;
      const eventEinlassalter = (this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement).value;
      const eventEintrittskarten = (this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement).value;
      const eventKontaktdaten = (this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement).value;

      saveButton.disabled = !(eventName && organizerName && eventDate && eventLocation && eventOrt && eventEinlassalter && eventEintrittskarten && eventKontaktdaten);
    } else {
      console.log("Button nicht gefunden.");
    }
  }

  saveEvent() {
    const eventName = (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value;
    const organizerName = (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value;
    const eventDate = (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value;
    const eventLocation = (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value;
    const eventOrt = (this.shadowRoot.getElementById("eventOrt") as HTMLInputElement).value;
    const eventEinlassalter = (this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement).value;
    const eventEintrittskarten = (this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement).value;
    const eventKontaktdaten = (this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement).value;
    const eventImage = (this.shadowRoot.getElementById("imagePreview") as HTMLImageElement).src;

    if (eventName && organizerName && eventDate && eventLocation && eventOrt && eventEinlassalter && eventEintrittskarten && eventKontaktdaten) {
      const event: Event = {
        id: null,
        name: eventName,
        organization: organizerName,
        date: eventDate,
        address: eventLocation,
        location: eventOrt,
        einlassalter: eventEinlassalter,
        eintrittskarten: eventEintrittskarten,
        kontaktdaten: eventKontaktdaten,
        image: eventImage,
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
            console.log("Erfolgreiche Datenübertragung ins Backend!");
            loadEvents();
            this.clearForm();
          } else {
            console.error("Fehler beim Speichern der Daten.");
          }
        })
        .catch((error) => {
          console.error("Fehler beim Speichern der Daten:", error);
        });
    }
  }

  clearForm() {
    (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventOrt") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement).value = '';
    const imgPreview = this.shadowRoot.getElementById("imagePreview") as HTMLImageElement;
    if (imgPreview) {
      imgPreview.src = '';
      imgPreview.style.display = 'none';
    }

    this.updateSaveButtonState();
  }
}

customElements.define("event-hinzufuegen", HinzufuegenComponent);
