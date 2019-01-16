import { isNumber } from "@thi.ng/checks";
import { eqDelta } from "@thi.ng/math";
import { map, mapcat, peek } from "@thi.ng/transducers";
import {
    add2,
    copy,
    maddN2,
    mulN2,
    set2,
    sub2,
    Vec,
    zeroes
} from "@thi.ng/vectors3";
import {
    Attribs,
    Cubic,
    Line,
    Path,
    PathSegment,
    Quadratic,
    SegmentType
} from "../api";
import { asCubic } from "../ops/as-cubic";
import { arcFrom2Points } from "./arc";

export const path =
    (segments: PathSegment[], attribs?: Attribs) =>
        new Path(segments, attribs);

export const normalizedPath =
    (path: Path) =>
        new Path(
            [...mapcat((s) =>
                s.geo ?
                    map<Cubic, PathSegment>(
                        (c) => ({ type: SegmentType.CUBIC, geo: c }),
                        asCubic(s.geo)
                    ) :
                    [{ ...s }],
                path.segments
            )],
            path.attribs
        );

export const roundedRect =
    (pos: Vec, size: Vec, r: number | Vec) => {
        r = isNumber(r) ? [r, r] : r;
        const b = new PathBuilder();
        const [w, h] = maddN2([], size, r, -2);
        b.moveTo([pos[0] + r[0], pos[1]]);
        b.hlineTo(w, true);
        b.arcTo(r, r, 0, false, true, true);
        b.vlineTo(h, true);
        b.arcTo([-r[0], r[1]], r, 0, false, true, true);
        b.hlineTo(-w, true);
        b.arcTo([-r[0], -r[1]], r, 0, false, true, true);
        b.vlineTo(-h, true);
        b.arcTo([r[0], -r[1]], r, 0, false, true, true);
        return b.curr;
    };

export class PathBuilder {

    paths: Path[];
    curr: Path;
    protected currP: Vec;
    protected bezierP: Vec;
    protected startP: Vec;

    constructor() {
        this.paths = [];
        this.newPath();
    }

    *[Symbol.iterator]() {
        yield* this.paths;
    }

    newPath() {
        this.curr = new Path();
        this.paths.push(this.curr);
        this.currP = zeroes(2);
        this.bezierP = zeroes(2);
        this.startP = zeroes(2);
    }

    moveTo(p: Vec, relative = false): PathBuilder {
        if (this.curr.segments.length > 0) {
            this.curr = new Path();
            this.paths.push(this.curr);
        }
        p = this.updateCurrent(p, relative);
        set2(this.startP, p);
        set2(this.bezierP, p);
        this.curr.add({
            point: p,
            type: SegmentType.MOVE,
        });
        return this;
    }

    lineTo(p: Vec, relative = false): PathBuilder {
        this.curr.add({
            geo: new Line([
                copy(this.currP),
                this.updateCurrent(p, relative)
            ]),
            type: SegmentType.LINE,
        });
        set2(this.bezierP, this.currP);
        return this;
    }

    hlineTo(x: number, relative = false): PathBuilder {
        const prev = copy(this.currP);
        this.currP[0] = relative ? this.currP[0] + x : x;
        set2(this.bezierP, this.currP);
        this.curr.add({
            geo: new Line([prev, copy(this.currP)]),
            type: SegmentType.LINE,
        });
        return this;
    }

    vlineTo(y: number, relative = false): PathBuilder {
        const prev = copy(this.currP);
        this.currP[1] = relative ? this.currP[1] + y : y;
        set2(this.bezierP, this.currP);
        this.curr.add({
            geo: new Line([prev, copy(this.currP)]),
            type: SegmentType.LINE,
        });
        return this;
    }

    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Cubic_B%C3%A9zier_Curve
    cubicTo(cp1: Vec, cp2: Vec, p: Vec, relative = false) {
        const c2 = this.absPoint(cp2, relative);
        set2(this.bezierP, c2);
        this.curr.add({
            geo: new Cubic([
                copy(this.currP),
                this.absPoint(cp1, relative),
                c2,
                this.updateCurrent(p, relative),
            ]),
            type: SegmentType.CUBIC,
        });
        return this;
    }

    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Quadratic_B%C3%A9zier_Curve
    quadraticTo(cp: Vec, p: Vec, relative = false) {
        const c1 = this.absPoint(cp, relative);
        set2(this.bezierP, c1);
        this.curr.add({
            geo: new Quadratic([
                copy(this.currP),
                c1,
                this.updateCurrent(p, relative),
            ]),
            type: SegmentType.QUADRATIC,
        });
        return this;
    }

    cubicChainTo(cp2: Vec, p: Vec, relative = false) {
        const prevMode = peek(this.curr.segments).type;
        const c1 = copy(this.currP);
        if (prevMode === SegmentType.CUBIC) {
            add2(null, sub2([], c1, this.bezierP), c1);
        }
        const c2 = this.absPoint(cp2, relative);
        set2(this.bezierP, c2);
        this.curr.add({
            geo: new Cubic([
                copy(this.currP),
                c1,
                c2,
                this.updateCurrent(p, relative),
            ]),
            type: SegmentType.CUBIC,
        });
        return this;
    }

    quadraticChainTo(p: Vec, relative = false) {
        const prevMode = peek(this.curr.segments).type;
        const c1 = copy(this.currP);
        if (prevMode === SegmentType.QUADRATIC) {
            sub2(null, mulN2(null, c1, 2), this.bezierP);
        }
        set2(this.bezierP, c1);
        this.curr.add({
            geo: new Quadratic([
                copy(this.currP),
                c1,
                this.updateCurrent(p, relative),
            ]),
            type: SegmentType.CUBIC,
        });
        return this;
    }

    arcTo(p: Vec, r: Vec, xaxis: number, xl: boolean, clockwise: boolean, relative = false) {
        if (eqDelta(r[0], 0) || eqDelta(r[1], 0)) {
            return this.lineTo(p, relative);
        }
        const prev = copy(this.currP);
        this.curr.add({
            geo: arcFrom2Points(
                prev,
                this.updateCurrent(p, relative),
                r,
                xaxis,
                xl,
                clockwise
            ),
            type: SegmentType.ARC,
        });
        set2(this.bezierP, this.currP);
        return this;
    }

    closePath() {
        this.curr.add({
            geo: new Line([copy(this.currP), copy(this.startP)]),
            type: SegmentType.LINE,
        });
        this.curr.closed = true;
        return this;
    }

    protected updateCurrent(p: Vec, relative: boolean) {
        p = copy(relative ? add2(null, this.currP, p) : set2(this.currP, p));
        return p;
    }

    protected absPoint(p: Vec, relative: boolean) {
        return relative ? add2(null, p, this.currP) : p;
    }
}

export const pathBuilder =
    () => new PathBuilder();
