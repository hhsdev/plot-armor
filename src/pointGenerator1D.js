"use strict";

export default class PointGenerator1D {
  constructor(orientation, x0, y0, x1, y1) {
    if (orientation === "horizontal") {
      this.isHorizontal = true;
    } else if (orientation === "vertical") {
      this.isHorizontal = false;
    } else {
      console.trace("Error: unregconized orientation: " + orientation);
    }

    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.x = null;
    this.y = null;
  }

  lengthAlongAxisIs(length) {
    if (this.isHorizontal) {
      this.x = length;
    } else {
      this.y = length;
    }
    return this;
  }

  lengthOrthogonalToAxisIs() {
    if (this.isHorizontal) {
      this.y = length;
    } else {
      this.x = length;
    }
    return this;
  }

  fromBaseBorder(distance) {
    if (this.isHorizontal) {
      this.y = this.y1 - distance;
    } else {
      this.x = this.x0 + distance;
    }
    return this;
  }

  fromTopBorder(distance) {
    if (this.isHorizontal) {
      this.y = this.y0 + distance;
    } else {
      this.x = this.x1 - distance;
    }
    return this;
  }

  fromStartBorder(distance) {
    if (this.isHorizontal) {
      this.x = this.x0 + distance;
    } else {
      this.y = this.y0 + distance;
    }
    return this;
  }

  fromEndBorder(distance) {
    if (this.isHorizontal) {
      this.x = this.x1 - distance;
    } else {
      this.y = this.y1 - distance;
    }
    return this;
  }

  generate() {
    return { x: this.x, y: this.y };
  }

  fromBaseStartCorner(delta) {
    if (this.isHorizontal) {
      this.x = this.x0 + delta;
      this.y = this.y1 - delta;
    } else {
      this.x = this.x0 + delta;
      this.y = this.y0 + delta;
    }
    return this;
  }

  fromBaseEndCorner(delta) {
    if (this.isHorizontal) {
      this.x = this.x1 - delta;
      this.y = this.y1 - delta;
    } else {
      this.x = this.x0 + delta;
      this.y = this.y1 - delta;
    }
    return this;
  }

  fromTopStartCorner(delta) {
    if (this.isHorizontal) {
      this.x = this.x1 + delta;
      this.y = this.y0 + delta;
    } else {
      this.x = this.x1 - delta;
      this.y = this.y0 + delta;
    }
    return this;
  }

  fromTopEndCorner(delta) {
    if (this.isHorizontal) {
      this.x = this.x1 - delta;
      this.y = this.y0 + delta;
    } else {
      this.x = this.x1 - delta;
      this.y = this.y0 + delta;
    }
    return this;
  }

  fromHalfMajorAxis(delta) {
    if (this.isHorizontal) {
      this.x = (this.x0 + this.x1) / 2 + delta;
    } else {
      this.y = (this.y0 + this.y1) / 2 + delta;
    }
    return this;
  }

  fromHalfMinorAxis(delta) {
    if (this.isHorizontal) {
      this.y = (this.y0 + this.y1) / 2 + delta;
    } else {
      this.x = (this.x0 + this.x1) / 2 + delta;
    }
    return this;
  }
}
