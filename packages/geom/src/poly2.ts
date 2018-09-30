import { IObjectOf, IToHiccup } from "@thi.ng/api/api";
import { Vec2 } from "@thi.ng/vectors/vec2";
import { IArcLength, IArea, IEdges } from "./api";
import { PointContainer2 } from "./container2";
import { arcLength } from "./func/arc-length";
import { edges } from "./func/edges";

export class Polygon2 extends PointContainer2 implements
    IArcLength,
    IArea,
    IEdges<Vec2[]>,
    IToHiccup {

    constructor(points: Vec2[], attribs?: IObjectOf<any>) {
        super(points, attribs);
    }

    copy() {
        return new Polygon2(this._copy(), { ...this.attribs });
    }

    edges() {
        return edges(this.vertices(), true);
    }

    area(unsigned = true) {
        const pts = this.points;
        let res = 0;
        for (let n = pts.length - 1, i = n, j = 0; n >= 0; i = j, j++ , n--) {
            res += pts[i].cross(pts[j]);
        }
        res /= 2;
        return unsigned ? res : Math.abs(res);
    }

    arcLength() {
        return arcLength(this.points, true);
    }

    centroid(c?: Vec2): Vec2 {
        const pts = this.points;
        let area = 0;
        let x = 0;
        let y = 0;
        for (let n = pts.length - 1, i = pts[n], j = pts[0], k = 0; k <= n; k++ , i = j, j = pts[k]) {
            const z = i.cross(j);
            area += z;
            x += (i.x + j.x) * z;
            y += (i.y + j.y) * z;
        }
        area = 1 / (area * 3);
        x *= area;
        y *= area;
        return c ? c.setS(x, y) : new Vec2([x, y]);
    }

    toHiccup() {
        return this._toHiccup("polygon");
    }

    toJSON() {
        return this._toJSON("polygon2");
    }
}

export const polygon2 = (points: Vec2[], attribs?: IObjectOf<any>) =>
    new Polygon2(points, attribs);
