import { BehaviorSubject } from "rxjs";

interface Event {
  readonly id: number;
  readonly name: string;
  readonly organization: string;
  readonly date: string;
  readonly address: string;
  readonly location: string;
  readonly age: number;
  readonly tickets: string;
  readonly contact: string;
  readonly img: string;
  readonly xkoordinate: number;
  readonly ykoordinate: number;
}

interface EventsResponse {
  readonly data: Event[];
}

interface Model {
  events: Event[];
  currentEvent?: Event;
  editingState: EditingState;
  favorites: Event[]; // Hinzufügen der favorites-Eigenschaft
}

interface EditingState {
  currentEventId?: number;
  isEditing: boolean;
}

const initialState: Model = {
  events: [],
  editingState: { isEditing: false },
  favorites: [] // Initialisieren der favorites-Eigenschaft
};

const store = new BehaviorSubject<Model>(initialState);

export { Event, EventsResponse, Model, store };
