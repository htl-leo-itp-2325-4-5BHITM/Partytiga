package at.htl.feature.event;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/events")
public class EventResource {
    @Inject EventDao eventDao;
    
    @GET
    public Response all() {
        var events = eventDao.all();
        return Response.ok(events).build();
    }
}
