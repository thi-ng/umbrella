import { isNumber } from "@thi.ng/checks/is-number";
import type { AABBLike, Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { add3 } from "@thi.ng/vectors/add";
import { addN3 } from "@thi.ng/vectors/addn";
import { set } from "@thi.ng/vectors/set";
import { subN3 } from "@thi.ng/vectors/subn";
import { __copyAttribs } from "../internal/copy.js";

export class AABB implements AABBLike {
    size: Vec;

    constructor(
        public pos: Vec = [0, 0, 0],
        size: number | Vec = 1,
        public attribs?: Attribs
    ) {
        this.size = isNumber(size) ? [size, size, size] : size;
    }

    get type() {
        return "aabb";
    }

    copy(): AABB {
        return new AABB(
            set([], this.pos),
            set([], this.size),
            __copyAttribs(this)
        );
    }

    max() {
        return add3([], this.pos, this.size);
    }

    offset(offset: number) {
        subN3(null, this.pos, offset);
        addN3(null, this.size, offset * 2);
        return this;
    }
}
