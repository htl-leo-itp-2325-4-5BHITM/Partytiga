import { html, render } from "lit-html";

const template = (events: Event[]) => {
  
  return html`
  <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <i class="fa-regular fa-rectangle-xmark" id="close"></i>
        <form id="eventForm">
          <label for="eventName">Name des Events:</label>
          <input type="text" id="eventName" required />

          <br />
          <br />

          <label for="organizerName">Name des Veranstalters:</label>
          <input type="text" id="organizerName" required />

          <br />
          <br />

          <label for="eventDate">Datum:</label>
          <input type="date" id="eventDate" required />

          <br />
          <br />

          <label for="eventLocation">Adresse:</label>
          <input type="text" id="eventLocation" required />

          <br />
          <br />

          <button type="button" id="addEvent">Speichern</button>
          <button type="button">Löschen</button>
        </form>
      </div>
    </div>
  `
};

class ModalComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      console.log("Modal Dialog loaded");
    }
    render(events: Event[]) {
      console.log("render", events);
      render(template(events), this.shadowRoot);
    }
  }
  customElements.define("modal-dialog", ModalComponent);