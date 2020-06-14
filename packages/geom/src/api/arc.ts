import { equiv } from "@thi.ng/equiv";
import {
    Attribs,
    IHiccupPathSegment,
    IHiccupShape,
    Type,
} from "@thi.ng/geom-api";
import {
    pointAt as arcPointAt,
    pointAtTheta as arcPointAtTheta,
} from "@thi.ng/geom-arc";
import { set, Vec } from "@thi.ng/vectors";
import { copyAttribs } from "../internal/copy-attribs";

export class Arc implements IHiccupShape, IHiccupPathSegment {
    pos: Vec;
    r: Vec;
    start: number;
    end: number;
    axis: number;
    xl: boolean;
    cw: boolean;
    attribs?: Attribs;

    constructor(
        pos: Vec,
        r: Vec,
        axis: number,
        start: number,
        end: number,
        xl = false,
        cw = false,
        attribs?: Attribs
    ) {
        this.pos = pos;
        this.r = r;
        this.axis = axis;
        this.start = start;
        this.end = end;
        this.xl = xl;
        this.cw = cw;
        this.attribs = attribs;
    }

    get type() {
        return Type.ARC;
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
            copyAttribs(this)
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
