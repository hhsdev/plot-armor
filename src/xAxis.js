class XAxis {
  constructor(drawing, width, height, padding, label) {
    this.label = label;

    this.fontSize = 16;
    this.drawing = drawing;
    this.majorTickSize = 10;
    this.minorTickSize = 5;
    this.minorTicksPerMajorTick = 4;

    this.ticks = 28;
    this.width = width || 400;
    this.height = height || 400;
    this.padding = padding;

    this.pen = new LinePen().setThickness(1).setLineColor("black");
    this.pointGenerator = new PointGenerator(0, 0, this.width, this.height);
  }

  draw() {
    this._drawLine();
    this._drawLabel();
    this._drawTicks();
    this._drawGridLines();
  }

  _drawLine() {
    const startPoint = this.pointGenerator
      .fromBottomLeftCorner(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .fromBottomRightCorner(this.padding)
      .generate();

    this.pen.startAt(startPoint).lineTo(endPoint);
    this.pen.drawOn(this.drawing);
  }

  _drawLabel() {
    const textMetrics = getTextMetrics(
      this.label,
      `normal ${this.fontSize}px Arial`
    );
    const offset = - Math.round(textMetrics.width / 2);

    const textStartPoint = this.pointGenerator
      .fromHalfWidth(offset)
      .fromBottomBorder(this.padding - this.fontSize - this.majorTickSize)
      .generate();

    new TextPen()
      .setText(this.label)
      .setPostion(textStartPoint)
      .drawOn(this.drawing);
  }

  _drawTicks() {
    const axisLength = this.width - 2 * this.padding;
    const distanceBetweenTicks = axisLength / this.ticks;

    for (let i = 0; i < this.ticks + 1; i += 1) {
      if (i % this.minorTicksPerMajorTick === 0) {
        this._drawTick(
          i * distanceBetweenTicks + this.padding,
          this.majorTickSize
        );
      } else {
        this._drawTick(
          i * distanceBetweenTicks + this.padding,
          this.minorTickSize
        );
      }
    }
    this.pen.drawOn(this.drawing);
  }

  _drawTick(lengthAlongAxis, tickSize) {
    const startPoint = this.pointGenerator
      .fromLeftBorder(lengthAlongAxis)
      .fromBottomBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .fromLeftBorder(lengthAlongAxis)
      .fromBottomBorder(this.padding - tickSize)
      .generate();

    this.pen.startAt(startPoint).lineTo(endPoint);
  }

  _drawGridLines() {
    const axisLength = this.height - 2 * this.padding;
    const distanceBetweenTicks = axisLength / this.ticks;
    for (let i = 0; i < this.ticks; i += this.minorTicksPerMajorTick) {
      if (i !== 0) {
        this._drawGridLine(i * distanceBetweenTicks + this.padding);
      }
    }
    this.pen.drawOn(this.drawing);
  }

  _drawGridLine(lengthAlongAxis) {
    const startPoint = this.pointGenerator
      .fromLeftBorder(lengthAlongAxis)
      .fromBottomBorder(this.padding)
      .generate();

    const endPoint = this.pointGenerator
      .fromLeftBorder(lengthAlongAxis)
      .fromTopBorder(this.padding)
      .generate();

    this.pen
      .setDashed()
      .setLineColor("#666")
      .startAt(startPoint)
      .lineTo(endPoint)
      .setSolid()
      .setLineColor("black");
  }
}
