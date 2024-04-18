package at.htl.feature.event;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;

import java.util.List;


@Path("/events")
public class EventResource {

    @Inject
    Logger log;
    
    @Inject
    JsonWebToken jwt;

    @Inject
    EventDao eventDao;

    //@PermitAll
    @GET
//    @RolesAllowed("partytiga")
    public Response all(@Context SecurityContext ctx) {
        var user = ctx.getUserPrincipal();
        log.infof("user is : %s", user);
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

    @GET
    @Path("/searchEvents/{searchString}")
    public List<Event> searchEvents(@PathParam("searchString") String searchString){
        return eventDao.getSearchedEvents(searchString);
    }
}
