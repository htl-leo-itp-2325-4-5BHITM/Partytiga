import {Event, store} from "../model/model"
import {html, render} from "lit-html"
import { updateEvent, removeEvent } from "../index"


const rowTemplate = (event: Event) => html`
<div>
<tr>
    <td>${event.name}</td>
    <td>${event.organization}</td>
    <td>${event.date}</td>
    <td>${event.location}</td>
</tr>
    <button @click=${() => removeEvent(event.id)}>remove</button>
    <button id="openModalButton" @click=${() => updateEvent(event.id,event)}>edit</button>
</div>
`
const template = (events: Event[]) => {
    const rows = events.map(rowTemplate)
    return html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<table class="w3-table w3-striped w3-bordered">
    <caption>Events</caption>
    <thead>
        <tr>
        <td>Name</td>
        <td>Organizer</td>
        <td>Date</td>
        <td>Location</td>
        </tr>
    </thead>
    <tbody>
        ${rows}
    </tbody>
</table>
`
}
class EventTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        console.log("EventTable loaded")
        store.subscribe(model => {
            this.render(model.events)
        })
    }
    render(events: Event[]) {
        console.log("render", events)
        render(template(events), this.shadowRoot)
    }
}
customElements.define("event-table", EventTableComponent)
