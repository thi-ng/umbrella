import { isNumber } from "@thi.ng/checks";
import { equiv } from "@thi.ng/equiv";
import { illegalState } from "@thi.ng/errors";
import {
    AABBLike,
    Attribs,
    IHiccupPathSegment,
    IHiccupShape,
    IShape,
    PathSegment,
    PCLike,
    Type
} from "@thi.ng/geom-api";
import { pointAt as arcPointAt, pointAtTheta as arcPointAtTheta } from "@thi.ng/geom-arc";
import {
    add2,
    add3,
    copyVectors,
    maddN2,
    set,
    Vec
} from "@thi.ng/vectors";

export abstract class APC implements PCLike {
    points: Vec[];
    attribs?: Attribs;

    constructor(points?: Vec[], attribs?: Attribs) {
        this.points = points || [];
        this.attribs = attribs;
    }

    abstract get type(): number | string;
    abstract copy(): IShape;

    *[Symbol.iterator]() {
        yield* this.points;
    }
}

export class AABB implements AABBLike {
    pos: Vec;
    size: Vec;
    attribs?: Attribs;

    constructor(
        pos: Vec = [0, 0, 0],
        size: number | Vec = 1,
        attribs?: Attribs
    ) {
        this.pos = pos;
        this.size = isNumber(size) ? [size, size, size] : size;
        this.attribs = attribs;
    }

    get type() {
        return Type.AABB;
    }

    copy() {
        return new AABB(set([], this.pos), set([], this.size), {
            ...this.attribs
        });
    }

    max() {
        return add3([], this.pos, this.size);
    }
}

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

    copy() {
        return new Arc(
            set([], this.pos),
            set([], this.r),
            this.axis,
            this.start,
            this.end,
            this.xl,
            this.cw,
            { ...this.attribs }
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
            [["M", this.pointAt(0)], ...this.toHiccupPathSegments()]
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
                this.pointAt(1)
            ]
        ];
    }
}

export class Circle implements IHiccupShape {
    pos: Vec;
    r: number;
    attribs?: Attribs;

    constructor(pos: Vec = [0, 0], r = 1, attribs?: Attribs) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    get type() {
        return Type.CIRCLE;
    }

    copy() {
        return new Circle(set([], this.pos), this.r, { ...this.attribs });
    }

    toHiccup() {
        return ["circle", this.attribs, this.pos, this.r];
    }
}

export class Cubic extends APC implements IHiccupPathSegment {
    get type() {
        return Type.CUBIC;
    }

    copy() {
        return new Cubic(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return [
            "path",
            this.attribs,
            [["M", this.points[0]], ...this.toHiccupPathSegments()]
        ];
    }

    toHiccupPathSegments() {
        const pts = this.points;
        return [["C", pts[1], pts[2], pts[3]]];
    }
}

export class Ellipse implements IHiccupShape {
    pos: Vec;
    r: Vec;
    attribs?: Attribs;

    constructor(
        pos: Vec = [0, 0],
        r: number | Vec = [1, 1],
        attribs?: Attribs
    ) {
        this.pos = pos;
        this.r = isNumber(r) ? [r, r] : r;
        this.attribs = attribs;
    }

    get type() {
        return Type.ELLIPSE;
    }

    copy() {
        return new Ellipse(set([], this.pos), set([], this.r), {
            ...this.attribs
        });
    }

    toHiccup() {
        return ["ellipse", this.attribs, this.pos, this.r];
    }
}

export class Group implements IHiccupShape {
    children: IHiccupShape[];
    attribs: Attribs;

    constructor(attribs: Attribs, children?: IHiccupShape[]) {
        this.attribs = attribs;
        this.children = children || [];
    }

    get type() {
        return Type.GROUP;
    }

    *[Symbol.iterator]() {
        yield* this.children;
    }

    copy() {
        return new Group({ ...this.attribs }, <IHiccupShape[]>(
            this.children.map((c) => c.copy())
        ));
    }

    equiv(o: any) {
        return o instanceof Group && equiv(this.children, o.children);
    }

