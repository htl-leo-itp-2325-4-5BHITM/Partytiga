import {Event} from "../../model/model"

class EventTableComponent extends HTMLElement {
    connectedCallback() {
        console.log("EventTable loaded")
    }
}
customElements.define("event-table", EventTableComponent)