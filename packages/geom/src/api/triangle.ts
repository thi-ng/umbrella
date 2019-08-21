import { IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyShape } from "../internal/copy-shape";
import { APC } from "./apc";

export class Triangle extends APC implements IHiccupShape {
    get type() {
        return Type.TRIANGLE;
    }

    copy(): Triangle {
        return <Triangle>copyShape(Triangle, this);
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
