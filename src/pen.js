"use strict";

export default class Pen {
  constructor(drawing) {
    this.drawing = drawing;
  }

  drawOn(drawing) {}

  _flipY(y) {
    const newY = this.drawing.height - y;
    return newY;
  }
}
