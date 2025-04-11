/**
 * Copyright 2025 TravisMa07
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list`
 * 
 * @demo index.html
 * @element ddd-steps-list
 */
export class DddStepsList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Take the next steps toward a future at Penn State Altoona. Find admission requirements, tuition, and financial aid, and other information to get you ready to apply.",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--ddd-steps-list-label-font-size, var(--ddd-font-size-s));
      }

      

      :host([data-accent]) .wrapper {
        background-color: var(--ddd-primary-accent, var(--ddd-theme-accent));
      }

      @media (max-width: 800px){
        .wrapper{
          padding: var(--ddd-spacing-2);
          margin: var(--ddd-spacing-1);
         }
      }
    `];
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.ValidateChildren();
    this.orderSteps();
    this.changePrimaryColor();
  }

  ValidateChildren(){
    const childItem = Array.from(this.children);
    childItem.forEach((item) => {
      if (item.tagName.toLowerCase() !== "ddd-steps-list-item") {
        console.error("Invalid child element. Only ddd-steps-list-item elements are allowed.");
        this.removeChild(item);
      }
    });
  }

  orderSteps() {
    const stepCount = Array.from(this.children).filter(
      (item) => item.tagName.toLowerCase() === "ddd-steps-list-item"
    );
    stepCount.forEach((item, index) => {
        item.setAttribute("step", index + 1);
      });
  }

  changePrimaryColor(){
    const primaryColor = this.getAttribute("ddd-primary");
    if (primaryColor){
      this.querySelectorAll("ddd-steps-list-item").forEach((item) => {
        item.setAttribute("data-primary", primaryColor);
    });
  }
  }


  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h5><span>${this.t.title}</span> ${this.title}</h5>
  <slot></slot>
</div>`;
  }

 
}

globalThis.customElements.define(DddStepsList.tag, DddStepsList);