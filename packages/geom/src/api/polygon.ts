import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { APC } from "./apc";

export class Polygon extends APC implements IHiccupShape {
    get type() {
        return Type.POLYGON;
    }

    copy() {
        return new Polygon(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
