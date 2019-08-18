import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { APC } from "./apc";

export class Triangle extends APC implements IHiccupShape {
    get type() {
        return Type.TRIANGLE;
    }

    copy() {
        return new Triangle(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
