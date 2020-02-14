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
    this._commitPath();
    this.thickness = thickness;
    return this;
  }

  setLineColor(color) {
    this._commitPath();
    this.lineColor = color;
    return this;
  }

  setDashed() {
    this._commitPath();
    this.strokeDashArray = '5,5';
    return this;
  }

  setDotted() {
    this._commitPath();
    this.strokeDashArray = '2, 2';
    return this;
  }

  setSolid() {
    this._commitPath();
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

  connect() {
    this.actions.push('Z ');
    return this;
  }
  _commitPath() {
    if (this.actions.length === 0) return;

		let pathString = `<path stroke-width="${this.thickness}" ` +
        `stroke="${this.lineColor}" ` +
        `stroke-dasharray="${this.strokeDashArray}" ` +
        'fill="transparent" ' +
        `d="${this.actions.reduce((accu, curr) => accu += curr)}"></path>`;

    this.actions = [];
    this.html += pathString;
  }

  drawOn(drawing) {
    this._commitPath();
    drawing.html += this.html;
    this.html = '';
    return this;
  }

}