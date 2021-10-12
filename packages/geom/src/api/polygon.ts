import type { IHiccupShape } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy";
import { APC } from "./apc";

export class Polygon extends APC implements IHiccupShape {
    get type() {
        return "poly";
    }

    copy(): Polygon {
        return <Polygon>__copyShape(Polygon, this);
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
