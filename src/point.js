import { Rect } from "./rect";

/**
 * Simple 2D Point class.
 */
export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isOutsideOf(rect) {
    return (
      this.x < rect.x0 ||
      this.x > rect.x1 ||
      this.y < rect.y0 ||
      this.y > rect.y1
    )
  }

  isNaN() {
    return isNaN(this.x) || isNaN(this.y);
  }
}