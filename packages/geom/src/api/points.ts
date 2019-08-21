import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyShape } from "../internal/copy-shape";
import { APC } from "./apc";

export class Points extends APC implements IHiccupShape {
    get type() {
        return Type.POINTS;
    }

    copy(): Points {
        return <Points>copyShape(Points, this);
    }

    toHiccup() {
        return ["points", this.attribs, this.points];
    }
}
