import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { set, Vec } from "@thi.ng/vectors";

export class Plane implements IHiccupShape {
    normal: Vec;
    w: number;
    attribs?: Attribs;

    constructor(normal: Vec = [0, 1, 0], w = 0, attribs?: Attribs) {
        this.normal = normal;
        this.w = w;
        this.attribs = attribs;
    }

    get type() {
        return Type.PLANE;
    }

    copy() {
        return new Plane(set([], this.normal), this.w, { ...this.attribs });
    }

    toHiccup() {
        return ["plane", this.attribs, this.normal, this.w];
    }
}
