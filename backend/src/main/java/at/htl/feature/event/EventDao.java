package at.htl.feature.event;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class EventDao {
    @Inject
    EntityManager em;
    public List<Event> all() {
        return em
            .createQuery("select e from Event e", Event.class)
            .getResultList();

    }
}
