import { BehaviorSubject } from "rxjs";

interface Event {
  readonly id: Number;
  readonly name: string;
  readonly organization: string;
  readonly date: string;
  readonly address: string;
  readonly location: string;
  readonly einlassalter: string;
  readonly eintrittskarten: string;
  readonly kontaktdaten: string;
  readonly image: string;
}

interface EventsResponse {
  readonly data: Event[];
}

interface Model {
  events: Event[];
  currentEvent?: Event
  editingState: EditingState
}

interface EditingState {
  currentEventId?: number;
  isEditing: boolean
}

const initialState: Model = {
  events: [],
  editingState: undefined
};

const store = new BehaviorSubject<Model>(initialState);

export { Event, EventsResponse, Model, store };
