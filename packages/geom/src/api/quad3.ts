import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { APC } from "./apc";

export class Quad3 extends APC implements IHiccupShape {
    get type() {
        return Type.QUAD3;
    }

    copy() {
        return new Quad3(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
