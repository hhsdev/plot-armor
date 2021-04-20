import Point from "./point";

export default class Tooltip {
  constructor(config) {
    this._drawing = config.drawing;
    this._node = document.createElement("span");
    this._node.setAttribute("class", "plt-armor-tooltip");
    this._node.append(this._createDataLine('#449dd1', 'value of blue', 30));
    this._node.append(this._createDataLine('#f42601', 'value of red-ed-ed-ed', 50));
    this._visible = true;
  }

  _createDataLine(color, label, value) {
    const colorBlock = document.createElement('span');
    colorBlock.style.display = "inline-block";
    colorBlock.style.width = "8px";
    colorBlock.style.height = "8px";
    colorBlock.style.border = "1px solid white";
    colorBlock.style.marginRight = "0.5em";
    colorBlock.style.background = color;

    const p = document.createElement('p');
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
  show(pos) {
    if (pos) this.setPosition(pos);
    this._visible = true;
    this.draw();
  }

  /**
   * Sets the position.
   * @param {Point} pos Position
   */
  setPosition(pos) {}

  /**
   * Draws the tooltip.
   */
  draw() {
    if (!this._visible) {
      try {
        this._drawing.frame.removeChild(this._node);
      } catch (err) {
        console.warn(err);
      }
    } else {
      this._drawing.frame.appendChild(this._node);
    }
  }
}
