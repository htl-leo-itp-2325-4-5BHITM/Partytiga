import {BehaviorSubject} from "rxjs"

interface Event {
    eventName:string,
    organizerName:string,
    eventDate:string,
    eventLocation:string
}

interface EventsResponse {
    data: Event[]
}

export interface Model {
    events: Event[]
}
const initialState: Model = {
    events: []
}
const store = new BehaviorSubject<Model>(initialState)

export { Event, EventsResponse, store }