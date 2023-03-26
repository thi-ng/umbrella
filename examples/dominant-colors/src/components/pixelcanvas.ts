// thi.ng/rdom UI component
// creates a canvas element and blits given pixel buffer into it

import type { IntBuffer } from "@thi.ng/pixel";
import { Component, type NumOrElement } from "@thi.ng/rdom";

// when the component mounts
export class PixelCanvas extends Component {
	constructor(protected buffer: IntBuffer) {
		super();
	}

	async mount(parent: Element, index?: NumOrElement) {
		const buf = this.buffer;
		this.el = this.$el(
			"canvas",
			{ width: buf.width, height: buf.height, class: "dib v-top" },
			null,
			parent,
			index
		);
		buf.blitCanvas(<HTMLCanvasElement>this.el);
		return this.el;
	}
}
