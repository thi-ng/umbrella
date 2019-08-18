import { isNumber } from "@thi.ng/checks";
import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { set, Vec } from "@thi.ng/vectors";

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

    copy() {
        return new Ellipse(set([], this.pos), set([], this.r), {
            ...this.attribs
        });
    }

    toHiccup() {
        return ["ellipse", this.attribs, this.pos, this.r];
    }
}
