"use strict";

export default class Pen {
  constructor() {
    this.html = '';
  }

  drawOn(drawing) {
    drawing.html += this.html;
  }
}