import "./components/event-table-component";
import "./components/header-component"
import { loadEvents, loadEventsByList } from "./service/event-service";

import Keycloak from 'keycloak-js';

/*
fetch('https://reqbin.com/echo/get/json', {
  headers: {Authorization: 'Bearer {eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjUDhVMTlET0tXM1hOTlVFZnpiR0NyNUZEaVVhTVJWT2cwSy0ydHdmWmRnIn0.eyJleHAiOjE3MTI5MDQ2NzMsImlhdCI6MTcxMjkwNDM3MywiYXV0aF90aW1lIjoxNzEyOTAzNzE2LCJqdGkiOiI5NjlkY2IzMi1lZmFjLTRjY2YtOWRhZS0yMjdhOTNiNTc5OTgiLCJpc3MiOiJodHRwczovL3BhcnR5dGlnYS5ob3B0by5vcmcvcmVhbG1zL3BhcnR5IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImNmZTYwNWU4LTBiNWQtNGMwYy1hMTg4LTAwMTAwMDc2NTBmYiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kIiwibm9uY2UiOiJhYzg3NDNhZS0wZGQwLTQ3YmItYjBkZS0yNGIwMjE5YTYxM2UiLCJzZXNzaW9uX3N0YXRlIjoiNjM2MWUwMWItZTRkZS00NjM5LWI4MzAtYzU1Nzk2MzA5MjFmIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjQyMDAiLCJodHRwczovL3BhcnR5dGlnYS5ob3B0by5vcmciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXBhcnR5Il19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjYzNjFlMDFiLWU0ZGUtNDYzOS1iODMwLWM1NTc5NjMwOTIxZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbmEgS3Jlbm4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJqa3Jlbm4iLCJnaXZlbl9uYW1lIjoiSmFuYSIsImZhbWlseV9uYW1lIjoiS3Jlbm4iLCJlbWFpbCI6Imoua3Jlbm4xQHN0dWRlbnRzLmh0bC1sZW9uZGluZy5hYy5hdCJ9.nyfggjfwD1qV-G-1prx4T-Krc4Aoy7OtRm3_i87UVKz2p98zyMKwPJZN0l6wylVQ_rxVuXE0NB03WNRXf2z1eXSf-hjra95XCW9Ui6xTeP70feHOQLWuKuNS1AT4vS5a2yzb3aP90b0LHcVwlewAcAtc8Mjg1f6ZlVVYU8BY26NpvqwqbwJD-cJ3CcUOtND-a6ApCSvSbLOfQPR0KaQFqGngdmmPY2XOY8vWsO4rV3teQIhcdfKUPgta1edSbhCIWrOcEwfN3k029kn8ptyZ83MBNGYSz97-4cNmZw8ToUhk-oXvN8LDhuk7hNxQq08eUZ8mASpyNjyTiKgz1AgW_Q}'}
})
   .then(resp => resp.json())
   .then(json => console.log(JSON.stringify(json)))
*/

async function load() {
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
            try{
                await keycloak.login()
            } catch (error) {
                console.log('failed to Login', error)
            }
        }
        else {
            console.log('keycloaktoken = ' + keycloak.token)
            localStorage.token=keycloak.token
        }
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }
}

load()

loadEvents()


/**
 * document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      closeModal();
  }
});
 */