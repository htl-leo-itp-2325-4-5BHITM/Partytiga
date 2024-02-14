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
            // alterEvent(event);
          }}
        >
          <p>${rowName}</p>
          <p>${rowOrganizer}</p>
          <p>${rowDate}</p>
          <p>${rowLocation}</p>
        </div>
      `;
    });
    return html`
      <style>
        /* add button*/
        #addNewEvent {
          cursor: pointer;
          position: absolute;
          display: grid;
          text-align: center;
          grid-template-columns: 20% 80%;
          width: 10vw;
          background: rgb(80, 0, 154);
          border-radius: 1vh;
          color: white;
          padding: 1vw 2vh;
          margin-left: 85%;
          margin-top: -10%;
          box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
          transition: background-color 0.6s ease;
          overflow: hidden;
          border-color: none;
        }

        #addNewEvent:hover {
          background: rgba(80, 0, 154, 0.781);
        }

        #addNewEvent > h2 {
          margin: 0;
          font-size: medium;
        }

        h3 {
          font-size: 4vh;
          text-align: center;
          margin-top: 5vh;
          margin-bottom: 0;
        }
        #events {
          width: 80vw;
          display: flex;
          flex-wrap: wrap;
          margin: auto;
          margin-top: 0;
        }
        #eventBox {
          width: 30vw;
          border: 1px black solid;
          padding: 2vh 2vw;
          margin: 5vh 2.5vw;
          border-radius: 1vh;
          cursor: pointer;
        }
        .rowName,
        .rowOrganizer,
        .rowDate,
        .rowLocation {
          display: flex;
          height: 3vh;
        }
        .label {
          text-transform: uppercase;
          width: 9vw;
          margin-top: 0;
        }
        .output {
          margin-top: 0;
        }
      </style>
      <div id="addNewEvent" @click=${() => this.eventClick(null)}>
        <i class="fa-solid fa-plus"></i>
        <h2>Event hinzufügen</h2>
      </div>

      <input
        type="text"
        id="searchbar"
        placeholder="Suchen.."
        @keyup=${() => this.searchEvent(events)}
      />

      <style>
        input,
        button {
          border-radius: 5px;
          border: solid rgb(62, 62, 62) 1px;
          padding: 0.3rem;
          color: rgb(80, 0, 154);
        }

        input {
          color: #000;
        }

        button {
          cursor: pointer;
        }
        .modal {
          display: none; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          padding-top: 100px; /* Location of the box */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0, 0, 0); /* Fallback color */
          background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
        }
        .modal.open {
          display: block;
        }

        /* Modal Content */
        .modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 5vh 3vw;
          border: 1px solid #888;
          width: 30vw;
          border-radius: 10px;
        }

        /* modal form*/
        form {
          width: 100%;
          margin: auto;
          text-align: left;
        }

        /* modal labels*/
        form label {
          display: block;
          font-size: 1.7vh;
          text-transform: uppercase;
          margin-bottom: 1vh;
        }

        /* modal inputs*/

        form #eventName,
        #organizerName,
        #eventLocation {
          width: 80%;
          background-color: rgb(242, 242, 242);
          border-color: rgb(242, 242, 242);
          padding: 1vh 0.5vw;
          margin-bottom: 1vh;
        }

        form #eventDate {
          background-color: rgb(242, 242, 242);
          border-color: rgb(242, 242, 242);
          margin-bottom: 1vh;
        }

        /* button box */
        #buttonBox {
          display: flex;
        }

        #searchbar {
          margin-left: 12%;
        }

        /* close button */
        #close {
          color: rgb(80, 0, 154);
          margin-left: 96%;
          font-size: x-large;
          cursor: pointer;
        }

        #close:hover {
          color: rgba(80, 0, 154, 0.781);
        }

        /* save and update button*/
        .saveButton {
          width: 7vw;
          background: rgb(80, 0, 154);
          border-radius: 1vh;
          color: white;
          padding: 0.6vw 1.4vh;
          margin-top: 1vh;
          box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
          transition: background-color 0.6s ease;
          overflow: hidden;
          border-color: none;
          display: none;
        }

        .saveButton:hover {
          background: rgba(80, 0, 154, 0.781);
        }

        .saveButton.show {
          display: block;
        }

        /* delete button*/
        .deleteButton {
          width: 7vw;
          background: rgb(80, 0, 154);
          border-radius: 1vh;
          color: white;
          padding: 0.6vw 1.4vh;
          margin-top: 1vh;
          box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
          transition: background-color 0.6s ease;
          overflow: hidden;
          border-color: none;
        }

        .deleteButton:hover {
          background: rgb(80, 0, 154);
        }

        .close {
          color: #aaaaaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }
      </style>

      <h3>Events</h3>
      <div id="events">${eventBoxes}</div>

      <div id="myModal" class="modal">
        <div class="modal-content">
          <i
            class="fa-regular fa-rectangle-xmark"
            id="close"
            @click=${() => this.closeDialog()}
            >x</i
          >
          <form id="eventForm">
            <label for="eventName">Name des Events:</label>
            <input
              type="text"
              id="eventName"
              required
              value="${currentEvent?.name}"
            />

            <br />
            <br />

            <label for="organizerName">Name des Veranstalters:</label>
            <input
              type="text"
              id="organizerName"
              required
              value="${currentEvent?.organization}"
            />

            <br />
            <br />

            <label for="eventDate">Datum:</label>
            <input
              type="date"
              id="eventDate"
              required
              value="${currentEvent?.date}"
            />

            <br />
            <br />

            <label for="eventLocation">Adresse:</label>
            <input
              type="text"
              id="eventLocation"
              required
              value="${currentEvent?.location}"
            />

            <br />
            <br />

            <button
              type="button"
              id="addEvent"
              @click=${() => this.saveEvent(currentEvent?.id)}
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
  closeDialog() {
    console.log("close dialog");
    this.shadowRoot.getElementById("myModal").classList.remove("open");
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
      location: "",
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
    console.log("yes");

    if (
      eventName != "" &&
      organizerName != "" &&
      eventDate != "" &&
      eventLocation != ""
    ) {
      if (eventId != null) {
        const event: Event = {
          id: eventId,
          name: eventName,
          organization: organizerName,
          date: eventDate,
          location: eventLocation,
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
}

customElements.define("event-table", EventTableComponent);
