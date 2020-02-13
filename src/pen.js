"use strict";

class Pen {
  constructor() {
    this.html = '';
  }

  drawOn(drawing) {
    drawing.html += this.html;
  }
}