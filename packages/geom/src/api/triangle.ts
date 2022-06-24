import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Triangle extends APC implements IHiccupShape {
    get type() {
        return "tri";
    }

    copy(): Triangle {
        return <Triangle>__copyShape(Triangle, this);
    }

    withAttribs(attribs: Attribs): Triangle {
        return new Triangle(this.points, attribs);
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
