package at.htl.feature.event;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EventMapper {
    public EventDto toResource(Event event) {
        return new EventDto(
                event.id,
                event.name,
                event.organization,
                event.date,
                event.address,
                event.location,
                event.age,
                event.tickets,
                event.contact,
                event.img,
                event.xKoordinate, // Neue Felder
                event.yKoordinate  // Neue Felder
        );
    }
}
