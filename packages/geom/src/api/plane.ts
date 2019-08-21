import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

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

    copy(): Plane {
        return new Plane(set([], this.normal), this.w, copyAttribs(this));
    }

    toHiccup() {
        return ["plane", this.attribs, this.normal, this.w];
    }
}
