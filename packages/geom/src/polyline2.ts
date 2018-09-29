import { IObjectOf, IToHiccup } from "@thi.ng/api/api";
import { Vec2 } from "@thi.ng/vectors/vec2";
import { IArcLength, IArea, IEdges } from "./api";
import { PointContainer2 } from "./container2";
import { arcLength } from "./func/arc-length";
import { edges } from "./func/edges";
import { sampleUniform } from "./func/sample-uniform";

export class Polyline2 extends PointContainer2 implements
    IArcLength,
    IArea,
    IEdges<Vec2[]>,
    IToHiccup {

    constructor(points: Vec2[], attribs?: IObjectOf<any>) {
        super(points, attribs);
    }

    edges() {
        return edges(this.vertices());
    }

    area() {
        return 0;
    }

    arcLength() {
        return arcLength(this.points);
    }

    resample(dist: number) {
        this.points = sampleUniform(this.points, dist);
    }

    toHiccup() {
        return ["polyline", this.attribs, this.vertices()];
    }
}

export const polyline2 = (points: Vec2[], attribs?: IObjectOf<any>) =>
    new Polyline2(points, attribs);
