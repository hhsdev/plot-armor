import Point from "./point";

export default class Tooltip {
  constructor(config) {
    this._drawing = config.drawing;
    this._node = document.createElement("span");
    this._node.setAttribute("class", "plt-armor-tooltip");
    this._drawing.frame.appendChild(this._node);
    this.hide();
  }

  _createDataLine(color, label, value) {
    const colorBlock = document.createElement("span");
    colorBlock.style.display = "inline-block";
    colorBlock.style.width = "8px";
    colorBlock.style.height = "8px";
    colorBlock.style.border = "1px solid white";
    colorBlock.style.marginRight = "0.5em";
    colorBlock.style.background = color;

    const p = document.createElement("p");
    p.innerText = `${label}: ${value}`;
    p.prepend(colorBlock);
    return p;
  }

  /**
   * Hides the tooltip.
   */
  hide() {
    this._visible = false;
    this.draw();
  }

  /**
   * Reveals the toolip.
   * @param {Point} pos Position to show at
   */
  show(pos, values) {
    if (pos) this.setPosition(pos);
    this._visible = true;
    this.draw(values);
  }

  /**
   * Sets the position.
   * @param {Point} pos Position
   */
  setPosition(pos) {
    this._node.style.position = "absolute";
    // we add 10 here to account for the tooltip "arrow"
    // on the left
    this._node.style.left = pos.x + 10 + "px";
    this._node.style.top = "10%";
  }

  /**
   * Draws the tooltip.
   */
  draw(values) {
    if (!this._visible) {
      try {
        this._node.style.opacity = 0;
      } catch (err) {
        console.warn(err);
      }
    } else {
      this._node.innerHTML = "";
      for (const { data, color } of values) {
        this._node.append(this._createDataLine(color, "", data.y));
      }
      this._node.style.opacity = 1;
    }
  }
}
