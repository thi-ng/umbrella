import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { set3 } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy";

export class Sphere implements IHiccupShape {
    constructor(
        public pos: Vec = [0, 0, 0],
        public r = 1,
        public attribs?: Attribs
    ) {}

    get type() {
        return "sphere";
    }

    copy(): Sphere {
        return new Sphere(set3([], this.pos), this.r, __copyAttribs(this));
    }

    toHiccup() {
        return ["sphere", this.attribs, this.pos, this.r];
    }
}
