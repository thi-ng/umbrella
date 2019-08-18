import { IHiccupPathSegment, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { APC } from "./apc";

export class Cubic extends APC implements IHiccupPathSegment {
    get type() {
        return Type.CUBIC;
    }

    copy() {
        return new Cubic(copyVectors(this.points), { ...this.attribs });
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
        return [["C", pts[1], pts[2], pts[3]]];
    }
}
