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
    @Path("/removeEvent/{id}")
    public void removeEvent (@PathParam("id") int id){
        eventDao.removeEvents(id);
    }

    @POST
    @Path("/addEvent")
    @Produces(MediaType.APPLICATION_JSON)
    public void addEvent(Event event){
        eventDao.addEvent(event);
    }

    @POST
    @Path("/updateEvent")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public void updateEvent(Event event){
        eventDao.update(event);
    }
}
