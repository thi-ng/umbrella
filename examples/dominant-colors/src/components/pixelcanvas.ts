// thi.ng/rdom UI component
// creates a canvas element and blits given pixel buffer into it

import { Component, NumOrElement } from "@thi.ng/rdom";
import type { PackedBuffer } from "@thi.ng/pixel";

// when the component mounts
export class PixelCanvas extends Component {
    constructor(protected buffer: PackedBuffer) {
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
