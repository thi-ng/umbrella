import type { IHiccupPathSegment, IHiccupShape } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy";
import { APC } from "./apc";

export class Polyline extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return "polyline";
    }

    copy(): Polyline {
        return <Polyline>__copyShape(Polyline, this);
    }

    toHiccup() {
        return ["polyline", { ...this.attribs, fill: "none" }, this.points];
    }

    toHiccupPathSegments() {
        const res: any[] = [];
        for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
            res.push(["L", pts[i]]);
        }
        return res;
    }
}
