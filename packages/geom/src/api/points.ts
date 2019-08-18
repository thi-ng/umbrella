import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { APC } from "./apc";

export class Points extends APC implements IHiccupShape {
    get type() {
        return Type.POINTS;
    }

    copy() {
        return new Points(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["points", this.attribs, this.points];
    }
}
