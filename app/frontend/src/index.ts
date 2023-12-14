import { Event, EventsResponse } from "./model/model";
import "./components/event-table-component";
import { loadEvents } from "./service/event-service";
import { animationFrameScheduler } from "rxjs";

const addEventButton = document.getElementById("addEvent") as HTMLButtonElement;
addEventButton.addEventListener("click", addEvent);

const modal = document.getElementById("myModal");
const modalUpdate = document.getElementById("myModalUpdate");

//add modal
const closeButton = document.getElementById("close");
closeButton.addEventListener("click", closeModal)

const openModalButton = document.getElementById('openModalButton')
openModalButton.addEventListener('click', openModal)

const closeUpdateButton = document.getElementById("closeUpdate");
closeUpdateButton.addEventListener("click", closeModalUpdate)

document.addEventListener('DOMContentLoaded', function () {
  const openUpdateModalButton = document.getElementById('openUpdateModalButton')

  if (openUpdateModalButton) {
    openUpdateModalButton.addEventListener('click', openModalUpdate);
  } else {
    console.log("Element mit der ID 'openUpdateModalButton' nicht gefunden.");
  }
});

const successBox = document.getElementById("success");
const errorBox = document.getElementById("error");

loadEvents();

function openModal() {
  modal.classList.add("open")
  console.log("add modal open")
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
  //modal.style.display = "none";
  modal.classList.remove("open")
}

function openModalUpdate() {
  modalUpdate.classList.add("open")
  console.log("update modal open")
}

function closeModalUpdate() {
  modalUpdate.classList.remove("open")
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    //modal.style.display = "none";
    modal.classList.remove("open")

  }
}

export function addEvent() {
  console.log("addEvent start")

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
          console.log(response)
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

export function updateEvent(eventId: Number, event: Event) {
  openModalUpdate()
  console.log(eventId)
  
  //anzeigen der alten daten in den eingabefeldern
  displayEventData(event);

  const updateEventButton = document.getElementById("updateEvent") as HTMLButtonElement;
  updateEventButton.addEventListener("click", () => {

  let eventName: string = (
    document.getElementById("eventNameUpdate") as HTMLInputElement
  ).value;
  let organizerName: string = (
    document.getElementById("organizerNameUpdate") as HTMLInputElement
  ).value;
  let eventDate: string = (
    document.getElementById("eventDateUpdate") as HTMLInputElement
  ).value;
  let eventLocation: string = (
    document.getElementById("eventLocationUpdate") as HTMLInputElement
  ).value;

    console.log("clicked update button")
    if (
      eventName !== "" &&
      organizerName !== "" &&
      eventDate !== "" &&
      eventLocation !== ""
    ) {
      const updatedEvent: Event = {
        id: eventId,
        name: eventName,
        organization: organizerName,
        date: eventDate,
        location: eventLocation,
      };
      console.log(updatedEvent)
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
              resetForm();
              loadEvents()
            } else {
              console.error("Fehler beim Updaten der Daten.");
            }
          })
          .catch((error) => {
            console.error("Fehler beim Updaten der Daten:", error);
          });
          closeModalUpdate();
      } else{
        console.log("wrong data inserted")
      }
  });
}


function resetForm() {
  // Zurücksetzen der Formularfelder
  (document.getElementById("eventName") as HTMLInputElement).value = "";
  (document.getElementById("organizerName") as HTMLInputElement).value = "";
  (document.getElementById("eventDate") as HTMLInputElement).value = "";
  (document.getElementById("eventLocation") as HTMLInputElement).value = "";
}

function displayEventData(event: Event) {
  console.log("display data");
  (document.getElementById("eventNameUpdate") as HTMLInputElement).value = event.name;
  (document.getElementById("organizerNameUpdate") as HTMLInputElement).value = event.organization;
  (document.getElementById("eventDateUpdate") as HTMLInputElement).value = event.date;
  (document.getElementById("eventLocationUpdate") as HTMLInputElement).value = event.location;
}

export function removeEvent(id: Number) {
  console.log(id);
  fetch(`/api/events/removeEvent/${id}`, {
    method: "POST"
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
