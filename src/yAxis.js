class YAxis {
  constructor(config) {
    this.config = config;
    this.loadDefaults();
  }

  loadDefaults() {
    this.config.setIfNotSet("ylabel", "Y-axis");
    this.config.setIfNotSet("fontSize", 16);

    this.config.setIfNotSet("label", "Y-axis");

    this.config.rename("yMajorTickSize", "majorTickSize");
    this.config.setIfNotSet("majorTickSize", 10);

    this.config.rename("yMinorTickSize", "minorTickSize");
    this.config.setIfNotSet("minorTickSize", 5);

    this.config.rename("yTicks", "ticks");
    this.config.setIfNotSet("ticks", 28);

    this.config.rename("yMinorTicksPerMajorTick", "minorTicksPerMajorTick");
    this.config.setIfNotSet("minorTicksPerMajorTick", 4);

    this.pen = new LinePen().setThickness(1).setLineColor("black");
    this.pointGenerator = new PointGenerator(
      0,
      0,
      this.config.get("width"),
      this.config.get("height")
    );
  }
  draw() {
    this._drawLine();
    this._drawLabel();
    this._drawTicks();
    this._drawGridLines();
  }

  _drawLine() {
    const startPoint = this.pointGenerator
      .fromTopLeftCorner(this.config.get("padding"))
      .generate();

    const endPoint = this.pointGenerator
      .fromBottomLeftCorner(this.config.get("padding"))
      .generate();
    this.pen.startAt(startPoint).lineTo(endPoint);
    this.pen.drawOn(this.config.get("drawing"));
  }

  _drawLabel() {
    const textMetrics = getTextMetrics(
      this.config.get("label"),
      `normal ${this.config.get("fontSize")}px Arial`
    );
    const offset = Math.round(textMetrics.width / 2);

    const textStartPoint = this.pointGenerator
      .fromHalfHeight(offset)
      .fromLeftBorder(this.config.get("padding") - this.config.get("fontSize"))
      .generate();

    new TextPen()
      .setText(this.config.get("label"))
      .setPostion(textStartPoint)
      .rotate(-90, textStartPoint)
      .drawOn(this.config.get("drawing"));
  }

  _drawTicks() {
    const axisLength =
      this.config.get("height") - 2 * this.config.get("padding");
    const distanceBetweenTicks = axisLength / this.config.get("ticks");
    for (let i = 0; i < this.config.get("ticks") + 1; i += 1) {
      if (i % this.config.get("minorTicksPerMajorTick") === 0) {
        this._drawTick(
          i * distanceBetweenTicks + this.config.get("padding"),
          this.config.get("majorTickSize")
        );
      } else {
        this._drawTick(
          i * distanceBetweenTicks + this.config.get("padding"),
          this.config.get("minorTickSize")
        );
      }
    }
    this.pen.drawOn(this.config.get("drawing"));
  }

  _drawTick(lengthAlongAxis, tickSize) {
    const startPoint = this.pointGenerator
      .fromBottomBorder(lengthAlongAxis)
      .fromLeftBorder(this.config.get("padding"))
      .generate();

    const endPoint = this.pointGenerator
      .fromBottomBorder(lengthAlongAxis)
      .fromLeftBorder(this.config.get("padding") - tickSize)
      .generate();

    this.pen.startAt(startPoint).lineTo(endPoint);
  }

  _drawGridLines() {
    const axisLength =
      this.config.get("height") - 2 * this.config.get("padding");
    const distanceBetweenTicks = axisLength / this.config.get("ticks");
    for (
      let i = 0;
      i < this.config.get("ticks");
      i += this.config.get("minorTicksPerMajorTick")
    ) {
      if (i !== 0) {
        this._drawGridLine(
          i * distanceBetweenTicks + this.config.get("padding")
        );
      }
    }
    this.pen.drawOn(this.config.get("drawing"));
  }

  _drawGridLine(lengthAlongAxis) {
    const startPoint = this.pointGenerator
      .fromBottomBorder(lengthAlongAxis)
      .fromRightBorder(this.config.get("padding"))
      .generate();

    const endPoint = this.pointGenerator
      .fromBottomBorder(lengthAlongAxis)
      .fromLeftBorder(this.config.get("padding"))
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