    toHiccup() {
        return ["g", this.attribs, ...this.children.map((x) => x.toHiccup())];
    }
}

export class Line extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return Type.LINE;
    }

    copy() {
        return new Line(copyVectors(this.points), { ...this.attribs });
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

export class Path implements IHiccupShape {
    segments: PathSegment[];
    closed: boolean;
    attribs?: Attribs;

    constructor(segments?: PathSegment[], attribs?: Attribs) {
        this.segments = segments || [];
        this.attribs = attribs;
        this.closed = false;
    }

    get type() {
        return Type.PATH;
    }

    *[Symbol.iterator]() {
        yield* this.segments;
    }

    copy() {
        const p = new Path([...this.segments], { ...this.attribs });
        p.closed = this.closed;
        return p;
    }

    equiv(o: any) {
        return o instanceof Path && equiv(this.segments, o.segments);
    }

    add(s: PathSegment) {
        if (this.closed) illegalState("path already closed");
        this.segments.push(s);
    }

    toHiccup() {
        let dest: any[] = [];
        const segments = this.segments;
        const n = segments.length;
        if (n > 1) {
            dest.push(["M", segments[0].point]);
            for (let i = 1; i < n; i++) {
                dest = dest.concat(segments[i].geo!.toHiccupPathSegments());
            }
            if (this.closed) {
                dest.push(["Z"]);
            }
        }
        return ["path", this.attribs || {}, dest];
    }
}

export class Plane implements IHiccupShape {
    normal: Vec;
    w: number;
    attribs?: Attribs;

    constructor(normal: Vec = [0, 1, 0], w = 0, attribs?: Attribs) {
        this.normal = normal;
        this.w = w;
        this.attribs = attribs;
    }

    get type() {
        return Type.PLANE;
    }

    copy() {
        return new Plane(set([], this.normal), this.w, { ...this.attribs });
    }

    toHiccup() {
        return ["plane", this.attribs, this.normal, this.w];
    }
}

export class Points extends APC implements IHiccupShape {
    get type() {
        return Type.POINTS;
    }

    copy() {
        return new Points(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["points", this.attribs, this.points];
    }
}

export class Polygon extends APC implements IHiccupShape {
    get type() {
        return Type.POLYGON;
    }

    copy() {
        return new Polygon(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}

export class Polyline extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return Type.POLYLINE;
    }

    copy() {
        return new Polyline(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polyline", { ...this.attribs, fill: "none" }, this.points];
    }

    toHiccupPathSegments() {
        const res: any[] = [];
        for (let pts = this.points, n = pts.length, i = 1; i < n; i++) {
            res.push(["L", pts[i]]);
        }
        return res;
    }
}

export class Quad extends APC implements IHiccupShape {
    get type() {
        return Type.QUAD;
    }

    copy() {
        return new Quad(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
export class Quad3 extends APC implements IHiccupShape {
    get type() {
        return Type.QUAD3;
    }

    copy() {
        return new Quad3(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}

export class Quadratic extends APC implements IHiccupShape, IHiccupPathSegment {
    get type() {
        return Type.QUADRATIC;
    }

    copy() {
        return new Quadratic(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return [
            "path",
            this.attribs,
            [["M", this.points[0]], ...this.toHiccupPathSegments()]
        ];
    }

    toHiccupPathSegments() {
        const pts = this.points;
        return [["Q", pts[1], pts[2]]];
    }
}

export class Ray implements IHiccupShape {
    pos: Vec;
    dir: Vec;
    attribs?: Attribs;

    constructor(pos: Vec, dir: Vec, attribs?: Attribs) {
        this.pos = pos;
        this.dir = dir;
        this.attribs = attribs;
    }

    get type() {
        return Type.RAY;
    }

    copy() {
        return new Ray(set([], this.pos), set([], this.dir), {
            ...this.attribs
        });
    }

    toHiccup() {
        return [
            "line",
            this.attribs,
            this.pos,
            maddN2([], this.pos, this.dir, 1e6)
        ];
    }
}

export class Rect implements AABBLike, IHiccupShape {
    pos: Vec;
    size: Vec;
    attribs?: Attribs;

    constructor(pos: Vec = [0, 0], size: number | Vec = 1, attribs?: Attribs) {
        this.pos = pos;
        this.size = isNumber(size) ? [size, size] : size;
        this.attribs = attribs;
    }

    get type() {
        return Type.RECT;
    }

    copy() {
        return new Rect(set([], this.pos), set([], this.size), {
            ...this.attribs
        });
    }

    max() {
        return add2([], this.pos, this.size);
    }

    toHiccup() {
        return ["rect", this.attribs, this.pos, this.size[0], this.size[1]];
    }
}

export class Sphere implements IHiccupShape {
    pos: Vec;
    r: number;
    attribs?: Attribs;

    constructor(pos: Vec = [0, 0, 0], r = 1, attribs?: Attribs) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }

    get type() {
        return Type.SPHERE;
    }

    copy() {
        return new Sphere(set([], this.pos), this.r, { ...this.attribs });
    }

    toHiccup() {
        return ["sphere", this.attribs, this.pos, this.r];
    }
}

export class Triangle extends APC implements IHiccupShape {
    get type() {
        return Type.TRIANGLE;
    }

    copy() {
        return new Triangle(copyVectors(this.points), { ...this.attribs });
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}
