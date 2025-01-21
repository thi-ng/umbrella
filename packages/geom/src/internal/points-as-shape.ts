// SPDX-License-Identifier: Apache-2.0
import type { Attribs, PCLike, PCLikeConstructor } from "../api.js";
import { map } from "@thi.ng/transducers/map";
import type { Vec } from "@thi.ng/vectors";
import { copyVectors } from "@thi.ng/vectors/copy";
import { __copyAttribs } from "./copy.js";

/**
 * Creates a new shape instance with given points and attribs. Copies points by
 * default.
 *
 * @param ctor
 * @param points
 * @param attribs
 * @param copyPoints
 */
export const __pointArraysAsShapes = <T extends PCLike>(
	ctor: PCLikeConstructor<T>,
	points?: Iterable<Vec[]>,
	attribs?: Attribs,
	copyPoints = true
) =>
	points
		? [
				...map(
					(pts) =>
						new ctor(
							copyPoints ? copyVectors(pts) : pts,
							__copyAttribs(attribs)
						),
					points
				),
		  ]
		: undefined;
