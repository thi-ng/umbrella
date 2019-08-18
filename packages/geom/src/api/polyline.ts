import { IHiccupPathSegment, IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { APC } from "./apc";

export class Polyline extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return Type.POLYLINE;
    }

    copy() {
        return new Polyline(copyVectors(this.points), { ...this.attribs });
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
