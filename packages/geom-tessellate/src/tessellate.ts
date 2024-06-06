import { isFunction } from "@thi.ng/checks/is-function";
import type { Tessellation, Tessellator } from "@thi.ng/geom-api";
import { range } from "@thi.ng/transducers/range";
import { repeat } from "@thi.ng/transducers/repeat";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Creates a new
 * [`Tessellation`](https://docs.thi.ng/umbrella/geom-api/types/Tessellation.html)
 * result from given `points` and optional pre-tessellated face `indices`.
 *
 * @param points
 * @param indices
 */
export const defTessellation = (
	points: ReadonlyVec[],
	indices: number[][] = []
): Tessellation => ({ points, indices });

export function tessellate(
	points: ReadonlyVec[],
	tessellators: Tessellator,
	iter?: number
): Tessellation;
export function tessellate(
	points: ReadonlyVec[],
	tessellators: Iterable<Tessellator>
): Tessellation;
export function tessellate(
	points: ReadonlyVec[],
	...args: any[]
): Tessellation {
	const fns: Iterable<Tessellator> = isFunction(args[0])
		? repeat(args[0], args[1] ?? 1)
		: args[0];
	return tessellateQueue(points.slice(), [[...range(points.length)]], fns);
}

export const tessellateQueue = (
	points: ReadonlyVec[],
	queue: number[][],
	tessellators: Iterable<Tessellator>
) => {
	for (let fn of tessellators) {
		const newQueue: number[][] = [];
		for (let ids of queue) {
			newQueue.push(...fn({ points, indices: [] }, ids).indices);
		}
		queue = newQueue;
	}
	return { points, indices: queue };
};

export const indexedPoints = (points: ReadonlyVec[], indices: number[]) =>
	indices.map((i) => points[i]);

export const tessellatedPoints = ({ points, indices }: Tessellation) =>
	indices.map((ids) => indexedPoints(points, ids));
