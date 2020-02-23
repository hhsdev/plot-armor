"use strict";

export default class Drawing {
  constructor(width, height) {
    this.html = "";

    this.view = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.view.setAttribute("width", width);
    this.view.setAttribute("height", height);
  }

  attachTo(container) {
    //this.view.innerHTML = this.html;
    container.appendChild(this.view);
  }

  add(node) {
    this.view.appendChild(node);
  }
}
