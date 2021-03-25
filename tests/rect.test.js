import { Rect } from "../src/rect";

describe("The Rect class", () => {
  it("should correctly calculate the dimensions", () => {
    const rect = new Rect({ x0: 5, y0: 3, x1: 10, y1: 10 });
    expect(rect.width).toEqual(5);
    expect(rect.height).toEqual(7);
  });
});