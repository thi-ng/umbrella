import type { IHiccupShape } from "@thi.ng/geom-api";
import { copyShape } from "../internal/copy-shape";
import { APC } from "./apc";

export class Points extends APC implements IHiccupShape {
    get type() {
        return "points";
    }

    copy(): Points {
        return <Points>copyShape(Points, this);
    }

    toHiccup() {
        return ["points", this.attribs, this.points];
    }
}

export class Points3 extends APC implements IHiccupShape {
    get type() {
        return "points3";
    }

    copy(): Points3 {
        return <Points3>copyShape(Points3, this);
    }

    toHiccup() {
        return ["points3", this.attribs, this.points];
    }
}
