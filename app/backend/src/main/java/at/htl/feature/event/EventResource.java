package at.htl.feature.event;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/events")
public class EventResource {
    @Inject
    EventDao eventDao;
    
    @GET
    public Response all() {
        var events = eventDao.all();
        return Response.ok(events).build();
    }

    @POST
    @Transactional
    @Path("/removeEvent/{id}")
    public void removeEvent (@PathParam("id") String id){
        int eventId = Integer.parseInt(id);
        eventDao.removeEvents(eventId);
    }

    @POST
    @Path("/addEvent")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public void addEvent(Event event){
        eventDao.addEvent(event);
    }

    @POST
    @Path("/updateEvent")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public void updateEvent(Event event){
        eventDao.updateEvent(event);
    }
}
