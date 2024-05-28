import type { Attribs, PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import { map } from "@thi.ng/transducers/map";
import type { Vec } from "@thi.ng/vectors";
import { copyVectors } from "@thi.ng/vectors/copy";
import { __copyAttribsRaw } from "./copy";

export const __pointArraysAsShapes = <T extends PCLike>(
	ctor: PCLikeConstructor<T>,
	src?: Iterable<Vec[]>,
	attribs?: Attribs,
	copyPoints = true
) =>
	src
		? [
				...map(
					(pts) =>
						new ctor(
							copyPoints ? copyVectors(pts) : pts,
							__copyAttribsRaw(attribs)
						),
					src
				),
		  ]
		: undefined;
