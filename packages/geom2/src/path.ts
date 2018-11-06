import { isNumber } from "@thi.ng/checks/is-number";
import { implementations } from "@thi.ng/defmulti";
import { rad } from "@thi.ng/math/angle";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { comp } from "@thi.ng/transducers/func/comp";
import { ensureArray } from "@thi.ng/transducers/func/ensure-array";
import { peek } from "@thi.ng/transducers/func/peek";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { filter } from "@thi.ng/transducers/xform/filter";
import { map } from "@thi.ng/transducers/xform/map";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import {
    add,
    addNew,
    copy,
    maddNewN,
    mulN,
    ReadonlyVec,
    set,
    sub,
    subNew,
    Vec,
    zeroes
} from "@thi.ng/vectors2/api";
import { Mat23 } from "@thi.ng/vectors2/mat23";
import {
    Arc2,
    asCubic,
    asPolygon,
    asPolyline,
    Attribs,
    bounds,
    centroid,
    Cubic2,
    Line2,
    Path2,
    PathSegment,
    Polygon2,
    Polyline2,
    Quadratic2,
    SamplingOpts,
    SegmentType,
    simplify,
    transform,
    translate,
    Type,
    vertices
} from "./api";
import { arcFrom2Points } from "./arc";
import { collBounds } from "./internal/bounds";
import "./polygon";
import "./polyline";
import { douglasPeucker2 } from "./internal/douglas–peucker";

const CMD_RE = /[achlmqstvz]/i;

export function path(segments?: PathSegment[], attribs?: Attribs) {
    return new Path2(segments, attribs);
}

