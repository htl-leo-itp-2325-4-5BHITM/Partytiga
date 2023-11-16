import {BehaviorSubject} from "rxjs"

interface Event {
    readonly eventName:string,
    readonly organizerName:string,
    readonly eventDate:string,
    readonly eventLocation:string
}

interface EventsResponse {
    readonly data: Event[]
}

export interface Model {
    events: Event[]
}
const initialState: Model = {
    events: []
}
const store = new BehaviorSubject<Model>(initialState)

export { Event, EventsResponse, store }