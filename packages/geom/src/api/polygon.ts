import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";
import { APC } from "./apc";

export class Polygon extends APC implements IHiccupShape {
    get type() {
        return Type.POLYGON;
    }

    copy(): Polygon {
        return new Polygon(copyVectors(this.points), copyAttribs(this));
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