export const roundedRect = (pos: Vec, size: Vec, r: number | Vec) => {
    r = isNumber(r) ? [r, r] : r;
    const b = new PathBuilder();
    const [w, h] = maddNewN(size, r, -2);
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

export const normalizePath = (path: Path2) =>
    new Path2([...mapcat(
        (s) =>
            s.geo ?
                map<Cubic2, PathSegment>(
                    (c) => ({ type: SegmentType.CUBIC, geo: c }),
                    asCubic(s.geo)
                ) :
                [{ ...s }],
        path.segments
    )]);

export const pathFromSVG = (svg: string) => {
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

implementations(
    Type.PATH2,

    null,

    asCubic,
    (path: Path2) =>
        [...mapcat(
            (s) => s.geo ? asCubic(s.geo) : undefined,
            path.segments
        )],

    asPolygon,
    (path: Path2, opts?: number | Partial<SamplingOpts>) =>
        new Polygon2(vertices(path, opts), { ...path.attribs }),

    asPolyline,
    (path: Path2, opts?: number | Partial<SamplingOpts>) =>
        new Polyline2(vertices(path, opts), { ...path.attribs }),

    bounds,
    (path: Path2) =>
        collBounds([...iterator1(
            comp(
                map((s: PathSegment) => s.geo),
                filter((s) => !!s),
            ),
            path.segments)
        ]),

    centroid,
    (path: Path2) => centroid(bounds(path)),

    simplify,
    (path: Path2, eps = 0.1) => {
        const res: PathSegment[] = [];
        const orig = path.segments;
        const n = orig.length;
        let points: Vec[];
        let lastP: Vec;
        for (let i = 0; i < n; i++) {
            const s = orig[i];
            if (s.type === SegmentType.LINE || s.type === SegmentType.POLYLINE) {
                points = (points || []).concat(ensureArray(vertices(s.geo)));
                lastP = peek(points);
            } else if (points) {
                points.push(lastP);
                res.push({
                    geo: new Polyline2(douglasPeucker2(points, eps)),
                    type: SegmentType.POLYLINE,
                });
                points = null;
            } else {
                res.push({ ...s });
            }
        }
        if (points) {
            points.push(lastP);
            res.push({
                geo: new Polyline2(points),
                type: SegmentType.POLYLINE,
            });
        }
        return new Path2(res, { ...path.attribs });
    },

    transform,
    (path: Path2, mat: Mat23) =>
        new Path2(
            [...mapcat((s) => transformSegment(s, mat), path.segments)],
            { ...path.attribs }
        ),

    translate,
    (path: Path2, delta: ReadonlyVec) =>
        new Path2(
            path.segments.map((s) =>
                s.geo ?
                    {
                        type: s.type,
                        geo: <any>translate(s.geo, delta)
                    } :
                    {
                        type: s.type,
                        point: addNew(s.point, delta)
                    }
            ),
            { ...path.attribs }
        ),

    vertices,
    (path: Path2, opts?: number | Partial<SamplingOpts>) => {
        const _opts = isNumber(opts) ? { num: opts } : opts;
        let verts: Vec[] = [];
        for (let segs = path.segments, n = segs.length - 1, i = 0; i <= n; i++) {
            const s = segs[i];
            if (s.geo) {
                verts = verts.concat(
                    ensureArray(
                        vertices(s.geo, { ..._opts, last: i === n && !path.closed })
                    )
                );
            }
        }
        return verts;
    }
);

export class PathBuilder {

    paths: Path2[];
    curr: Path2;
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
        this.curr = new Path2();
        this.paths.push(this.curr);
        this.currP = zeroes(2);
        this.bezierP = zeroes(2);
        this.startP = zeroes(2);
    }

    moveTo(p: Vec, relative = false): PathBuilder {
        if (this.curr.segments.length > 0) {
            this.curr = new Path2();
            this.paths.push(this.curr);
        }
        p = this.updateCurrent(p, relative);
        set(this.startP, p);
        set(this.bezierP, p);
        this.curr.add({
            point: p,
            type: SegmentType.MOVE,
        });
        return this;
    }

    lineTo(p: Vec, relative = false): PathBuilder {
        this.curr.add({
            geo: new Line2([
                copy(this.currP),
                this.updateCurrent(p, relative)
            ]),
            type: SegmentType.LINE,
        });
        set(this.bezierP, this.currP);
        return this;
    }

    hlineTo(x: number, relative = false): PathBuilder {
        const prev = copy(this.currP);
        this.currP[0] = relative ? this.currP[0] + x : x;
        set(this.bezierP, this.currP);
        this.curr.add({
            geo: new Line2([prev, copy(this.currP)]),
            type: SegmentType.LINE,
        });
        return this;
    }

    vlineTo(y: number, relative = false): PathBuilder {
        const prev = copy(this.currP);
        this.currP[1] = relative ? this.currP[1] + y : y;
        set(this.bezierP, this.currP);
        this.curr.add({
            geo: new Line2([prev, copy(this.currP)]),
            type: SegmentType.LINE,
        });
        return this;
    }

    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Cubic_B%C3%A9zier_Curve
    cubicTo(cp1: Vec, cp2: Vec, p: Vec, relative = false) {
        const c2 = this.absPoint(cp2, relative);
        set(this.bezierP, c2);
        this.curr.add({
            geo: new Cubic2([
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
        set(this.bezierP, c1);
        this.curr.add({
            geo: new Quadratic2([
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
            add(c1, subNew(c1, this.bezierP));
        }
        const c2 = this.absPoint(cp2, relative);
        set(this.bezierP, c2);
        this.curr.add({
            geo: new Cubic2([
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
            sub(mulN(c1, 2), this.bezierP);
        }
        set(this.bezierP, c1);
        this.curr.add({
            geo: new Quadratic2([
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
        set(this.bezierP, this.currP);
        return this;
    }

    closePath() {
        this.curr.add({
            geo: new Line2([copy(this.currP), copy(this.startP)]),
            type: SegmentType.LINE,
        });
        this.curr.closed = true;
        return this;
    }

    protected updateCurrent(p: Vec, relative: boolean) {
        p = copy(relative ? add(this.currP, p) : set(this.currP, p));
        return p;
    }

    protected absPoint(p: Vec, relative: boolean) {
        return relative ? add(p, this.currP) : p;
    }
}

const transformSegment = (s: PathSegment, mat: Mat23): Iterable<PathSegment> => {
    if (s.geo) {
        return s.geo instanceof Arc2 ?
            map(
                (c) => ({
                    type: SegmentType.CUBIC,
                    geo: <any>transform(c, mat)
                }),
                asCubic(s.geo)
            ) :
            [{
                type: s.type,
                geo: <any>transform(s.geo, mat)
            }];
    }
    return s.point ?
        [{ type: s.type, point: mat.mulV(s.point) }] :
        [{ ...s }];
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
