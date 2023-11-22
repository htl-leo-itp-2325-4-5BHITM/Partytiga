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
            event.location
        );
    }
}
