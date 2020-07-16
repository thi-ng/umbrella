import type { Attribs, IShape, PCLike } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";

export abstract class APC implements PCLike {
    constructor(public points: Vec[] = [], public attribs?: Attribs) {}

    abstract get type(): number | string;
    abstract copy(): IShape;

    *[Symbol.iterator]() {
        yield* this.points;
    }
}
