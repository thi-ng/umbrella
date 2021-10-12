import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { set } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy";

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
        return new Circle(set([], this.pos), this.r, __copyAttribs(this));
    }

    toHiccup() {
        return ["circle", this.attribs, this.pos, this.r];
    }
}
