/**
 * Copyright 2025 TravisMa07
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list-item`
 * 
 * @demo index.html
 * @element ddd-steps-list-item
 */
export class DddStepsListItem extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list-item";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath: new URL("./locales/", import.meta.url).href, 
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      step: { type: Number },
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
  width: var(--ddd-spacing-16);
  height: var(--ddd-spacing-16);
  line-height: var(--ddd-spacing-16);
  border-radius: 50%; /* the magic */
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  text-align: center;
  color: var(--ddd-theme-default-white);
  font-size: var(--ddd-spacing-8);
  text-transform: uppercase;
  font-weight: var(--ddd-font-weight-bold);
  align-items: center;
  position: relative;
  z-index: 1;
}

.coalyGray {
  background-color: var(--ddd-theme-default-coalyGray);  
}

.circleContainer{
  display: flex;
  align-items: center;
  gap: var(--ddd-spacing3);
  height: 100px;
}

h3{
  margin: var(--ddd-spacing-0);
  font-size: var(--ddd-font-size-3xs);
}

.dashLineContainer {
  position: absolute;
  top: var(--ddd-spacing-13);
  left: calc(var(--ddd-spacing-16) / 2);
  height: 150%;
  width: 2px;
  z-index: -1;
  background: repeating-linear-gradient(transparent 0%, transparent 10px, white 10px, white 12px);
}

.dashLineWrapper {
  position: relative;
  width: 100%; 
}
.content{
  padding-left: var(--ddd-spacing-16);
}
.wrapper{
  position: relative;
}


    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
<div class="dashLineWrapper">
  <div class="dashLineContainer"></div>
  <div class="circleContainer">
    <div class="circle coalyGray">${this.step}</div>
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  </div>
  <div class="content">
  <slot></slot>
  </div>
  </div>
</div>`;
  }
 
}

globalThis.customElements.define(DddStepsListItem.tag, DddStepsListItem);