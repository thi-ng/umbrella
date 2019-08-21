import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";
import { APC } from "./apc";

export class Quad extends APC implements IHiccupShape {
    get type() {
        return Type.QUAD;
    }

    copy(): Quad {
        return new Quad(copyVectors(this.points), copyAttribs(this));
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
