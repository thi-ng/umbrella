import { IHiccupPathSegment, IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { APC } from "./apc";

export class Quadratic extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return Type.QUADRATIC;
    }

    copy() {
        return new Quadratic(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return [
            "path",
            this.attribs,
            [["M", this.points[0]], ...this.toHiccupPathSegments()]
        ];
    }

    toHiccupPathSegments() {
        const pts = this.points;
        return [["Q", pts[1], pts[2]]];
    }
}
