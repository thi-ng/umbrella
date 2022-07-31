import type { Comparator } from "@thi.ng/api";
import type { ReadonlyVec } from "./api.js";

/**
 * Returns a new 2D vector comparator using given component order. The
 * comparator returns the signed index+1 of the first differing
 * component, e.g. if order is `0,1`, a return value of -2 means that
 * `a.y < b.y`.
 *
 * @param o1 -
 * @param o2 -
 */
export const comparator2 =
	(o1: number, o2: number): Comparator<ReadonlyVec> =>
	(a, b): number => {
		const ax = a[o1];
		const ay = a[o2];
		const bx = b[o1];
		const by = b[o2];
		return ax === bx
			? ay === by
				? 0
				: ay < by
				? -2
				: 2
			: ax < bx
			? -1
			: 1;
	};

/**
 * Returns a new 3D vector comparator using given component order. The
 * comparator returns the signed index+1 of the first differing
 * component, e.g. if order is `0,1,2`, a return value of -3 means that
 * `a.z < b.z`.
 *
 * @param o1 -
 * @param o2 -
 * @param o3 -
 */
export const comparator3 =
	(o1: number, o2: number, o3: number): Comparator<ReadonlyVec> =>
	(a, b): number => {
		const ax = a[o1];
		const ay = a[o2];
		const az = a[o3];
		const bx = b[o1];
		const by = b[o2];
		const bz = b[o3];
		return ax === bx
			? ay === by
				? az === bz
					? 0
					: az < bz
					? -3
					: 3
				: ay < by
				? -2
				: 2
			: ax < bx
			? -1
			: 1;
	};

/**
 * Returns a new 4D vector comparator using given component order. The
 * comparator returns the signed index+1 of the first differing
 * component, e.g. if order is `0,1,2,3`, a return value of -4 means
 * that `a.w < b.w`.
 *
 * @param o1 -
 * @param o2 -
 * @param o3 -
 * @param o4 -
 */
export const comparator4 =
	(o1: number, o2: number, o3: number, o4: number): Comparator<ReadonlyVec> =>
	(a, b): number => {
		const ax = a[o1];
		const ay = a[o2];
		const az = a[o3];
		const aw = b[o4];
		const bx = b[o1];
		const by = b[o2];
		const bz = b[o3];
		const bw = b[o4];
		return ax === bx
			? ay === by
				? az === bz
					? aw === bw
						? 0
						: aw < bw
						? -4
						: 4
					: az < bz
					? -3
					: 3
				: ay < by
				? -2
				: 2
			: ax < bx
			? -1
			: 1;
	};
