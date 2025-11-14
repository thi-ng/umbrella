// SPDX-License-Identifier: Apache-2.0
import { mixN } from "@thi.ng/vectors/mixn";
import type { PCLike, PCLikeConstructor } from "../api.js";
import { __pointArraysAsShapes } from "./points-as-shape.js";
import { clamp01 } from "@thi.ng/math/interval";

export const __splitLineAt = (
	{ points: [a, b], attribs, constructor: ctor }: PCLike,
	t = 0
) => {
	const p = mixN([], a, b, clamp01(t));
	return __pointArraysAsShapes(
		<PCLikeConstructor>ctor,
		[
			[a, p],
			[p, b],
		],
		attribs
	)!;
};
