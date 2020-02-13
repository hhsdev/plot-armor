"use strict";

class LinePen extends Pen {
  constructor() {
    super();
    this.actions = [];
    this.thickness = 0;
    this.lineColor = 'black';
    this.strokeDashArray = '';
  }

  setThickness(thickness) {
    this.thickness = thickness;
    return this;
  }

  setLineColor(color) {
    this.lineColor = color;
    return this;
  }

  setDashed() {
    this.strokeDashArray = '7, 7';
    return this;
  }

  setDotted() {
    this.strokeDashArray = '2, 2';
    return this;
  }

  setSolid() {
    this.strokeDashArray = '';
    return this;
  }

  startAt(point) {
    this.actions.push(`M ${point.x}, ${point.y} `);
    return this;
  }
  lineTo(point) {
    this.actions.push(`L ${point.x},${point.y} `);
    return this;
  }

  drawOn(drawing) {
		let pathString = `<path stroke-width="${this.thickness}" ` +
        `stroke="${this.lineColor}" ` +
        `stroke-dasharray="${this.strokeDashArray}"` +
        `d="${this.actions.reduce((accu, curr) => accu += curr)}"></path>`;
    drawing.html += pathString;
    return this;
  }

}