import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { set3, Vec } from "@thi.ng/vectors";

export class Sphere implements IHiccupShape {
    pos: Vec;
    r: number;
    attribs?: Attribs;

    constructor(pos: Vec = [0, 0, 0], r = 1, attribs?: Attribs) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    get type() {
        return Type.SPHERE;
    }

    copy() {
        return new Sphere(set3([], this.pos), this.r, { ...this.attribs });
    }

    toHiccup() {
        return ["sphere", this.attribs, this.pos, this.r];
    }
}
