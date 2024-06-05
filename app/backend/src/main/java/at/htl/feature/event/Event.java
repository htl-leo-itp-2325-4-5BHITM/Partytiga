package at.htl.feature.event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "tb_event")
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String organization;
    String date;
    String address;
    String location;
    String age;
    String tickets;
    String contact;
    String img;

    // Neu hinzugefügte Variablen
    @Column(name = "x_koordinate")
    Double xKoordinate;

    @Column(name = "y_koordinate")
    Double yKoordinate;

    // Getter und Setter für xKoordinate
    public Double getXKoordinate() {
        return xKoordinate;
    }

    public void setXKoordinate(Double xKoordinate) {
        this.xKoordinate = xKoordinate;
    }

    // Getter und Setter für yKoordinate
    public Double getYKoordinate() {
        return yKoordinate;
    }

    public void setYKoordinate(Double yKoordinate) {
        this.yKoordinate = yKoordinate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getTickets() {
        return tickets;
    }

    public void setTickets(String tickets) {
        this.tickets = tickets;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
