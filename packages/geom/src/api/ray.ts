import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { maddN2, set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

export class Ray implements IHiccupShape {
    constructor(public pos: Vec, public dir: Vec, public attribs?: Attribs) {}

    get type() {
        return Type.RAY;
    }

    copy(): Ray {
        return new Ray(set([], this.pos), set([], this.dir), copyAttribs(this));
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
