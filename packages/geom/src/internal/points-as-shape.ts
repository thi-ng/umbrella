import type { Attribs, PCLike, PCLikeConstructor } from "../api.js";
import { map } from "@thi.ng/transducers/map";
import type { Vec } from "@thi.ng/vectors";
import { copyVectors } from "@thi.ng/vectors/copy";
import { __copyAttribs } from "./copy.js";

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
							__copyAttribs(attribs)
						),
					src
				),
		  ]
		: undefined;
