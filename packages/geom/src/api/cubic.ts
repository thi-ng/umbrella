import type { Attribs, IHiccupPathSegment } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Cubic extends APC implements IHiccupPathSegment {
    get type() {
        return "cubic";
    }

    copy(): Cubic {
        return <Cubic>__copyShape(Cubic, this);
    }

    withAttribs(attribs: Attribs): Cubic {
        return new Cubic(this.points, attribs);
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
        return [["C", pts[1], pts[2], pts[3]]];
    }
}
