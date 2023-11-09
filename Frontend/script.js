"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addEventButton = document.getElementById("addEvent");
addEventButton.addEventListener("click", addEvent);
var loadEventsButton = document.getElementById("loadEvents");
loadEventsButton.addEventListener("click", loadEvents);
var fs = require("fs");
var csv = require("csv-parser");
var csvFilePath = "/data/data.csv";
function addEvent() {
    var eventName = document.getElementById("eventName").value;
    var organizerName = document.getElementById("organizerName").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventLocation = document.getElementById("eventLocation").value;
    console.log("yes");
    if (eventName != "" &&
        organizerName != "" &&
        eventDate != "" &&
        eventLocation != "") {
        var event_1 = {
            eventName: eventName,
            organizerName: organizerName,
            eventDate: eventDate,
            eventLocation: eventLocation,
        };
        console.log(event_1);
        fetch("http://localhost:3000/write-csv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event_1),
        })
            .then(function (response) {
            if (response.ok) {
                console.log("Daten wurden in die CSV-Datei geschrieben.");
            }
            else {
                console.error("Fehler beim Schreiben der Daten.");
            }
        })
            .catch(function (error) {
            console.error("Fehler beim Schreiben der Daten:", error);
        });
        console.log("Daten erfolgreich in die CSV-Datei geschrieben.");
    }
    else {
        console.log("no");
    }
}
function loadEvents() {
    console.log("loading");
    fetch("http://localhost:3000/read-csv")
        .then(function (response) {
        console.log(response);
    })
        .then(function (data) {
        console.log(data);
    });
}
