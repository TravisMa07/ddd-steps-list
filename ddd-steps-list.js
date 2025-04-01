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
      title: "Take the next step to learn Web Development. Find out more about HTML, JavaScript, CSS, and more information to get you ready to become a Web Developer.",
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

      .circle {
  width: 75px;
  height: 75px
  line-height: 75px;
  border-radius: 50%; /* the magic */
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  text-align: center;
  color: white;
  font-size: 64px;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 auto 40px;
}

.coalyGray {
  background-color: var(--ddd-theme-default-coalyGray);  
}





    `];
  }


  connectedCallback() {
    super.connectedCallback();
    this.ValidateChildren();
    this.orderSteps();
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


  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h5><span>${this.t.title}</span> ${this.title}</h5>
  <div class="circle coalyGray">1</div>
  <slot></slot>
</div>`;
  }

 
}

globalThis.customElements.define(DddStepsList.tag, DddStepsList);