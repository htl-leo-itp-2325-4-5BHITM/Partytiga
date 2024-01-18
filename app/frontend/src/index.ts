import { Event, EventsResponse } from "./model/model";
import "./components/event-table-component";
import { loadEvents } from "./service/event-service";
import { animationFrameScheduler } from "rxjs";

const eventNameField = document.getElementById("eventName") as HTMLInputElement;
const eventOrganizerField = document.getElementById("organizerName") as HTMLInputElement;
const eventDateField = document.getElementById("eventDate") as HTMLInputElement;
const eventLocationField = document.getElementById("eventLocation") as HTMLInputElement;

const addEventButton = document.getElementById("addEvent") as HTMLButtonElement;
addEventButton.addEventListener("click", addEvent);

const updateEventButton = document.getElementById("updateEvent") as HTMLButtonElement;

const removeEventButton = document.getElementById("removeEvent") as HTMLButtonElement;

const modal = document.getElementById("myModal");

//add modal
const closeButton = document.getElementById("close");
closeButton.addEventListener("click", closeModal);

const openModalButton = document.getElementById("addNewEvent");
openModalButton.addEventListener("click", openNewEvent);

const searchBar = document.getElementById("searchbar");
searchBar.addEventListener("keyup", searchEvent);

loadEvents();

function openNewEvent() {
  if (updateEventButton.classList.contains("show")) {
    updateEventButton.classList.remove("show");
  }
  if (!addEventButton.classList.contains("show")) {
    addEventButton.classList.add("show");
  }
  if(!removeEventButton.classList.contains("newEventDeleteButton")) {
    removeEventButton.classList.add("newEventDeleteButton")
  }
  openModal();
}

function openModal() {
  modal.classList.add("open");
  console.log("add modal open");
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
  resetForm();
  modal.classList.remove("open");
  if (!removeEventButton.classList.contains("newEventDeleteButton")) {
    removeEventButton.classList.add("newEventDeleteButton");
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    resetForm();
    modal.classList.remove("open");
    if (!removeEventButton.classList.contains("newEventDeleteButton")) {
      removeEventButton.classList.add("newEventDeleteButton");
    }
  }
};

export function addEvent() {
  console.log("addEvent start");

  let eventName: string = eventNameField.value;
  let organizerName: string = eventOrganizerField.value;
  let eventDate: string = eventDateField.value;
  let eventLocation: string = eventLocationField.value;

  console.log("yes");

  if (
    eventName != "" &&
    organizerName != "" &&
    eventDate != "" &&
    eventLocation != ""
  ) {
    const event: Event = {
      id: null,
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
        console.log(response);
        if (response.ok) {
          console.log("Erfolgreiche Datenübertragung ins backend!");
          resetForm();
          loadEvents();
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
  closeModal();
}

export function alterEvent(event: Event) {
  openModal();
  if (addEventButton.classList.contains("show")) {
    addEventButton.classList.remove("show");
  }
  if (!updateEventButton.classList.contains("show")) {
    updateEventButton.classList.add("show");
  }
  displayEventData(event);
  updateEventButton.addEventListener("click", () => updateEvent(event));
  removeEventButton.addEventListener("click", () => removeEvent(event));
  removeEventButton.classList.remove("newEventDeleteButton");
}

export function updateEvent(event: Event) {
  let eventName: string = eventNameField.value;
  let organizerName: string = eventOrganizerField.value;
  let eventDate: string = eventDateField.value;
  let eventLocation: string = eventLocationField.value;

  console.log("clicked update button");
  if (
    eventName !== "" &&
    organizerName !== "" &&
    eventDate !== "" &&
    eventLocation !== ""
  ) {
    const updatedEvent: Event = {
      id: event.id,
      name: eventName,
      organization: organizerName,
      date: eventDate,
      location: eventLocation,
    };
    console.log(updatedEvent);
    fetch("/api/events/updateEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Erfolgreiche Datenübertragung ins backend!");
          loadEvents();
        } else {
          console.error("Fehler beim Updaten der Daten.");
        }
      })
      .catch((error) => {
        console.error("Fehler beim Updaten der Daten:", error);
      });
    closeModal();
  } else {
    console.log("wrong data inserted");
  }
}

function resetForm() {
  // Zurücksetzen der Formularfelder
  eventNameField.value = "";
  eventOrganizerField.value = "";
  eventDateField.value = "";
  eventLocationField.value = "";
}

function displayEventData(event: Event) {
  console.log("display data");
  eventNameField.value = event.name;
  eventOrganizerField.value = event.organization;
  eventDateField.value = event.date;
  eventLocationField.value = event.location;
}

export function removeEvent(event: Event) {
  console.log(event.id);
  fetch(`/api/events/removeEvent/${event.id}`, {
    method: "POST",
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
  closeModal();
}

/* search Event */
function searchEvent() {
  
}
