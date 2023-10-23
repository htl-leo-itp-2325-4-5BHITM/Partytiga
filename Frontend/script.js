"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addEventButton = document.getElementById('addEvent');
addEventButton.addEventListener('onclick', addEvent);
function addEvent() {
    var eventName = document.getElementById('eventName').value;
    var organizerName = document.getElementById('organizerName').value;
    var eventDate = document.getElementById('eventDate').value;
    var eventLocation = document.getElementById('eventLocation').value;
    console.log("yes");
    if (eventName != "" && organizerName != "" && eventDate != "" && eventLocation != "") {
        var event_1 = { eventName: eventName, organizerName: organizerName, eventDate: eventDate, eventLocation: eventLocation };
        console.log(event_1);
    }
    else {
        console.log("no");
    }
}
