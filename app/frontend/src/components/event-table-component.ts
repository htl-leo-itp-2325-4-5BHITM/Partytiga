import { Event, store } from "../model/model";
import { html, render } from "lit-html";
import { updateEvent, removeEvent, alterEvent } from "../index";
//addEvent

const rowTemplate = (event: Event) => html`
  <tr class="tableRow" @click=${() => alterEvent(event)}>
    <td>${event.name}</td>
    <td>${event.organization}</td>
    <td>${event.date}</td>
    <td>${event.location}</td>
  </tr>
`;

/**
 * <button @click=${() => removeEvent(event.id)}>remove</button>
  <button
    id="openUpdateModalButton"
    @click=${() => updateEvent(event.id, event)}>edit</button> 
 */

const template = (events: Event[]) => {
  const rows = events.map(rowTemplate);
  return html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />

    <style>
    
      .tableRow{
        cursor:pointer;
      }
    
    </style>

    <table class="w3-table w3-striped w3-bordered w3-hoverable">
      <caption>
        <h2>Events</h2>
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
