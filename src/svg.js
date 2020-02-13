"use strict";

class Svg {
	constructor() {
		this.elementTagStart = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">';
		this.elementTagEnd = '</svg>';
		this.imageData = '';
	}

	attachTo(container) {
		console.log(this.elementTagStart + this.imageData + this.elementTagEnd);
		container.innerHTML = this.elementTagStart + this.imageData + this.elementTagEnd;
	}

	drawLine(start, end, color, thickness) {
		let pathString = '<path stroke-width="0.1" stroke="black" d="';
		pathString += 'M ' + start.x + ',' + start.y;
		pathString += 'L ' + end.x + ',' + end.y + '">';
		pathString += '</path>';
		this.imageData += pathString;
	}
}
