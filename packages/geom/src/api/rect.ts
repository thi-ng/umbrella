import { isNumber } from "@thi.ng/checks/is-number";
import type { AABBLike, Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { set2 } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy.js";

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
        return "rect";
    }

    copy(): Rect {
        return new Rect(
            set2([], this.pos),
            set2([], this.size),
            __copyAttribs(this)
        );
    }

    max() {
        return add2([], this.pos, this.size);
    }

    toHiccup() {
        return ["rect", this.attribs, this.pos, this.size[0], this.size[1]];
    }
}
