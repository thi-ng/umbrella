import type { AABBLike, Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { addN2 } from "@thi.ng/vectors/addn";
import { set2 } from "@thi.ng/vectors/set";
import { subN2 } from "@thi.ng/vectors/subn";
import { __asVec } from "../internal/args.js";
import { __copyAttribs } from "../internal/copy.js";

export class Rect implements AABBLike, IHiccupShape {
    size: Vec;

    constructor(
        public pos: Vec = [0, 0],
        size: number | Vec = 1,
        public attribs?: Attribs
    ) {
        this.size = __asVec(size);
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

    withAttribs(attribs: Attribs): Rect {
        return new Rect(this.pos, this.size, attribs);
    }

    max() {
        return add2([], this.pos, this.size);
    }

    offset(offset: number) {
        subN2(null, this.pos, offset);
        addN2(null, this.size, offset * 2);
        return this;
    }

    toHiccup() {
        return ["rect", this.attribs, this.pos, this.size[0], this.size[1]];
    }
}
