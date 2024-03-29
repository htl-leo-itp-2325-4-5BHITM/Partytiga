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
                .createQuery("select e from Event e order by date asc", Event.class)
                .getResultList();
    }

    public void removeEvents(int id) {
        Event event = entityManager.find(Event.class, id);
        entityManager.remove(event);
    }

    public void addEvent(Event event) {
        entityManager.persist(event);
    }

    public void updateEvent(Event event) {
        Event findEvent = entityManager.find(Event.class, event.getId());
        System.out.println(findEvent);
        if (findEvent != null) {
            findEvent.setName(event.name);
            findEvent.setDate(event.date);
            findEvent.setOrganization(event.organization);
            findEvent.setLocation(event.location);
        }
    }

    public List<Event> getSearchedEvents(String searchString) {
        String sqlString = "select e from Event e where " +
                "LOWER( name ) like '%" + searchString + "%' or " +
                "LOWER( organization ) like '%" + searchString + "%' or " +
                "LOWER( location ) like '%" + searchString + "%' or " +
                "LOWER( date ) like '%" + searchString + "%' " +
                "order by date asc"
                ;
        return entityManager
                .createQuery(sqlString, Event.class)
                .getResultList();

    }
}
