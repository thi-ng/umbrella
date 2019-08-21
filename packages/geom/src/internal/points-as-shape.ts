import { Attribs, PCLikeConstructor } from "@thi.ng/geom-api";
import { map } from "@thi.ng/transducers";
import { copyVectors, Vec } from "@thi.ng/vectors";

export const pointArraysAsShapes = (
    ctor: PCLikeConstructor,
    src?: Iterable<Vec[]>,
    attribs?: Attribs
) =>
    src
        ? [...map((pts) => new ctor(copyVectors(pts), { ...attribs }), src)]
        : undefined;
