import { isNumber } from "@thi.ng/checks";
import { AABBLike, Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { add2, set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

export class Rect implements AABBLike, IHiccupShape {
    size: Vec;

    constructor(
        public pos: Vec = [0, 0],
        size: number | Vec = 1,
        public attribs?: Attribs
    ) {
        this.size = isNumber(size) ? [size, size] : size;
    }

    get type() {
        return Type.RECT;
    }

    copy(): Rect {
        return new Rect(
            set([], this.pos),
            set([], this.size),
            copyAttribs(this)
        );
    }

    max() {
        return add2([], this.pos, this.size);
    }

    toHiccup() {
        return ["rect", this.attribs, this.pos, this.size[0], this.size[1]];
    }
}
