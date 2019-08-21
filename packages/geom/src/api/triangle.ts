import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";
import { APC } from "./apc";

export class Triangle extends APC implements IHiccupShape {
    get type() {
        return Type.TRIANGLE;
    }

    copy(): Triangle {
        return new Triangle(copyVectors(this.points), copyAttribs(this));
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
