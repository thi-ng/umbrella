import type { IHiccupShape } from "@thi.ng/geom-api";
import { copyShape } from "../internal/copy-shape";
import { APC } from "./apc";

export class Quad3 extends APC implements IHiccupShape {
    get type() {
        return "quad3";
    }

    copy(): Quad3 {
        return <Quad3>copyShape(Quad3, this);
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
