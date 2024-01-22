import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { updateEvent, removeEvent, alterEvent } from "../index";

require('react-dom')

let loadedEvents: Event[];

const nameTemplate = (event: Event) => html`
  <div class="rowName" @click=${() => alterEvent(event)}>
    <p class="label">Name:</p>
    <p class="output">${event.name}</p>
  </div>
`;

const organizerTemplate = (event: Event) => html`
  <div class="rowOrganizer" @click=${() => alterEvent(event)}>
    <p class="label">Veranstalter:</p>
    <p class="output">${event.organization}</p>
  </div>
`;

const dateTemplate = (event: Event) => html`
  <div class="rowDate" @click=${() => alterEvent(event)}>
    <p class="label">Datum:</p>
    <p class="output">${event.date}</p>
  </div>
`;

const locationTemplate = (event: Event) => html`
  <div class="rowLocation" @click=${() => alterEvent(event)}>
    <p class="label">Adresse:</p>
    <p class="output">${event.location}</p>
  </div>
`;

const template = (events: Event[]) => {
  const eventBoxes = events.map((event) => {
    const rowName = nameTemplate(event);
    const rowOrganizer = organizerTemplate(event);
    const rowDate = dateTemplate(event);
    const rowLocation = locationTemplate(event);

    return html`
      <div id="eventBox" @click=${() => alterEvent(event)}>
        <p>${rowName}</p>
        <p>${rowOrganizer}</p>
        <p>${rowDate}</p>
        <p>${rowLocation}</p>
      </div>
    `;
  });
  return html`
    <h3>Events</h3>
    <div id="events">${eventBoxes}</div>

    <style>
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
  `;
};

class EventTableComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    console.log("EventTable loaded");
    store.subscribe((model) => {
      this.render(model.events);
    });
  }
  render(events: Event[]) {
    console.log("render", events);
    render(template(events), this.shadowRoot);
    loadedEvents = events;
  }
}
customElements.define("event-table", EventTableComponent);

function searchEvent(searchString: string) {
  console.log("search " + searchString);
  if (searchString !== "") {
    let events: Event[] = [];
    searchString = searchString.toLowerCase()
    loadedEvents.forEach((searchedEvent) => {
      searchedEvent = searchedEvent as Event;
      //console.log(searchedEvent);
      if (
        searchedEvent.name.toLowerCase().includes(searchString) ||
        searchedEvent.organization.toLowerCase().includes(searchString) ||
        searchedEvent.location.toLowerCase().includes(searchString) ||
        searchedEvent.date.toLowerCase().includes(searchString)
      ) {
        events.push(searchedEvent);
      }
    });
    console.log(events)
  }
}

export { searchEvent };
