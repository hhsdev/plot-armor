import PointGenerator from "./pointGenerator";
import TextPen from "./textPen";
import utils from "./utils";

export default class AxisLabel {
  constructor(config) {
    this.orientation = config.orientation;
    this.rect = config.rect;
    this.drawing = config.drawing;
    this.pointGenerator = new PointGenerator(this.rect);
    this.label = config.label;

    this.fontSize = config.fontSize;
  }

  draw() {
    if (this.orientation === "horizontal") {
      this._drawLabelHorizonal();
    } else {
      this._drawLabelVertical();
    }
  }

  _drawLabelHorizonal() {
    const textMetrics = utils.getTextMetrics(
      this.label,
      `normal ${this.fontSize}px Arial`
    );
    const offset = -Math.round(textMetrics.width / 2);
    const textStartPoint = this.pointGenerator
      .fromCenter(offset, 0)
      .fromBottomBorder(0)
      .generate();

    new TextPen(this.drawing)
      .setText(this.label)
      .setColor("orange")
      .setPosition(textStartPoint)
      .drawOn(this.drawing);
  }

  _drawLabelVertical() {
    const textMetrics = utils.getTextMetrics(
      this.label,
      `normal ${this.fontSize}px Arial`
    );
    const yOffset = Math.round(textMetrics.width / 2);
    const xOffset = Math.round(textMetrics.height);

    const textStartPoint = this.pointGenerator
      .fromCenter(0, -yOffset)
      .fromLeftBorder(xOffset)
      .generate();

    new TextPen(this.drawing)
      .setText(this.label)
      .setColor("purple")
      .setPosition(textStartPoint)
      .rotate(-90, textStartPoint)
      .drawOn(this.drawing);
  }
}