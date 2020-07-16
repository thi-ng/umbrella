import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { set3, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

export class Sphere implements IHiccupShape {
    constructor(
        public pos: Vec = [0, 0, 0],
        public r = 1,
        public attribs?: Attribs
    ) {}

    get type() {
        return Type.SPHERE;
    }

    copy(): Sphere {
        return new Sphere(set3([], this.pos), this.r, copyAttribs(this));
    }

    toHiccup() {
        return ["sphere", this.attribs, this.pos, this.r];
    }
}
