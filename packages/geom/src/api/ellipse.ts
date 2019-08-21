import { isNumber } from "@thi.ng/checks";
import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

export class Ellipse implements IHiccupShape {
    pos: Vec;
    r: Vec;
    attribs?: Attribs;

    constructor(
        pos: Vec = [0, 0],
        r: number | Vec = [1, 1],
        attribs?: Attribs
    ) {
        this.pos = pos;
        this.r = isNumber(r) ? [r, r] : r;
        this.attribs = attribs;
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
