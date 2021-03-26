import Point from "./point";

const utils = {
  /**
   * Maps a point in the source rect to a destination rect.
   * @param {Rect} srcRect Source Rect
   * @param {Point} srcPoint A point in the source Rect
   * @param {Rect} destRect Destination Rect to map to
   */
  mapPoint: (srcRect, srcPoint, destRect) => {
    const mappedX = ((srcPoint.x - srcRect.x0) / srcRect.width) * destRect.width + destRect.x0;
    const mappedY = ((srcPoint.y - srcRect.y0) / srcRect.height) * destRect.height + destRect.y0;
    return new Point(mappedX, mappedY);
  },

  /**
   * Clamps a point in the bounds of a Rect.
   *
   * @param {Point} point Point to be clamped
   * @param {Rect} rect Bounding box
   */
  clamp: (point, rect) => {
    const newPoint = new Point(point.x, point.y);
    if (newPoint.x < rect.x0) newPoint.x = rect.x0;
    if (newPoint.x > rect.x1) newPoint.x = rect.x1;
    if (newPoint.y < rect.y0) newPoint.y = rect.y0;
    if (newPoint.y > rect.y1) newPoint.y = rect.y1;
    return newPoint;
  },

  getTextMetrics: (text, font) => {
    const textMeasure = document.getElementById("text-measure-util");

    textMeasure.style.font = font;
    textMeasure.innerText = text;

    const height = textMeasure.clientHeight + 1;
    const width = textMeasure.clientWidth + 1;

    return { height, width };
  },

  randomColor: () => {
    const randomColorComponent = () => Math.floor(Math.random() * 256);
    return `rgb(${randomColorComponent()}, ${randomColorComponent()}, ${randomColorComponent()})`;
  },

  getDefault: (object, path, defaultVal = undefined) => {
    keys = path.split(".");
    if (keys.length == 0) return defaultVal;
    ret = object;
    for (const key of keys) {
      if (ret && Object.hasOwnProperty(ret, key)) ret = ret[key];
      else return defaultVal;
    }
    return ret;
  },
};
export default utils;
