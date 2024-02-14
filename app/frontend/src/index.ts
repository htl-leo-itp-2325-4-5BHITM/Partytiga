import "./components/event-table-component";
import "./components/header-component"
import { loadEvents, loadEventsByList } from "./service/event-service";

loadEvents()

/**
 * document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      closeModal();
  }
});
 */