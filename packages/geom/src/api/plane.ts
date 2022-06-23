import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { set3 } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy.js";

export class Plane implements IHiccupShape {
    constructor(
        public normal: Vec = [0, 1, 0],
        public w = 0,
        public attribs?: Attribs
    ) {}

    get type() {
        return "plane";
    }

    copy(): Plane {
        return new Plane(set3([], this.normal), this.w, __copyAttribs(this));
    }

    toHiccup() {
        return ["plane", this.attribs, this.normal, this.w];
    }
}
