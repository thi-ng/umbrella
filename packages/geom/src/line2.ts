import { IObjectOf } from "@thi.ng/api/api";
import { Vec } from "@thi.ng/vectors/api";
import { dist2 } from "@thi.ng/vectors/vec2";

import { arcLength, edges } from "./common";
import { PointContainer2 } from "./container2";

export class Polyline2 extends PointContainer2 {

    constructor(points: Vec, num?: number, attribs?: IObjectOf<any>, offset = 0, stride = 2) {
        super(points, num, attribs, offset, stride);
    }

    edges() {
        return edges(this.vertices());
    }

    area() {
        return 0;
    }

    arcLength() {
        return arcLength(dist2, this.buf, this.length, this.offset, this.stride);
    }

    toHiccup() {
        return ["polyline", this.attribs, this.vertices()];
    }
}

export const polyline2 = (points: Vec, num?: number, attribs?: IObjectOf<any>, offset?: number, stride?: number) =>
    new Polyline2(points, num, attribs, offset, stride);
