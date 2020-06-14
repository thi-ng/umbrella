import { IHiccupPathSegment, IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyShape } from "../internal/copy-shape";
import { APC } from "./apc";

export class Line extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return Type.LINE;
    }

    copy(): Line {
        return <Line>copyShape(Line, this);
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
