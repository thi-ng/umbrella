import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

export class Circle implements IHiccupShape {
    constructor(
        public pos: Vec = [0, 0],
        public r = 1,
        public attribs?: Attribs
    ) {}

    get type() {
        return "circle";
    }

    copy(): Circle {
        return new Circle(set([], this.pos), this.r, copyAttribs(this));
    }

    toHiccup() {
        return ["circle", this.attribs, this.pos, this.r];
    }
}
