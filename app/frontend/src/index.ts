import "./components/event-table-component";
import "./components/header-component"
import { loadEvents, loadEventsByList } from "./service/event-service";

import Keycloak from 'keycloak-js';
console.log("ich bin im index.ts")
const keycloak = new Keycloak({
    url: 'https://partytiga.hopto.org',
    realm: 'party',
    clientId: 'frontend'
});
try {
    const authenticated = await keycloak.init({enableLogging:true});
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    if (!authenticated) {
      await keycloak.login()
      console.log(keycloak.token)
    }
} catch (error) {
    console.error('Failed to initialize adapter:', error);
}

loadEvents()


/**
 * document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      closeModal();
  }
});
 */