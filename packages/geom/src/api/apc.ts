import { Attribs, IShape, PCLike } from "@thi.ng/geom-api";
import { Vec } from "@thi.ng/vectors";

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
