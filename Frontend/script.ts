import { Event } from "./model/model"

const addEventButton = (document.getElementById('addEvent') as HTMLButtonElement)
addEventButton.addEventListener('onclick', addEvent)

function addEvent(){
    const eventName:string = (document.getElementById('eventName') as HTMLInputElement).value
    const organizerName:string = (document.getElementById('organizerName') as HTMLInputElement).value
    const eventDate:string = (document.getElementById('eventDate') as HTMLInputElement).value
    const eventLocation:string = (document.getElementById('eventLocation') as HTMLInputElement).value

    console.log("yes")

    if(eventName != "" && organizerName != "" && eventDate != "" && eventLocation != ""){
        const event:Event = { eventName: eventName, organizerName: organizerName, eventDate: eventDate, eventLocation: eventLocation};
        console.log(event)
    } else {
        console.log("no")
    }
    
}