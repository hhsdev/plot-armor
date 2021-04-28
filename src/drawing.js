"use strict";

export default class Drawing {
  constructor(width, height) {
    this.html = "";
    this.width = width;
    this.height = height;

    // The "frame" is needed to attach non-svg HTML elements such as
    // `div` and `span` since `svg` does not allow them as children.
    this.frame = document.createElement("span");
    this.view = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.view.setAttribute("width", width);
    this.view.setAttribute("height", height);
    this.frame.appendChild(this.view);
  }

  attachTo(container) {
    container.appendChild(this.frame);
  }

  add(node) {
    this.view.appendChild(node);
  }
}
