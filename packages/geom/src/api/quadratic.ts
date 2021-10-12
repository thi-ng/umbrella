import type { IHiccupPathSegment, IHiccupShape } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy";
import { APC } from "./apc";

export class Quadratic extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return "quadratic";
    }

    copy(): Quadratic {
        return <Quadratic>__copyShape(Quadratic, this);
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
