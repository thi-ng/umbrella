import { isNumber } from "@thi.ng/checks";
import {
    AABBLike,
    Attribs,
    IHiccupShape,
    Type
} from "@thi.ng/geom-api";
import { add2, set, Vec } from "@thi.ng/vectors";

export class Rect implements AABBLike, IHiccupShape {
    pos: Vec;
    size: Vec;
    attribs?: Attribs;

    constructor(pos: Vec = [0, 0], size: number | Vec = 1, attribs?: Attribs) {
        this.pos = pos;
        this.size = isNumber(size) ? [size, size] : size;
        this.attribs = attribs;
    }

    get type() {
        return Type.RECT;
    }

    copy() {
        return new Rect(set([], this.pos), set([], this.size), {
            ...this.attribs
        });
    }

    max() {
        return add2([], this.pos, this.size);
    }

    toHiccup() {
        return ["rect", this.attribs, this.pos, this.size[0], this.size[1]];
    }
}
