import { isNumber } from "@thi.ng/checks/is-number";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { rad } from "@thi.ng/math/angle";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { ensureArray } from "@thi.ng/transducers/func/ensure-array";
import { peek } from "@thi.ng/transducers/func/peek";
import { Vec2 } from "@thi.ng/vectors/vec2";
import {
    Attribs,
    IBounds,
    IBoundsRaw,
    IToPolygon,
    IVertices,
    PathSegment,
    SamplingOpts,
    SegmentType
} from "./api";
import { Arc2 } from "./arc2";
import { Cubic2, Quadratic2 } from "./bezier2";
import { Line2 } from "./line2";
import { Polygon2 } from "./polygon2";
import { Polyline2 } from "./polyline2";
import { Rect2 } from "./rect2";
import { simplifyPolyline } from "./internal/douglas–peucker";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { map } from "@thi.ng/transducers/xform/map";

export class Path2 implements
    Iterable<PathSegment>,
    IBoundsRaw<Vec2>,
    IBounds<Rect2>,
    IToPolygon<number>,
    IVertices<Vec2, any> {

    segments: PathSegment[];
    closed: boolean;
    attribs: Attribs;

    constructor(segments?: PathSegment[], attribs?: Attribs) {
        this.segments = segments || [];
        this.attribs = attribs;
        this.closed = false;
    }

    *[Symbol.iterator]() {
        yield* (this.segments);
    }

    add(s: PathSegment) {
        this.segments.push(s);
    }

    boundsRaw(): [Vec2, Vec2] {
        const min = Vec2.MAX.copy();
        const max = Vec2.MIN.copy();
        for (let s of this.segments) {
            if (s.geo) {
                const b = s.geo.boundsRaw();
                min.min(b[0]);
                max.max(b[1]);
            }
        }
        return [min, max];
    }

    bounds() {
        return Rect2.fromMinMax(...this.boundsRaw());
    }

    simplify(eps = 0.01): Path2 {
        const res: PathSegment[] = [];
        const orig = this.segments;
        const n = orig.length;
        let points: Vec2[];
        let lastP: Vec2;
        for (let i = 0; i < n; i++) {
            const s = orig[i];
            if (s.type === SegmentType.LINE || s.type === SegmentType.POLYLINE) {
                points = (points || []).concat(ensureArray(s.geo.vertices()));
                lastP = peek(points);
            } else if (points) {
                points.push(lastP);
                res.push({
                    geo: new Polyline2(simplifyPolyline(points, eps)),
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
        return new Path2(res);
    }

    vertices(opts?: number | Partial<SamplingOpts>) {
        const _opts = isNumber(opts) ? { num: opts } : opts;
        let verts: Vec2[] = [];
        for (let segs = this.segments, n = segs.length - 1, i = 0; i <= n; i++) {
            const s = segs[i];
            if (s.geo) {
                const v = ensureArray(s.geo.vertices({ ..._opts, last: i === n && !this.closed }));
                verts = verts.concat(v);
            }
        }
        return verts;
    }

    normalize() {
        return new Path2([...mapcat(
            (s) =>
                implementsFunction(s.geo, "toCubic") ?
                    map<Cubic2, PathSegment>(
                        (c) => ({ type: SegmentType.CUBIC, geo: c }),
                        s.geo.toCubic()
                    ) :
                    [s],
            this.segments
        )]);
    }

    toPolygon(opts?: number | Partial<SamplingOpts>) {
        return new Polygon2(this.vertices(opts));
    }

    toPolyline(res = 10) {
        return new Polyline2(this.vertices(res));
    }

    toHiccup() {
        const dest: any[] = [];
        const res: any[] = ["path", this.attribs || {}, dest];
        const src = this.segments;
        const n = src.length;
        if (n > 1) {
            dest.push(["M", src[0].point]);
            for (let i = 1; i < n; i++) {
                dest.push(...src[i].geo.toHiccupPathSegments());
            }
            if (this.closed) {
                dest.push(["Z"]);
            }
        }
        return res;
    }
}

const CMD_RE = /[achlmqstvz]/i;

export class PathBuilder {

    static roundedRect(pos: Vec2, size: Vec2, r: Vec2) {
        const b = new PathBuilder(),
            w = size.x - 2 * r.x,
            h = size.y - 2 * r.y;
        b.moveTo(new Vec2([pos.x + r.x, pos.y]));
        b.hlineTo(w, true);
        b.arcTo(r, r, 0, false, true, true);
        b.vlineTo(h, true);
        b.arcTo(new Vec2([-r.x, r.y]), r, 0, false, true, true);
        b.hlineTo(-w, true);
        b.arcTo(new Vec2([-r.x, -r.y]), r, 0, false, true, true);
        b.vlineTo(-h, true);
        b.arcTo(new Vec2([r.x, -r.y]), r, 0, false, true, true);
        return b.curr;
    }

    static fromSVG(svg: string) {
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
    }

    paths: Path2[];
    protected curr: Path2;
    protected currP: Vec2;
    protected bezierP: Vec2;
    protected startP: Vec2;

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
        this.currP = new Vec2();
        this.bezierP = new Vec2();
        this.startP = new Vec2();
    }

    moveTo(p: Vec2, relative = false): PathBuilder {
        if (this.curr.segments.length > 0) {
            this.curr = new Path2();
            this.paths.push(this.curr);
        }
        p = this.updateCurrent(p, relative);
        this.startP.set(p);
        this.bezierP.set(p);
        this.curr.add({
            point: p,
            type: SegmentType.MOVE,
        });
        return this;
    }

    lineTo(p: Vec2, relative = false): PathBuilder {
        this.curr.add({
            geo: new Line2([
                this.currP.copy(),
                this.updateCurrent(p, relative)
            ]),
            type: SegmentType.LINE,
        });
        this.bezierP.set(this.currP);
        return this;
    }

    hlineTo(x: number, relative = false): PathBuilder {
        const prev = this.currP.copy();
        this.currP.x = relative ? this.currP.x + x : x;
        this.bezierP.set(this.currP);
        this.curr.add({
            geo: new Line2([prev, this.currP.copy()]),
            type: SegmentType.LINE,
        });
        return this;
    }

    vlineTo(y: number, relative = false): PathBuilder {
        const prev = this.currP.copy();
        this.currP.y = relative ? this.currP.y + y : y;
        this.bezierP.set(this.currP);
        this.curr.add({
            geo: new Line2([prev, this.currP.copy()]),
            type: SegmentType.LINE,
        });
        return this;
    }

    cubicTo(cp1: Vec2, cp2: Vec2, p: Vec2, relative = false) {
        const c2 = this.absPoint(cp2, relative);
        this.bezierP.set(c2);
        this.curr.add({
            geo: new Cubic2([
                this.currP.copy(),
                this.absPoint(cp1, relative),
                c2,
                this.updateCurrent(p, relative),
            ]),
            type: SegmentType.CUBIC,
        });
        return this;
    }

    quadraticTo(cp: Vec2, p: Vec2, relative = false) {
        const c1 = this.absPoint(cp, relative);
        this.bezierP.set(c1);
        this.curr.add({
            geo: new Quadratic2([
                this.currP.copy(),
                c1,
                this.updateCurrent(p, relative),
            ]),
            type: SegmentType.QUADRATIC,
        });
        return this;
    }

    cubicChainTo(cp2: Vec2, p: Vec2, relative = false) {
        const prevMode = peek(this.curr.segments).type;
        const c1 = this.currP.copy();
        if (prevMode === SegmentType.CUBIC) {
            c1.add(c1.subNew(this.bezierP));
        }
        const c2 = this.absPoint(cp2, relative);
        this.bezierP.set(c2);
        this.curr.add({
            geo: new Cubic2([
                this.currP.copy(),
                c1,
                c2,
                this.updateCurrent(p, relative),
            ]),
            type: SegmentType.CUBIC,
        });
        return this;
    }

    quadraticChainTo(p: Vec2, relative = false) {
        const prevMode = peek(this.curr.segments).type;
        const c1 = this.currP.copy();
        if (prevMode === SegmentType.QUADRATIC) {
            c1.mulN(2).sub(this.bezierP);
        }
        this.bezierP.set(c1);
        this.curr.add({
            geo: new Quadratic2([
                this.currP.copy(),
                c1,
                this.updateCurrent(p, relative),
            ]),
            type: SegmentType.CUBIC,
        });
        return this;
    }

    arcTo(p: Vec2, r: Vec2, xaxis: number, xl: boolean, clockwise: boolean, relative = false) {
        if (eqDelta(r.x, 0) || eqDelta(r.y, 0)) {
            return this.lineTo(p, relative);
        }
        const prev = this.currP.copy();
        const arc = Arc2.from2Points(prev, this.updateCurrent(p, relative), r, xaxis, xl, clockwise);
        this.curr.add({
            geo: arc,
            type: SegmentType.ARC,
        });
        this.bezierP.set(this.currP);
        return this;
    }

    closePath() {
        this.curr.add({
            geo: new Line2([this.currP.copy(), this.startP.copy()]),
            type: SegmentType.LINE,
        });
        this.curr.closed = true;
        return this;
    }

    protected updateCurrent(p: Vec2, relative: boolean) {
        p = (relative ? this.currP.add(p) : this.currP.set(p)).copy();
        return p;
    }

    protected absPoint(p: Vec2, relative: boolean) {
        return relative ? p.add(this.currP) : p;
    }
}

const readPoint = (src: string, index: number): [Vec2, number] => {
    let x, y;
    [x, index] = readFloat(src, index);
    index = skipWS(src, index);
    [y, index] = readFloat(src, index);
    return [new Vec2([x, y]), index];
};

const isWS = (c: string) => c === " " || c === "\n" || c === "\r" || c === "\t";

const skipWS = (src: string, i: number) => {
    const n = src.length;
    while (i < n && isWS(src.charAt(i))) i++;
    return i;
};

const readFloat = (src: string, index: number) => {
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
}
