import {Event, store} from "../model/model"

class EventTableComponent extends HTMLElement {
    connectedCallback() {
        console.log("EventTable loaded")
        store.subscribe(model => {
            console.log("data changed", model)
            this.render(model.events)
        })
    }
    render(events: Event[]) {
        console.log("events to render", events)
    }
}
customElements.define("event-table", EventTableComponent)