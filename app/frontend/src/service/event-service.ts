import { Event, Model } from "Model/model"
import {store} from "../model/model"
import { produce } from "immer"

const EVENTS_URL = "http://localhost:4200/api/events"

async function loadEvents() {
    const response = await fetch(EVENTS_URL)
    const events: Event[] = await response.json()
    const model: Model = {
        events
    }
    const next = produce(store.getValue(), model => {
        model.events = events
    })
    store.next(next);
}
export { loadEvents }