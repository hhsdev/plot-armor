"use strict";

class Graph {
  constructor(width, height) {
    this.drawing = new Drawing(width, height);
    this.width = width;
    this.height = height;

    this.majorTickSize = 20;
    this.minorTickSize = 10;
    this.pen = new LinePen().setThickness(1).setLineColor('#333').setDashed();
  }

  draw() {
    this._drawAxes();
  }

  attachTo(container) {
    this.drawing.attachTo(container);
  }

  _drawAxes() {
    this._drawXAxis();
    this._drawYAxis();
  }

  _drawXAxis() {
    this.pen.startAt({x: 1, y: this.height-1}).lineTo({x: this.width-1, y: this.height-1});
    this.pen.drawOn(this.drawing);
  }

  _drawYAxis() {
    this.pen.startAt({x: 1, y: this.height-1}).lineTo({x: 1, y: 1});
    this.pen.drawOn(this.drawing);
  }
}