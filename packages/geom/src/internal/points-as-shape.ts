import { map } from "@thi.ng/transducers";
import { copyVectors, Vec } from "@thi.ng/vectors";
import type { Attribs, PCLikeConstructor } from "@thi.ng/geom-api";

export const pointArraysAsShapes = (
    ctor: PCLikeConstructor,
    src?: Iterable<Vec[]>,
    attribs?: Attribs
) =>
    src
        ? [...map((pts) => new ctor(copyVectors(pts), { ...attribs }), src)]
        : undefined;
