import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { produce } from "immer";
import L from 'leaflet';

import { EventTableComponent } from "./event-table-component";
import { loadEvents, loadEventsByList } from "../service/event-service";
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
        <label for="eventAddress">Adresse:</label>
        <input type="text" id="eventAddress" required @input=${this.updateSaveButtonState.bind(this)} />
        <br /><br />
        <label for="eventLocation">Ort:</label>
        <input type="text" id="eventLocation" required @input=${this.updateSaveButtonState.bind(this)} />
        <br /><br />
        <label for="eventEinlassalter">Einlassalter:</label>
        <input type="number" id="eventEinlassalter" required @input=${this.updateSaveButtonState.bind(this)} />
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
        <label for="eventXCoordinate">X-Koordinate:</label>
        <input type="number" id="eventXCoordinate" required @input=${this.updateSaveButtonState.bind(this)} step="any" />
        <br /><br />
        <label for="eventYCoordinate">Y-Koordinate:</label>
        <input type="number" id="eventYCoordinate" required @input=${this.updateSaveButtonState.bind(this)} step="any" />
        <br /><br />
        <img id="imagePreview" src="" alt="Image Preview" style="display:none; max-width: 200px;" />
        <br /><br />
        <button type="button" id="addEvent" @click=${this.saveEvent.bind(this)}>Speichern</button>
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
          console.log(img.src)
          img.style.display = 'block';
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  updateSaveButtonState() {
    /*const saveButton = this.shadowRoot.getElementById("addEvent") as HTMLButtonElement | null;
    if (saveButton) {
      const eventName = (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value;
      const organizerName = (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value;
      const eventDate = (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value;
      const eventLocation = (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value;
      const eventAddress = (this.shadowRoot.getElementById("eventAddress") as HTMLInputElement).value;
      const eventEinlassalter = (this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement).value;
      const eventEintrittskarten = (this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement).value;
      const eventKontaktdaten = (this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement).value;
      const eventXCoordinate = Number((this.shadowRoot.getElementById("eventXCoordinate") as HTMLInputElement).value);
      const eventYCoordinate = Number((this.shadowRoot.getElementById("eventYCoordinate") as HTMLInputElement).value);

      saveButton.disabled = !(eventName && organizerName && eventDate && eventLocation && eventAddress && eventEinlassalter && eventEintrittskarten && eventKontaktdaten);
      saveButton.disabled = !(eventName && organizerName && eventDate && eventLocation && eventAddress && eventEinlassalter && eventEintrittskarten && eventKontaktdaten && eventXCoordinate && eventYCoordinate);
    } else {
      console.log("Button nicht gefunden.");
    }*/
  }

  saveEvent() {
    const formData = new FormData();

    const eventName = (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value;
    formData.append("eventName", eventName);
    console.log(eventName);
  
      fetch("/api/events/addEvent", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
  

  clearForm() {
    (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventAddress") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventEinlassalter") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventEintrittskarten") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventKontaktdaten") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventXCoordinate") as HTMLInputElement).value = '';
    (this.shadowRoot.getElementById("eventYCoordinate") as HTMLInputElement).value = '';
    const imgPreview = this.shadowRoot.getElementById("imagePreview") as HTMLImageElement;
    if (imgPreview) {
      imgPreview.src = '';
      imgPreview.style.display = 'none';
    }
    this.updateSaveButtonState();
  }
}

customElements.define("event-hinzufuegen", HinzufuegenComponent);