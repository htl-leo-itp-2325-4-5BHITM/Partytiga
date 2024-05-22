import { html, render } from "lit-html";
import { produce } from "immer";
import { store, Event } from "../model/model";
import { loadEvents } from "../service/event-service";

export class AddNewEventComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this.render();
    this.addStyles();
  }

  render() {
    render(this.template(), this.shadowRoot);
  }

  template() {
    return html`
      <div id="addNewEvent" @click=${() => this.openDialog()}>
        <i class="fa-solid"></i>
        <h2>Event hinzufügen</h2>
      </div>

      <div id="myModal" class="modal">
        <div class="modal-content">
          <div id="closeBox">
            <i
              class="fa-regular fa-rectangle-xmark"
              id="close"
              @click=${() => this.closeDialog()}
            ><img id="pfeil" src="../../img/pfeil.png"></i>
            <p>Details</p>
          </div>
          <form id="eventForm">
            <label for="eventName">Event:</label>
            <input type="text" id="eventName" required @input=${() => this.updateSaveButtonState()} />

            <br /><br />

            <label for="organizerName">Veranstalter:</label>
            <input type="text" id="organizerName" required @input=${() => this.updateSaveButtonState()} />

            <br /><br />

            <label for="eventDate">Datum:</label>
            <input type="date" id="eventDate" required @input=${() => this.updateSaveButtonState()} />

            <br /><br />

            <label for="eventLocation">Adresse:</label>
            <input type="text" id="eventLocation" required @input=${() => this.updateSaveButtonState()} />

            <br /><br />

            <button type="button" id="addEvent" @click=${() => this.saveEvent()} disabled>Speichern</button>
          </form>
        </div>
      </div>
    `;
  }

  openDialog() {
    this.shadowRoot.getElementById("myModal").classList.add("open");
  }

  closeDialog() {
    this.shadowRoot.getElementById("myModal").classList.remove("open");
  }

  updateSaveButtonState() {
    const saveButton = this.shadowRoot.getElementById("addEvent") as HTMLButtonElement | null;

    if (saveButton) {
      const eventName = (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value;
      const organizerName = (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value;
      const eventDate = (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value;
      const eventLocation = (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value;

      saveButton.disabled = !(eventName && organizerName && eventDate && eventLocation);
    }  else {
      console.log("Button nicht gefunden.");
    }
  }

  saveEvent() {
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

    if (
        eventName != "" &&
        organizerName != "" &&
        eventDate != "" &&
        eventLocation != ""
      ) {
        const event: Event = {
            id: null,
            name: eventName,
            organization: organizerName,
            date: eventDate,
            location: eventLocation,
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
                this.clearForm(); 
              } else {
                console.error("Fehler beim Speichern der Daten.");
              }
            })
            .catch((error) => {
              console.error("Fehler beim Speichern der Daten:", error);
            });
        } this.closeDialog();
    }

    clearForm() {
        (this.shadowRoot.getElementById("eventName") as HTMLInputElement).value = '';
        (this.shadowRoot.getElementById("organizerName") as HTMLInputElement).value = '';
        (this.shadowRoot.getElementById("eventDate") as HTMLInputElement).value= '';
        (this.shadowRoot.getElementById("eventLocation") as HTMLInputElement).value = '';
        this.updateSaveButtonState();
      }

  addStyles() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "../../styles/event-table-style.css");
    this.shadowRoot.appendChild(linkElem);
  }
}

customElements.define("add-new-event", AddNewEventComponent);
