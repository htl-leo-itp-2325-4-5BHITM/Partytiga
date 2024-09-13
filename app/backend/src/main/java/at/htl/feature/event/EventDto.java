package at.htl.feature.event;

import java.io.InputStream;

public record EventDto(
        Long id,
        String name
        /*String organization,
        String date,
        String address,
        String location,
        String age,
        String tickets,
        String contact,
        InputStream file,
        double xKoordinate, // Neue Felder
        double yKoordinate  // Neue Felder*/
) {
}
