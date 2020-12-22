import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

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
        return new Plane(set([], this.normal), this.w, copyAttribs(this));
    }

    toHiccup() {
        return ["plane", this.attribs, this.normal, this.w];
    }
}
