import { isNumber } from "@thi.ng/checks";
import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

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
        return Type.ELLIPSE;
    }

    copy(): Ellipse {
        return new Ellipse(
            set([], this.pos),
            set([], this.r),
            copyAttribs(this)
        );
    }

    toHiccup() {
        return ["ellipse", this.attribs, this.pos, this.r];
    }
}
