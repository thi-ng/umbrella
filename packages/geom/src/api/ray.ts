import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { maddN2, set, Vec } from "@thi.ng/vectors";

export class Ray implements IHiccupShape {
    pos: Vec;
    dir: Vec;
    attribs?: Attribs;

    constructor(pos: Vec, dir: Vec, attribs?: Attribs) {
        this.pos = pos;
        this.dir = dir;
        this.attribs = attribs;
    }

    get type() {
        return Type.RAY;
    }

    copy() {
        return new Ray(set([], this.pos), set([], this.dir), {
            ...this.attribs
        });
    }

    toHiccup() {
        return [
            "line",
            this.attribs,
            this.pos,
            maddN2([], this.dir, 1e6, this.pos)
        ];
    }
}
