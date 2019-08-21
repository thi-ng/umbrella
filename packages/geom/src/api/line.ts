import { IHiccupPathSegment, IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";
import { APC } from "./apc";

export class Line extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return Type.LINE;
    }

    copy(): Line {
        return new Line(copyVectors(this.points), copyAttribs(this));
    }

    toHiccup() {
        return ["line", this.attribs, this.points[0], this.points[1]];
    }

    toHiccupPathSegments() {
        const [a, b] = this.points;
        return [
            a[0] === b[0] ? ["V", b[1]] : a[1] === b[1] ? ["H", b[0]] : ["L", b]
        ];
    }
}
