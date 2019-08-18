import { isNumber } from "@thi.ng/checks";
import { AABBLike, Attribs, Type } from "@thi.ng/geom-api";
import { add3, set, Vec } from "@thi.ng/vectors";

export class AABB implements AABBLike {
    pos: Vec;
    size: Vec;
    attribs?: Attribs;

    constructor(
        pos: Vec = [0, 0, 0],
        size: number | Vec = 1,
        attribs?: Attribs
    ) {
        this.pos = pos;
        this.size = isNumber(size) ? [size, size, size] : size;
        this.attribs = attribs;
    }

    get type() {
        return Type.AABB;
    }

    copy() {
        return new AABB(set([], this.pos), set([], this.size), {
            ...this.attribs
        });
    }

    max() {
        return add3([], this.pos, this.size);
    }
}
