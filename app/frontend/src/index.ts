import { Event, EventsResponse } from "./model/model";
import "./components/event-table-component";
import { loadEvents } from "./service/event-service";

const addEventButton = document.getElementById("addEvent") as HTMLButtonElement;
  addEventButton.addEventListener("click", addEvent);

/*
const removeEventButton = document.getElementById(
  "removeEvent"
) as HTMLButtonElement;
removeEventButton.addEventListener("click", removeEvent);*/

const loadEventsButton = document.getElementById(
  "loadEvents"
) as HTMLButtonElement;
loadEventsButton.addEventListener("click", loadEvents);

const successBox = document.getElementById("success");
const errorBox = document.getElementById("error");

loadEvents();

function addEvent() {
  let eventName: string = (
    document.getElementById("eventName") as HTMLInputElement
  ).value;
  let organizerName: string = (
    document.getElementById("organizerName") as HTMLInputElement
  ).value;
  let eventDate: string = (
    document.getElementById("eventDate") as HTMLInputElement
  ).value;
  let eventLocation: string = (
    document.getElementById("eventLocation") as HTMLInputElement
  ).value;

  console.log("yes");

  if (
    eventName != "" &&
    organizerName != "" &&
    eventDate != "" &&
    eventLocation != ""
  ) {
    const event: Event = {
      name: eventName,
      organization: organizerName,
      date: eventDate,
      location: eventLocation,
    };
    console.log(event);

    fetch("/api/events/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Erfolgreiche Datenübertragung ins backend!");
          (
            document.getElementById("eventName") as HTMLInputElement
          ).value = "";
          (
            document.getElementById("organizerName") as HTMLInputElement
          ).value = "";
          (
            document.getElementById("eventDate") as HTMLInputElement
          ).value = "";
          (
            document.getElementById("eventLocation") as HTMLInputElement
          ).value = "";
          loadEvents()
        } else {
          console.error("Fehler beim Speichern der Daten.");
        }
      })
      .catch((error) => {
        console.error("Fehler beim Speichern der Daten:", error);
      });
  } else {
    console.log("no");
  }
}

function removeEvent() {
  fetch("http://localhost:3000/removeEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Event wurde erfolgreich gelöscht.");
        loadEvents();
      } else {
        console.error("Fehler beim Löschen des Events.");
      }
    })
    .catch((error) => {
      console.error("Fehler beim Löschen des Events.", error);
    });
}
