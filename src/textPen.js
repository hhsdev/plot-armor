
"use strict";

class TextPen extends Pen {
  constructor() {
    super();
  }

  text(str, point) {
    this.html += `<text x="${point.x}" y="${point.y}" transform="rotate(-90,${point.x},${point.y})" >${str}</text>`;
    return this;
  }

  drawOn(drawing) {
    drawing.html += this.html;
    this.html = '';
    return this;
  }

}