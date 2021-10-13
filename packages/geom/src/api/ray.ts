import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { set } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy.js";

export class Ray implements IHiccupShape {
    constructor(public pos: Vec, public dir: Vec, public attribs?: Attribs) {}

    get type() {
        return "ray";
    }

    copy(): Ray {
        return new Ray(
            set([], this.pos),
            set([], this.dir),
            __copyAttribs(this)
        );
    }

    toHiccup() {
        return [
            "line",
            this.attribs,
            this.pos,
            maddN2([], this.dir, 1e6, this.pos),
        ];
    }
}
