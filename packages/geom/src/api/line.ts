import type {
    Attribs,
    IHiccupPathSegment,
    IHiccupShape,
} from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Line extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return "line";
    }

    copy(): Line {
        return <Line>__copyShape(Line, this);
    }

    withAttribs(attribs: Attribs): Line {
        return new Line(this.points, attribs);
    }

    toHiccup() {
        return ["line", this.attribs, this.points[0], this.points[1]];
    }

    toHiccupPathSegments() {
        const [a, b] = this.points;
        return [
            a[0] === b[0]
                ? ["V", b[1]]
                : a[1] === b[1]
                ? ["H", b[0]]
                : ["L", b],
        ];
    }
}
