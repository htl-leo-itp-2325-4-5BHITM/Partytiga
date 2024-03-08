import { Event, Model } from "Model/model";
import { store } from "../model/model";
import { produce } from "immer";

const EVENTS_URL = "/api/events";

async function loadEvents() {
  const response = await fetch(EVENTS_URL);

  console.log("API response:", response);
  const events: Event[] = await response.json();
  const nextState = produce(store.getValue(), (model) => {
    model.events = events;
  });
  store.next(nextState);
}

async function loadEventsByList(searchString: string, events) {
  const response = await fetch(`${EVENTS_URL}/searchEvents/${searchString}`);
  const filteredEvents: Event[] = await response.json();
  const next = produce(store.getValue(), (model) => {
    model.events = filteredEvents;
  });
  store.next(next);
}

export { loadEvents, loadEventsByList };
