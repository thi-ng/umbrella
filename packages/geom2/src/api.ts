import { ICopy, IObjectOf } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { IVector, subNew, Vec } from "@thi.ng/vectors2/api";
import { asVec2, Vec2, vec2 } from "@thi.ng/vectors2/vec2";

export enum Type {
    CIRCLE2 = "circle",
    GROUP = "g",
    LINE2 = "line",
    PATH2 = "path",
    POINTS2 = "points",
    POLYGON2 = "polygon",
    POLYLINE2 = "polyline",
    QUAD2 = "quad",
    RECT2 = "rect",
    TRIANGLE2 = "triangle",
}

export const DEFAULT_SAMPLES = 20;

export interface Shape extends
    ICopy<Shape> {
    readonly type: string;
    attribs?: IObjectOf<any>;
}

export interface AABBLike extends Shape {
    pos: Vec;
    size: Vec;
}

export type Attribs = IObjectOf<any>;

const dispatch = (x: Shape) => x.type;

export const area = defmulti<Shape, number>(dispatch);

export const arcLength = defmulti<Shape, number>(dispatch);

export const asPolygon = defmulti<Shape, Polygon2>(dispatch);

export const asPolyline = defmulti<Shape, Polygon2>(dispatch);

export const bounds = defmulti<Shape, AABBLike>(dispatch);

export const center = defmulti<Shape, Shape>(dispatch);

export const centroid = defmulti<Shape, Vec>(dispatch);

export const classifyPoint = defmulti<Shape, Vec, Vec>(dispatch);

export const depth = defmulti<Shape, number>(dispatch);
depth.add(DEFAULT, (x) => bounds(x).size[2] || 0);

export const difference = defmulti<Shape, Shape, Shape>(dispatch);

// TODO add options type
export const extrude = defmulti<Shape, Shape>(dispatch);

export const height = defmulti<Shape, number>(dispatch);
height.add(DEFAULT, (x) => bounds(x).size[1]);

export const intersect = defmulti<Shape, Shape>(dispatch);

export const union = defmulti<Shape, Shape>(dispatch);

export const vertices = defmulti<Shape, Vec[]>(dispatch);

export const width = defmulti<Shape, number>(dispatch);
width.add(DEFAULT, (x) => bounds(x).size[0]);

export abstract class AShape extends Array<any> implements
    Shape {

    constructor(type: string, attribs: Attribs, ...xs: any[]) {
        super(type, attribs, ...xs);
    }

    get type() {
        return this[0];
    }

    get attribs() {
        return this[1];
    }

    set attribs(attr: Attribs) {
        this[1] = attr;
    }

    abstract copy(): Shape;
}

/**
 * [type, {}, points]
 */
export class PointContainer<T extends IVector<T>> extends AShape {

    constructor(type: Type, points: Vec[], attribs?: Attribs) {
        super(type, attribs, points);
    }

    get points(): T[] {
        return this[2];
    }

    set points(pts: T[]) {
        this[2] = pts;
    }

    copy() {
        return new PointContainer<T>(
            this.type,
            this.points.map((p) => p.copy()),
            { ...this.attribs }
        );
    }
}

/**
 * ["circle", {}, pos, r]
 */
export class Circle2 extends AShape implements
    ICopy<Circle2> {

    constructor(pos: Vec, r: number, attribs?: Attribs) {
        super(Type.CIRCLE2, attribs, asVec2(pos), r);
    }

    copy() {
        return new Circle2(this.pos.copy(), this.r, { ...this.attribs });
    }

    get pos(): Vec2 {
        return this[2];
    }

    set pos(v: Vec2) {
        this[2] = v;
    }

    get r(): number {
        return this[3];
    }

    set r(r: number) {
        this[3] = r;
    }
}

/**
 * ["circle", {}, pos, r]
 */
export class Group2 extends AShape implements
    ICopy<Group2> {

    constructor(attribs?: Attribs, ...children: Shape[]) {
        super(Type.GROUP, attribs, children);
    }

    copy() {
        return new Group2({ ...this.attribs }, ...<Shape[]>this.children.map((c) => c.copy()));
    }

    get children(): Shape[] {
        return this[2];
    }

    set children(children: Shape[]) {
        this[2] = children;
    }
}

/**
 * ```
 * ["polygon", {}, points]
 * ```
 */
export class Polygon2 extends PointContainer<Vec2> implements
    ICopy<Polygon2> {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points.map(asVec2), attribs);
    }

    copy() {
        return new Polygon2(this.points, { ...this.attribs });
    }
}

/**
 * ```
 * ["quad", {}, points]
 * ```
 */
export class Quad2 extends PointContainer<Vec2> implements
    ICopy<Quad2> {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points.map(asVec2), attribs);
    }

    copy() {
        return new Quad2(this.points, { ...this.attribs });
    }

    get type() {
        return Type.QUAD2;
    }
}

/**
 * ```
 * ["rect", {}, pos, size]
 * ```
 */
export class Rect2 extends AShape implements
    AABBLike,
    ICopy<Rect2> {

    static fromMinMax(min: Vec, max: Vec) {
        return new Rect2(min, subNew(max, min, vec2()));
    }

    constructor(pos: Vec, size: Vec, attribs?: Attribs) {
        super(Type.RECT2, attribs, asVec2(pos), asVec2(size));
    }

    copy() {
        return new Rect2(this.pos.copy(), this.size.copy(), { ...this.attribs });
    }

    get pos(): Vec2 {
        return this[2];
    }

    set pos(v: Vec2) {
        this[2] = v;
    }

    get size(): Vec2 {
        return this[3];
    }

    set size(v: Vec2) {
        this[3] = v;
    }
}

export class Triangle2 extends PointContainer<Vec2> implements
    ICopy<Triangle2> {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, points.map(asVec2), attribs);
    }

    copy() {
        return new Triangle2(this.points, { ...this.attribs });
    }

    get type() {
        return Type.TRIANGLE2;
    }
}
