import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { APC } from "./apc";

export class Quad extends APC implements IHiccupShape {
    get type() {
        return Type.QUAD;
    }

    copy() {
        return new Quad(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
