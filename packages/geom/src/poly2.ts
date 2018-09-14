import { IObjectOf } from "@thi.ng/api/api";
import { Vec } from "@thi.ng/vectors/api";
import { cross2, dist2, Vec2 } from "@thi.ng/vectors/vec2";

import { arcLength, edges } from "./common";
import { PointContainer2 } from "./container2";

export class Polygon2 extends PointContainer2 {

    constructor(points: Vec, num?: number, attribs?: IObjectOf<any>, offset = 0, stride = 2) {
        super(points, num, attribs, offset, stride);
    }

    edges() {
        return edges(this.vertices(), true);
    }

    area() {
        const s = this.stride;
        const pts = this.buf;
        let res = 0;
        for (let n = (this.length - 1) * s, i = this.offset + n, j = this.offset; n >= 0; i = j, j += s, n -= s) {
            res += cross2(pts, pts, i, j);
        }
        return res / 2;
    }

    circumference() {
        return arcLength(dist2, this.buf, this.length, this.offset, this.stride, true);
    }

    centroid(c?: Vec2): Vec2 {
        const s = this.stride;
        const pts = this.buf;
        let area = 0;
        let x = 0;
        let y = 0;
        for (let n = (this.length - 1) * s, i = this.offset + n, j = this.offset; n >= 0; i = j, j += s, n -= s) {
            const z = cross2(pts, pts, i, j);
            area += z;
            x += (pts[i] + pts[j]) * z;
            y += (pts[i + 1] + pts[j + 1]) * z;
        }
        area = 1 / (area * 3);
        x *= area;
        y *= area;
        return c ? c.setS(x, y) : new Vec2([x, y]);
    }

    toHiccup() {
        return ["polygon", this.attribs, this.vertices()];
    }
}

export const polygon2m = (points: Vec, num?: number, attribs?: IObjectOf<any>, offset?: number, stride?: number) =>
    new Polygon2(points, num, attribs, offset, stride);

export const polygon2 = (points: Iterable<Readonly<Vec2>>, attribs?: IObjectOf<any>) =>
    new Polygon2(Vec2.intoBuffer([], points), null, attribs);
