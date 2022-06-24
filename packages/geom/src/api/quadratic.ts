import type {
    Attribs,
    IHiccupPathSegment,
    IHiccupShape,
} from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Quadratic extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return "quadratic";
    }

    copy(): Quadratic {
        return <Quadratic>__copyShape(Quadratic, this);
    }

    withAttribs(attribs: Attribs): Quadratic {
        return new Quadratic(this.points, attribs);
    }

    toHiccup() {
        return [
            "path",
            this.attribs,
            [["M", this.points[0]], ...this.toHiccupPathSegments()],
        ];
    }

    toHiccupPathSegments() {
        const pts = this.points;
        return [["Q", pts[1], pts[2]]];
    }
}
