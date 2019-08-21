import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";
import { APC } from "./apc";

export class Points extends APC implements IHiccupShape {
    get type() {
        return Type.POINTS;
    }

    copy(): Points {
        return new Points(copyVectors(this.points), copyAttribs(this));
    }

    toHiccup() {
        return ["points", this.attribs, this.points];
    }
}
