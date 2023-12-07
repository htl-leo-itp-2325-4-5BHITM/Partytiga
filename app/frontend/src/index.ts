import { Event, EventsResponse } from "./model/model";
import "./components/event-table-component";
import { loadEvents } from "./service/event-service";

const addEventButton = document.getElementById("addEvent") as HTMLButtonElement;
addEventButton.addEventListener("click", addEvent);

const modal = document.getElementById("myModal");

const closeButton = document.getElementById("close");
closeButton.addEventListener("click", closeModal)

const openModalButton = document.getElementById('openModalButton')
openModalButton.addEventListener('click', openModal)

const successBox = document.getElementById("success");
const errorBox = document.getElementById("error");

loadEvents();

function openModal() {
  modal.classList.add("open")
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
  //modal.style.display = "none";
  modal.classList.remove("open")
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    //modal.style.display = "none";
    modal.classList.remove("open")

  }
}

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
  closeModal()
}

export function updateEvent(event: Event) {

  

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

  if (
    eventName != "" &&
    organizerName != "" &&
    eventDate != "" &&
    eventLocation != ""
  ) {
    const updatedEvent: Event = {
      id: null,
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
          console.error("Fehler beim Updaten der Daten.");
        }
      })
      .catch((error) => {
        console.error("Fehler beim Updaten der Daten:", error);
      });
  } else {
    console.log("no");
  }
  openModal()
}

export function removeEvent(id: Number) {
  console.log(JSON.stringify({ id }));
  fetch("/api/events/removeEvent/${id}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
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
