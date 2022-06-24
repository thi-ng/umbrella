import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Points extends APC implements IHiccupShape {
    get type() {
        return "points";
    }

    copy(): Points {
        return <Points>__copyShape(Points, this);
    }

    withAttribs(attribs: Attribs): Points {
        return new Points(this.points, attribs);
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
        return <Points3>__copyShape(Points3, this);
    }

    withAttribs(attribs: Attribs): Points3 {
        return new Points3(this.points, attribs);
    }

    toHiccup() {
        return ["points3", this.attribs, this.points];
    }
}
