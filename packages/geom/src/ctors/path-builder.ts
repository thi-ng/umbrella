import { peek } from "@thi.ng/arrays";
import type { Attribs } from "@thi.ng/geom-api";
import { eqDelta } from "@thi.ng/math";
import { add2, copy, mulN2, set2, sub2, Vec, zeroes } from "@thi.ng/vectors";
import { Cubic } from "../api/cubic";
import { Line } from "../api/line";
import { Path } from "../api/path";
import { Quadratic } from "../api/quadratic";
import { arcFrom2Points } from "./arc";

export interface PathBuilderOpts {
    /**
     * If true (default), "move" commands will start a new path and
     * {@link PathBuilder} might produce multiple {@link Path}s. In general,
     * it's NOT recommended to disable this behavior since various path related
     * operations will not function properly anymore. However, there're some use
     * cases where auto-splitting is undesirable and this option primarily
     * exists for those.
     */
    autoSplit: boolean;
}

export class PathBuilder {
    paths: Path[];
    protected curr!: Path;
    protected currP!: Vec;
    protected bezierP!: Vec;
    protected startP!: Vec;

    constructor(
        public attribs?: Attribs,
        public opts: Partial<PathBuilderOpts> = {}
    ) {
        this.paths = [];
        this.attribs = attribs;
        this.newPath();
    }

    *[Symbol.iterator]() {
        yield* this.paths;
    }

    current() {
        return this.curr;
    }

    newPath() {
        this.curr = new Path([], this.attribs);
        this.paths.push(this.curr);
        this.currP = zeroes(2);
        this.bezierP = zeroes(2);
        this.startP = zeroes(2);
    }

    moveTo(p: Vec, relative = false): PathBuilder {
        if (this.opts.autoSplit !== false && this.curr.segments.length > 0) {
            this.curr = new Path([], this.attribs);
            this.paths.push(this.curr);
        }
        p = this.updateCurrent(p, relative);
        set2(this.startP, p);
        set2(this.bezierP, p);
        this.curr.add({
            point: p,
            type: "m",
        });
        return this;
    }

    lineTo(p: Vec, relative = false): PathBuilder {
        this.curr.add({
            geo: new Line([copy(this.currP), this.updateCurrent(p, relative)]),
            type: "l",
        });
        set2(this.bezierP, this.currP);
        return this;
    }

    hlineTo(x: number, relative = false): PathBuilder {
        this.addHVLine(x, 0, relative);
        return this;
    }

    vlineTo(y: number, relative = false): PathBuilder {
        this.addHVLine(y, 1, relative);
        return this;
    }

    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Cubic_B%C3%A9zier_Curve
    cubicTo(cp1: Vec, cp2: Vec, p: Vec, relative = false) {
        this.addCubic(this.absPoint(cp1, relative), cp2, p, relative);
        return this;
    }

    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Quadratic_B%C3%A9zier_Curve
    quadraticTo(cp: Vec, p: Vec, relative = false) {
        this.addQuadratic(this.absPoint(cp, relative), p, relative);
        return this;
    }

    cubicChainTo(cp2: Vec, p: Vec, relative = false) {
        const prevMode = peek(this.curr.segments).type;
        const c1 = copy(this.currP);
        prevMode === "c" && add2(null, sub2([], c1, this.bezierP), c1);
        this.addCubic(c1, cp2, p, relative);
        return this;
    }

    quadraticChainTo(p: Vec, relative = false) {
        const prevMode = peek(this.curr.segments).type;
        const c1 = copy(this.currP);
        prevMode === "q" && sub2(null, mulN2(null, c1, 2), this.bezierP);
        this.addQuadratic(c1, p, relative);
        return this;
    }

    arcTo(
        p: Vec,
        r: Vec,
        xaxis: number,
        xl: boolean,
        clockwise: boolean,
        relative = false
    ) {
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
            type: "a",
        });
        set2(this.bezierP, this.currP);
        return this;
    }

    closePath() {
        this.curr.add({
            geo: new Line([copy(this.currP), copy(this.startP)]),
            type: "l",
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

    protected addHVLine(p: number, i: number, relative: boolean) {
        const prev = copy(this.currP);
        this.currP[i] = relative ? this.currP[i] + p : p;
        set2(this.bezierP, this.currP);
        this.curr.add({
            geo: new Line([prev, copy(this.currP)]),
            type: "l",
        });
    }

    protected addCubic(cp1: Vec, cp2: Vec, p: Vec, relative: boolean) {
        cp2 = this.absPoint(cp2, relative);
        set2(this.bezierP, cp2);
        this.curr.add({
            geo: new Cubic([
                copy(this.currP),
                cp1,
                cp2,
                this.updateCurrent(p, relative),
            ]),
            type: "c",
        });
    }

    protected addQuadratic(cp: Vec, p: Vec, relative: boolean) {
        set2(this.bezierP, cp);
        this.curr.add({
            geo: new Quadratic([
                copy(this.currP),
                cp,
                this.updateCurrent(p, relative),
            ]),
            type: "q",
        });
    }
}

export const pathBuilder = (
    attribs?: Attribs,
    opts?: Partial<PathBuilderOpts>
) => new PathBuilder(attribs, opts);
