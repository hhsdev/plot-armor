"use strict";

class TextPen extends Pen {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.transforms = [];
    this.text = '';
    this.point = {x: 0, y: 0};
    this.html = '';
  }

  setText(str) {
    this.text = str;
    return this;
  }

  setPostion(point) {
    this.point = point;
    return this;
  }

  rotate(angle, pivot) {
    if (pivot === undefined) pivot = {x: 0, y: 0};
    this.transforms.push(`rotate(${angle}, ${pivot.x}, ${pivot.y}) `);
    return this;
  }

  translate(x, y) {
    this.transforms.push(`translate(${x}, ${y}) `);
  }

  _commit() {
    if (this.text === '') return;
    this.html += `<text class="text-pen" x="${this.point.x}" y="${this.point.y}" ` +
      `transform="${this.transforms.reduce((accu, curr) => accu + curr,'')}" >${this.text}</text>`;
  }

  drawOn(drawing) {
    this._commit();
    drawing.html += this.html;
    this.reset();
    return this;
  }


}
