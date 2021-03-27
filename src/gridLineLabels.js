"use strict";
import Point from "./point";
import PointGenerator from "./pointGenerator";
import TextPen from "./textPen";
import utils from "./utils";

export default class GridLineLabels {
  constructor(config) {
    this.orientation = config.orientation; // TODO: not having this is an error
    this.drawing = config.drawing; // TODO: not having this is an error
    this.rect = config.rect;
    this.labels = config.labels;
    this.viewBox = config.viewBox;
    this.pen = new TextPen(this.drawing);
    this.pointGenerator = new PointGenerator(this.rect);
  }

  draw() {
    for (const { label, at } of this.labels) {
      this._drawGridLineLabel(at, label);
    }
  }

  _drawGridLineLabel(lengthAlongAxis, label) {
    if (this.orientation === "horizontal") {
      const { x } = utils.mapPoint(
        this.viewBox,
        new Point(lengthAlongAxis, 0),
        this.rect
      );
      const { width: labelLength, height: labelHeight } = utils.getTextMetrics(
        label,
        `normal ${this.fontSize}px Arial`
      );
      const { y } = this.pointGenerator.fromTopBorder(0).generate();
      this.pen
        .setPosition(new Point(x, y))
        .translate(new Point(-labelLength / 2, -labelHeight))
        .setText(label)
        .drawOn(this.drawing);
    } else {
      const { y } = utils.mapPoint(
        this.viewBox,
        new Point(0, lengthAlongAxis),
        this.rect
      );
      const { width: labelLength, height: labelHeight } = utils.getTextMetrics(
        label,
        `normal ${this.fontSize}px Arial`
      );
      const { x } = this.pointGenerator.fromRightBorder(0).generate();
      this.pen
        .setPosition(new Point(x, y))
        .translate(new Point(-(labelLength + 5), -labelHeight/4))
        .setText(label)
        .drawOn(this.drawing);
    }
  }
}
