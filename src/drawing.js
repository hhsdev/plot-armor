"use strict";

export default class Drawing {
	constructor(width, height) {
		this.elementTagStart = '<svg width="' + width + '" height="' + height + '" xmlns="http://www.w3.org/2000/svg">';
		this.elementTagEnd = '</svg>';
		this.html = '';
	}

	attachTo(container) {
		container.innerHTML = this.elementTagStart + this.html + this.elementTagEnd;
	}
}
