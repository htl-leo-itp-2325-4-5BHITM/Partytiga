/*import { html,render } from "lit-html"

export class AppNavigationComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this.render();
    this.addStyles();
  }

  render() {
    render(this.displayNavigation(), this.shadowRoot)
    console.log("navigation component loaded");
    
  }
  displayNavigation() {
    return html`
    <div class="nav-box">
      <div class="logo-box">
        <img id="logo" src="img/logo.png">
        <h1 id="name">Partytiga</h1>
      </div>
      <div class="nav-unterseiten">
        <a href="#">Startseite</a>
        <a href="#">Entdecken</a>
        <a href="#">Favouriten</a>
      </div>
      <a href="#" class="settings-link">Einstellungen</a>
    </div>`;
  }

  addStyles() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "../../styles/navigation-style.css");
    this.shadowRoot.appendChild(linkElem);
  }
}

customElements.define("app-nav", AppNavigationComponent)
*/


import { html, render } from "lit-html";


export class AppNavigationComponent extends HTMLElement {

  currentPage: string;

  constructor() {
    super();
    this.currentPage = window.location.pathname; // Setze die aktuelle Seite beim Initialisieren
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this.render();
    this.addStyles();
    this.setupNavigation();
    this.highlightCurrentPage();
  }

  render() {
    render(this.displayNavigation(), this.shadowRoot);
  }

  displayNavigation() {
    return html`
      <div class="nav-box">
        <div class="logo-box">
          <img id="logo" src="img/logo.png">
          <h1 id="name">Partytiga</h1>
        </div>
        <div class="nav-unterseiten">
          <a href="#" id="startseite">Startseite</a>
          <a href="#" id="entdecken">Entdecken</a>
          <a href="#" id="favoriten">Favoriten</a>
          <a href="#" id="profil">Profil</a>
<<<<<<< Updated upstream
=======
          <!--<a href="#"><add-new-event></add-new-event></a>-->
>>>>>>> Stashed changes
          <a href="#" id="hinzufuegen">Hinzufügen</a>
        </div>
        <a href="#" id="settings" class="settings-link">Einstellungen</a>
      </div>
    `;
  }

  addStyles() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "../../styles/navigation-style.css");
    this.shadowRoot.appendChild(linkElem);
  }

  setupNavigation() {
    const links = this.shadowRoot.querySelectorAll('.nav-box a');
    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const pageId = link.getAttribute('id');
        if (pageId) {
          this.loadPage(pageId);
          this.currentPage = window.location.pathname; // Aktualisiere die aktuelle Seite nach dem Klicken auf den Link
          this.highlightCurrentPage(); // Aktualisiere die Hervorhebung des aktuellen Links
        }
      });
    });
  }

  loadPage(pageId: string) {
    console.log("load");
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = ''; // Leeren Sie den Inhalt des main-Bereichs
    if(pageId == 'startseite'){
      const eventTableComponent = document.createElement('event-table');
      mainContent.appendChild(eventTableComponent);
      window.history.pushState({ page: 'startseite' }, 'Startseite', '/startseite');
    } else if (pageId === 'entdecken') {
      console.log("entdecken page")
      const entdeckenComponent = document.createElement('event-entdecken');
      mainContent.appendChild(entdeckenComponent);
      window.history.pushState({ page: 'entdecken' }, 'Entdecken', '/entdecken');
    } else if(pageId === 'favoriten') {
      console.log("favoriten page")
      const favoritenComponent = document.createElement('event-favoriten');
      mainContent.appendChild(favoritenComponent);
      window.history.pushState({ page: 'favoriten' }, 'Favoriten', '/favoriten');
    }else if(pageId === 'settings') {
      const settingsComponent = document.createElement('event-settings');
      mainContent.appendChild(settingsComponent);
      window.history.pushState({ page: 'settings' }, 'Einloggen', '/settings');
    }else if(pageId === 'hinzufuegen') {
      const settingsComponent = document.createElement('event-hinzufuegen');
      mainContent.appendChild(settingsComponent);
      window.history.pushState({ page: 'hinzufuegen' }, 'Hinzufügen', '/hinzufügen');
    }
  }
  highlightCurrentPage() {
    const links = this.shadowRoot.querySelectorAll('.nav-box a');
    links.forEach(link => {
      if (link.getAttribute('id') === this.currentPage.substring(1)) { // Entferne das führende '/'
        link.classList.add('current-page');
      } else {
        link.classList.remove('current-page');
      }
    });
  }
}

customElements.define("app-nav", AppNavigationComponent);
