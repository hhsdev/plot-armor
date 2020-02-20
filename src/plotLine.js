class PlotLine {
  constructor(width, height, maxX, maxY, dataset, drawing, xOffset, yOffset, color) {
    this.width = width;
    this.height = height;
    this.maxX = maxX;
    this.maxY = maxY;
    this.dataset = dataset;
    this.drawing = drawing;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.html = '';

    this.pen = new LinePen().setThickness(1).setLineColor(color);
    this.pointGenerator = new PointGenerator(0, 0, width, height);
  }

  draw() {
    if (this.dataset.length === 0) return;
    this.pen.startAt(this.normalize(this.dataset[0]));
    for (let i = 1; i < this.dataset.length; ++i) {
      console.log(this.dataset[i]);
      const coordinate = this.normalize(this.dataset[i]);
      this.pen.lineTo(coordinate);
    }

    this.pen.drawOn(this.drawing);
  }


  normalize(point) {

    return { x : this.xOffset + (point.x * (this.width / this.maxX)), y: this.height - (this.yOffset + (point.y * (this.height/ this.maxY))) };
  }
}