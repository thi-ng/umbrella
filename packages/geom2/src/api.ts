import { defmulti, DEFAULT } from "@thi.ng/defmulti";
import { Vec } from "@thi.ng/vectors2/api";
import { IObjectOf, ICopy } from "@thi.ng/api";

import "@thi.ng/vectors2/vec2";
import { asVec2, Vec2 } from "@thi.ng/vectors2/vec2";

export enum Type {
    CIRCLE2 = "circle",
    RECT2 = "rect",
    POLYGON2 = "polygon",
    QUAD2 = "quad",
}

export interface Shape {
    readonly type: string;
    attribs?: IObjectOf<any>;
}

export interface AABB extends Shape {
    pos: Vec;
    size: Vec;
}

export type Attribs = IObjectOf<any>;

const dispatch = (x: Shape) => x.type;

export const area = defmulti<Shape, number>(dispatch);
export const arcLength = defmulti<Shape, number>(dispatch);

export const bounds = defmulti<Shape, AABB>(dispatch);
export const width = defmulti<Shape, number>(dispatch);
export const height = defmulti<Shape, number>(dispatch);
export const depth = defmulti<Shape, number>(dispatch);
width.add(DEFAULT, (x) => bounds(x).size[0]);
height.add(DEFAULT, (x) => bounds(x).size[0]);
depth.add(DEFAULT, (x) => bounds(x).size[2] || 0);

export const centroid = defmulti<Shape, Vec>(dispatch);
export const center = defmulti<Shape, Shape>(dispatch);
export const vertices = defmulti<Shape, Vec[]>(dispatch);

export class HShape extends Array<any> implements
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
}

export class Circle2 extends HShape implements
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

export class Rect2 extends HShape implements AABB {

    constructor(pos: Vec, size: Vec, attribs?: Attribs) {
        super(Type.RECT2, attribs, asVec2(pos), asVec2(size));
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

export class Quad2 extends HShape implements
    ICopy<Quad2> {

    constructor(points: Vec[], attribs?: Attribs) {
        super(Type.POLYGON2, attribs, points.map(asVec2));
    }

    copy() {
        return new Quad2(this.points, { ...this.attribs });
    }

    get type() {
        return Type.QUAD2;
    }

    get points(): Vec2[] {
        return this[2];
    }

    set points(pts: Vec2[]) {
        this[3] = pts;
    }
}

// traverse until no further link is found or stop if an impl is found
// e.g. quad -> polygon -> container
// TODO add to defmulti

// const hierarchy = {
//     [Type.QUAD2]: [Type.POLYGON2,...],
//     [Type.POLYGON2]: [Type.CONTAINER2,...]
// };
