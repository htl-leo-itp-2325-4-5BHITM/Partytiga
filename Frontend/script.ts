import { Event } from "./model/model";

const addEventButton = document.getElementById("addEvent") as HTMLButtonElement;
addEventButton.addEventListener("click", addEvent);

const loadEventsButton = document.getElementById(
  "loadEvents"
) as HTMLButtonElement;
loadEventsButton.addEventListener("click", loadEvents);

const fs = require("fs");
const csv = require("csv-parser");
const csvFilePath = "/data/data.csv";

function addEvent() {
  const eventName: string = (
    document.getElementById("eventName") as HTMLInputElement
  ).value;
  const organizerName: string = (
    document.getElementById("organizerName") as HTMLInputElement
  ).value;
  const eventDate: string = (
    document.getElementById("eventDate") as HTMLInputElement
  ).value;
  const eventLocation: string = (
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
      eventName: eventName,
      organizerName: organizerName,
      eventDate: eventDate,
      eventLocation: eventLocation,
    };
    console.log(event);

    fetch("http://localhost:3000/write-csv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Daten wurden in die CSV-Datei geschrieben.");
        } else {
          console.error("Fehler beim Schreiben der Daten.");
        }
      })
      .catch((error) => {
        console.error("Fehler beim Schreiben der Daten:", error);
      });

    console.log("Daten erfolgreich in die CSV-Datei geschrieben.");
  } else {
    console.log("no");
  }
}

function loadEvents() {
  console.log("loading");
  fetch("http://localhost:3000/read-csv")
    .then((response) => {
      console.log(response)
    })
    .then((data) => {
      console.log(data);
    });
}
