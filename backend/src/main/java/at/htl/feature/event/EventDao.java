package at.htl.feature.event;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class EventDao {
    @Inject
    EntityManager entityManager;

    public List<Event> all() {
        return entityManager
            .createQuery("select e from Event e", Event.class)
            .getResultList();
    }

    public void removeEvents(int id){
        Event event = entityManager.find(Event.class, id);
        entityManager.remove(event);
    }

    public void addEvent(Event event){
        em.add(event);
    }
}
