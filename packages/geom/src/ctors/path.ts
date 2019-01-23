import { isNumber } from "@thi.ng/checks";
import { Attribs, PathSegment, SegmentType } from "@thi.ng/geom-api";
import { eqDelta, rad } from "@thi.ng/math";
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
} from "@thi.ng/vectors";
import {
    Cubic,
    Line,
    Path,
    Quadratic
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
    (pos: Vec, size: Vec, r: number | Vec, attribs?: Attribs) => {
        r = isNumber(r) ? [r, r] : r;
        const [w, h] = maddN2([], size, r, -2);
        return new PathBuilder(attribs)
            .moveTo([pos[0] + r[0], pos[1]])
            .hlineTo(w, true)
            .arcTo(r, r, 0, false, true, true)
            .vlineTo(h, true)
            .arcTo([-r[0], r[1]], r, 0, false, true, true)
            .hlineTo(-w, true)
            .arcTo([-r[0], -r[1]], r, 0, false, true, true)
            .vlineTo(-h, true)
            .arcTo([r[0], -r[1]], r, 0, false, true, true)
            .current();
    };

export class PathBuilder {

    paths: Path[];
    attribs: Attribs;
    protected curr: Path;
    protected currP: Vec;
    protected bezierP: Vec;
    protected startP: Vec;

    constructor(attribs?: Attribs) {
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
    (attribs?: Attribs) => new PathBuilder(attribs);

const CMD_RE = /[achlmqstvz]/i;

export const pathFromSvg = (svg: string) => {
    const b = new PathBuilder();
    try {
        let cmd: string;
        for (let n = svg.length, i = 0; i < n;) {
            i = skipWS(svg, i);
            const c = svg.charAt(i);
            if (CMD_RE.test(c)) {
                cmd = c;
                i++;
            }
            let p, pa, pb, t1, t2, t3;
            switch (cmd.toLowerCase()) {
                case "m":
                    [p, i] = readPoint(svg, i);
                    b.moveTo(p, cmd === "m");
                    break;
                case "l":
                    [p, i] = readPoint(svg, i);
                    b.lineTo(p, cmd === "l");
                    break;
                case "h":
                    [p, i] = readFloat(svg, i);
                    b.hlineTo(p, cmd === "h");
                    break;
                case "v":
                    [p, i] = readFloat(svg, i);
                    b.vlineTo(p, cmd === "v");
                    break;
                case "q":
                    [pa, i] = readPoint(svg, i);
                    [p, i] = readPoint(svg, i);
                    // console.log("quadratic", pa.toString(), p.toString());
                    b.quadraticTo(pa, p, cmd === "q");
                    break;
                case "c":
                    [pa, i] = readPoint(svg, i);
                    [pb, i] = readPoint(svg, i);
                    [p, i] = readPoint(svg, i);
                    // console.log("cubic", pa.toString(), pb.toString(), p.toString());
                    b.cubicTo(pa, pb, p, cmd === "c");
                    break;
                case "s":
                    [pa, i] = readPoint(svg, i);
                    [p, i] = readPoint(svg, i);
                    // console.log("cubicChain", pa.toString(), p.toString());
                    b.cubicChainTo(pa, p, cmd === "s");
                    break;
                case "t":
                    [p, i] = readPoint(svg, i);
                    // console.log("quadraticChain", p.toString());
                    b.quadraticChainTo(p, cmd === "t");
                    break;
                case "a": {
                    [pa, i] = readPoint(svg, i);
                    [t1, i] = readFloat(svg, i);
                    [t2, i] = readFloat(svg, i);
                    [t3, i] = readFloat(svg, i);
                    [pb, i] = readPoint(svg, i);
                    // console.log("arc", pa.toString(), rad(t1), t2, t3, pb.toString());
                    b.arcTo(pb, pa, rad(t1), !!t2, !!t3, cmd === "a");
                    break;
                }
                case "z":
                    b.closePath();
                    break;
                default:
                    throw new Error(`unsupported segment type: ${c} @ pos ${i}`);
            }
        }
        return b.paths;
    } catch (e) {
        throw e instanceof Error ? e : new Error(`illegal char '${svg.charAt(e)}' @ ${e}`);
    }
};

const readPoint =
    (src: string, index: number): [Vec, number] => {
        let x, y;
        [x, index] = readFloat(src, index);
        index = skipWS(src, index);
        [y, index] = readFloat(src, index);
        return [[x, y], index];
    };

const isWS =
    (c: string) => c === " " || c === "\n" || c === "\r" || c === "\t";

const skipWS =
    (src: string, i: number) => {
        const n = src.length;
        while (i < n && isWS(src.charAt(i))) i++;
        return i;
    };

const readFloat =
    (src: string, index: number) => {
        index = skipWS(src, index);
        let signOk = true;
        let dotOk = true;
        let expOk = false;
        let commaOk = false;
        let i = index;
        for (let n = src.length; i < n; i++) {
            const c = src.charAt(i);
            // console.log("float", src.substring(index, i + 1));
            if ("0" <= c && c <= "9") {
                expOk = true;
                commaOk = true;
                signOk = false;
                continue;
            }
            if (c === "-" || c === "+") {
                if (!signOk) break;
                signOk = false;
                continue;
            }
            if (c === ".") {
                if (!dotOk) break;
                dotOk = false;
                continue;
            }
            if (c === "e") {
                if (!expOk) throw i;
                expOk = false;
                dotOk = false;
                signOk = true;
                continue;
            }
            if (c === ",") {
                if (!commaOk) throw i;
                i++;
            }
            break;
        }
        if (i === index) {
            throw new Error(`expected coordinate @ pos: ${i}`);
        }
        return [parseFloat(src.substring(index, i)), i];
    };
