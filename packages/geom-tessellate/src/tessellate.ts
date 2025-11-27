// SPDX-License-Identifier: Apache-2.0
import { isFunction } from "@thi.ng/checks/is-function";
import { repeat } from "@thi.ng/transducers/repeat";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { ITessellation, Tessellator } from "./api.js";
import { BasicTessellation } from "./tessellation.js";

export function tessellate(
	points: ReadonlyVec[],
	tessellators: Tessellator,
	iter?: number
): ITessellation;
export function tessellate(
	points: ReadonlyVec[],
	tessellators: Iterable<Tessellator>
): ITessellation;
export function tessellate(points: ReadonlyVec[], ...args: any[]) {
	return tessellateWith(
		new BasicTessellation(),
		points,
		...(<[Tessellator, number]>args)
	);
}

export function tessellateWith(
	tessel: ITessellation,
	points: ReadonlyVec[],
	tessellators: Tessellator,
	iter?: number
): ITessellation;
export function tessellateWith(
	tessel: ITessellation,
	points: ReadonlyVec[],
	tessellators: Iterable<Tessellator>
): ITessellation;
export function tessellateWith(
	tessel: ITessellation,
	points: ReadonlyVec[],
	...args: any[]
) {
	const fns: Iterable<Tessellator> = isFunction(args[0])
		? repeat(args[0], args[1] ?? 1)
		: args[0];
	return tessellateFaces(tessel, [tessel.addPoints(points)], fns);
}

export const tessellateFaces = (
	tessel: ITessellation,
	faces: number[][],
	tessellators: Iterable<Tessellator>
) => {
	for (const fn of tessellators) {
		let newFaces: number[][] = [];
		for (const face of faces) {
			fn(tessel, newFaces, face);
		}
		faces = newFaces;
	}
	tessel.addFaces(faces);
	return tessel;
};
