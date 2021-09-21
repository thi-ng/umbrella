import type { Attribs, PCLikeConstructor } from "@thi.ng/geom-api";
import { map } from "@thi.ng/transducers/map";
import type { Vec } from "@thi.ng/vectors";
import { copyVectors } from "@thi.ng/vectors/copy";

export const pointArraysAsShapes = (
    ctor: PCLikeConstructor,
    src?: Iterable<Vec[]>,
    attribs?: Attribs
) =>
    src
        ? [...map((pts) => new ctor(copyVectors(pts), { ...attribs }), src)]
        : undefined;
