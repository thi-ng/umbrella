import { isNumber } from "@thi.ng/checks";
import { AABBLike, Attribs, Type } from "@thi.ng/geom-api";
import { add3, set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

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
        return Type.AABB;
    }

    copy(): AABB {
        return new AABB(
            set([], this.pos),
            set([], this.size),
            copyAttribs(this)
        );
    }

    max() {
        return add3([], this.pos, this.size);
    }
}
