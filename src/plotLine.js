"use strict";
import utils from "./utils";
import LinePen from "./linePen";
import PointGenerator from "./pointGenerator";

export default class PlotLine {
  constructor(config) {
    this.width = config.width || 300;
    this.height = config.height || 300;
    console.log(this.width, this.height);

    this.maxX = config.maxX || 300;
    this.maxY = config.maxY || 300;

    this.dataset = config.dataset || [];
    this.drawing = config.drawing; // TODO: not having a drawing is an error

    this.xOffset = config.xOffset || 30;
    this.yOffset = config.yOffset || 30;

    this.html = "";

    this.color = config.color || utils.randomColor();
    this.pen = new LinePen().setThickness(1).setLineColor(this.color);
    this.pointGenerator = new PointGenerator(0, 0, this.width, this.height);
  }

  draw() {
    if (this.dataset.length === 0) return;
    this.pen.startAt(this.fitOnGraph(this.dataset[0]));
    for (let i = 1; i < this.dataset.length; ++i) {
      const coordinate = this.fitOnGraph(this.dataset[i]);
      this.pen.lineTo(coordinate);
    }

    this.pen.drawOn(this.drawing);
  }

  fitOnGraph(point) {
    return {
      x: this.xOffset + point.x * (this.width / this.maxX),
      y: this.height - (this.yOffset + point.y * (this.height / this.maxY))
    };
  }

  addData(newData) {
    this.pen.removeAllPaths(true);
    this.dataset.push(newData);
    this.draw();
  }
}
