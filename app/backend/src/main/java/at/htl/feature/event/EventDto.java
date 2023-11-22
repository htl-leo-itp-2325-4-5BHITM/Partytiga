package at.htl.feature.event;
public record EventDto(
    Long id,
    String name,
    String organization,
    String date,
    String location) {
}
