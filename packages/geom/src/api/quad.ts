import type { IHiccupShape } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Quad extends APC implements IHiccupShape {
    get type() {
        return "quad";
    }

    copy(): Quad {
        return <Quad>__copyShape(Quad, this);
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
