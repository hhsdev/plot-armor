"use strict";

import Point from "./point";

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
      this.y = this.y1 - distance;
    }
    return this;
  }

  generate() {
    return new Point(this.x, this.y);
  }

  fromBaseBorder(distance) {
    if (this.isHorizontal) {
      this.y = this.y1 - distance;
    } else {
      this.x = this.x0 + distance;
    }
    return this;
  }

  fromEndBorder(distance) {
    if (this.isHorizontal) {
      this.x = this.x1 - distance;
    } else {
      this.y = this.y0 + distance;
    }
    return this;
  }

  fromBaseStartCorner(delta) {
    return this.fromBaseBorder(delta).fromStartBorder(delta);
  }

  fromBaseEndCorner(delta) {
    return this.fromBaseBorder(delta).fromEndBorder(delta);
  }

  fromTopStartCorner(delta) {
    return this.fromTopBorder(delta).fromStartBorder(delta);
  }

  fromTopEndCorner(delta) {
    return this.fromTopBorder(delta).fromEndBorder(delta);
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
