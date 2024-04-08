import { html,render } from "lit-html"

export class AppHeaderComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
      this.render();
  }

  render() {
    render(this.displayHeader(), this.shadowRoot)
    console.log("header component loaded");
    
  }
  displayHeader() {
    return html` <style>
        h1 {
          text-transform: uppercase;
          letter-spacing: 1vw;
          font-size: 10vh;
          color: rgb(80, 0, 154);
          text-align: center;
        }
      </style>

      <h1 >Partytiga</h1>`;
  }
}

customElements.define("app-head", AppHeaderComponent)
