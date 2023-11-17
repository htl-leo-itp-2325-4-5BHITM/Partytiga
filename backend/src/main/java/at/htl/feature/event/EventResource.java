package at.htl.feature.event;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

@Path("/events")
public class EventResource {
    @Inject
    EventDao eventDao;
    @Inject
    EventDao eventDao;
    
    @GET
    public Response all() {
        var events = eventDao.all();
        return Response.ok(events).build();
    }

    @POST
    @Path("/removeEvents/{id}")
    public void removeEvent (@PathParam("id") int id){
        eventDao.removeEvents(id);
    }

    @POST
    @Path("/addEvent")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public void addEvent(Event event){
        eventDao.addEvent(event);
    }
}
