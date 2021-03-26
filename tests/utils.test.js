import Point from "../src/point";
import { Rect } from "../src/rect";
import utils from "../src/utils";

describe("utils.mapPoint", () => {
  it("should correctly maps points", () => {
    const srcRect = new Rect({ x0: 1, y0: 1, x1: 10, y1: 10 });
    const destRect = new Rect({ x0: 2, y0: 2, x1: 5, y1: 5 });

    expect(utils.mapPoint(srcRect, new Point(1, 1), destRect)).toEqual(
      new Point(2, 2)
    );
    expect(utils.mapPoint(srcRect, new Point(10, 10), destRect)).toEqual(
      new Point(5, 5)
    );
  });

  it("should work correctly for negative sources", () => {
    const srcRect = new Rect({ x0: -1, y0: -1, x1: 10, y1: 10 });
    const destRect = new Rect({ x0: 2, y0: 2, x1: 5, y1: 5 });

    expect(utils.mapPoint(srcRect, new Point(-1, -1), destRect)).toEqual(
      new Point(2, 2)
    );
    expect(utils.mapPoint(srcRect, new Point(10, 10), destRect)).toEqual(
      new Point(5, 5)
    );
  });
});

describe("utils.clamp", () => {
  it("should not change points that are not out of bound", () => {
    const boundingRect = new Rect({ x0: 0, y0: 0, x1: 1, y1: 1 });
    expect(
      utils.clamp(new Point(0.5, 0.5), boundingRect)
    ).toEqual(new Point(0.5, 0.5));
  });

  it("should clamp points that are out of bound", () => {
    const boundingRect = new Rect({ x0: 0, y0: 0, x1: 1, y1: 1 });
    expect(
      utils.clamp(new Point(-1, -1), boundingRect)
    ).toEqual(new Point(0, 0));
    expect(
      utils.clamp(new Point(-1, 0.5), boundingRect)
    ).toEqual(new Point(0, 0.5));
  });
});
