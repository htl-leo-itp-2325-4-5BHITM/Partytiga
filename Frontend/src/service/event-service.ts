import { Event, Model } from "Model/model"
import {store} from "../model/model"

const EVENTS_URL = "http://localhost:8080/events"

async function loadEvents() {
    const response = await fetch(EVENTS_URL)
    const events: Event[] = await response.json()
    const model: Model = {
        events
    }
    store.next(model);
}
export {loadEvents}