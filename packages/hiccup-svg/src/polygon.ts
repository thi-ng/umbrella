// SPDX-License-Identifier: Apache-2.0
import type { Attribs, Vec2Like } from "./api.js";
import { fattribs, fpoints } from "./format.js";

export const polygon = (
	pts: Vec2Like[],
	attribs?: Attribs,
	...body: any[]
): any[] => [
	"polygon",
	fattribs({
		...attribs,
		points: fpoints(pts),
	}),
	...body,
];
