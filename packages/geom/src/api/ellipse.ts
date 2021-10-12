import { isNumber } from "@thi.ng/checks/is-number";
import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { set } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy";

export class Ellipse implements IHiccupShape {
    r: Vec;

    constructor(
        public pos: Vec = [0, 0],
        r: number | Vec = [1, 1],
        public attribs?: Attribs
    ) {
        this.r = isNumber(r) ? [r, r] : r;
    }

    get type() {
        return "ellipse";
    }

    copy(): Ellipse {
        return new Ellipse(
            set([], this.pos),
            set([], this.r),
            __copyAttribs(this)
        );
    }

    toHiccup() {
        return ["ellipse", this.attribs, this.pos, this.r];
    }
}
