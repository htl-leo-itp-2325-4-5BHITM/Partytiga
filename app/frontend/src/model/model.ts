import { BehaviorSubject } from "rxjs";

interface Event {
  readonly id: Number;
  readonly name: string;
  readonly organization: string;
  readonly date: string;
  readonly location: string;
}

interface EventsResponse {
  readonly data: Event[];
}

export interface Model {
  events: Event[],
}
const initialState: Model = {
  events: [],
};
const store = new BehaviorSubject<Model>(initialState);

export { Event, EventsResponse, store };
