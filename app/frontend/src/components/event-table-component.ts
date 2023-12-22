import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { updateEvent, removeEvent, alterEvent } from "../index";
//addEvent

const nameTemplate = (event: Event) => html`
  <div class="rowName" @click=${() => alterEvent(event)}>
    <p class="label">Name:</p><p class="output">${event.name}</p>
  </div>
`;

const organizerTemplate = (event: Event) => html`
  <div class="rowOrganizer" @click=${() => alterEvent(event)}>
    <p class="label">Organizer:</p><p class="output">${event.organization}</p>
  </div>
`;

const dateTemplate = (event: Event) => html`
  <div class="rowDate" @click=${() => alterEvent(event)}>
    <p class="label">Date:</p><p class="output">${event.date}</p>
  </div>
`;

const locationTemplate = (event: Event) => html`
  <div class="rowLocation" @click=${() => alterEvent(event)}>
    <p class="label">Location:</p><p class="output">${event.location}</p>
  </div>
`;

const template = (events: Event[]) => {
  const eventBoxes = events.map((event) => {
    const rowName = nameTemplate(event);
    const rowOrganizer = organizerTemplate(event);
    const rowDate = dateTemplate(event);
    const rowLocation = locationTemplate(event);

    return html`
      <div id="eventBox">
          <p>${rowName}</p>
          <p>${rowOrganizer}</p>
          <p>${rowDate}</p>
          <p>${rowLocation}</p>
      </div>
    `;
  });
  return html`
    <h3>Events</h3>
    <div id="events">
      ${eventBoxes}
    </div>

    <style>
      h3 {
        font-size: 4vh;
        text-align:center;
        margin-top: 10vh;
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
      .rowName, .rowOrganizer, .rowDate, .rowLocation{
        display: flex;
        height: 3vh;
      }
      .label{
        text-transform: uppercase;
        width: 7vw;
        margin-top: 0;
      }
      .output{
        margin-top: 0;
      }
    </style>
  `;
};


/*
const rowTemplate = (event: Event) => html`
  <tr class="tableRow" @click=${() => alterEvent(event)}>
    <td>${event.name}</td>
    <td>${event.organization}</td>
    <td>${event.date}</td>
    <td>${event.location}</td>
  </tr>
`;
*/

/*
const divTemplate = (event: Event) => html`
<div class="tableRow" @click=${() => alterEvent(event)}>
      <h4>${event.name}</h4>
      <h4>${event.organization}</h4>
      <h4>${event.date}</h4>
      <h4>${event.location}</h4>
    </div>
`;
*/

/**
 * <button @click=${() => removeEvent(event.id)}>remove</button>
  <button
    id="openUpdateModalButton"
    @click=${() => updateEvent(event.id, event)}>edit</button> 
 */

    /*
const template = (events: Event[]) => {
  const rows = events.map(rowTemplate);
  return html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />

    <style>
      .tableRow {
        cursor: pointer;
      }
    </style>

    <table class="w3-table w3-striped w3-bordered w3-hoverable">
      <caption>
        <h3>Events</h3>
      </caption>
      <thead class="w3-light-grey">
        <tr>
          <td><h4>Name</h4></td>
          <td><h4>Organizer</h4></td>
          <td><h4>Date</h4></td>
          <td><h4>Location</h4></td>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};
*/





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
  }
}
customElements.define("event-table", EventTableComponent);
