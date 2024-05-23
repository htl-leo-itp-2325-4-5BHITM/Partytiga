package at.htl.feature.event;
public record EventDto(
        Long id,
        String name,
        String organization,
        String date,
        String address,
        String location,
        Integer age,
        String tickets,
        String contact,
        String img) {
}
