import { equiv } from "@thi.ng/equiv";
import type {
    Attribs,
    IHiccupPathSegment,
    IHiccupShape,
} from "@thi.ng/geom-api";
import {
    pointAt as arcPointAt,
    pointAtTheta as arcPointAtTheta,
} from "@thi.ng/geom-arc/point-at";
import type { Vec } from "@thi.ng/vectors";
import { set } from "@thi.ng/vectors/set";
import { __copyAttribs } from "../internal/copy";

export class Arc implements IHiccupShape, IHiccupPathSegment {
    constructor(
        public pos: Vec,
        public r: Vec,
        public axis: number,
        public start: number,
        public end: number,
        public xl = false,
        public cw = false,
        public attribs?: Attribs
    ) {}

    get type() {
        return "arc";
    }

    copy(): Arc {
        return new Arc(
            set([], this.pos),
            set([], this.r),
            this.axis,
            this.start,
            this.end,
            this.xl,
            this.cw,
            __copyAttribs(this)
        );
    }

    equiv(o: any) {
        return (
            o instanceof Arc &&
            equiv(this.pos, o.pos) &&
            equiv(this.r, o.r) &&
            this.start === o.start &&
            this.end === o.end &&
            this.axis === o.axis &&
            this.xl === o.xl &&
            this.cw &&
            o.cw
        );
    }

    pointAt(t: number, out: Vec = []) {
        return arcPointAt(
            this.pos,
            this.r,
            this.axis,
            this.start,
            this.end,
            t,
            out
        );
    }

    pointAtTheta(theta: number, out: Vec = []) {
        return arcPointAtTheta(this.pos, this.r, this.axis, theta, out);
    }

    toHiccup() {
        return [
            "path",
            this.attribs,
            [["M", this.pointAt(0)], ...this.toHiccupPathSegments()],
        ];
    }

    toHiccupPathSegments() {
        return [
            [
                "A",
                this.r[0],
                this.r[1],
                this.axis,
                this.xl,
                this.cw,
                this.pointAt(1),
            ],
        ];
    }
}
