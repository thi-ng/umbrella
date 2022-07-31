import type { ReadonlyVec, Vec, VecOpV } from "./api.js";
import { setC2, setC3, setC4 } from "./setc.js";

/**
 * Places a re-ordered 2D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out -
 * @param a -
 * @param x - new x coord index
 * @param y - new y coord index
 */
export const swizzle2 = (
	out: Vec | null,
	a: ReadonlyVec,
	x: number,
	y: number
) => setC2(out || a, a[x] || 0, a[y] || 0);

/**
 * Places a re-ordered 3D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out -
 * @param a -
 * @param x - new x coord index
 * @param y - new y coord index
 * @param z - new z coord index
 */
export const swizzle3 = (
	out: Vec | null,
	a: ReadonlyVec,
	x: number,
	y: number,
	z: number
) => setC3(out || a, a[x] || 0, a[y] || 0, a[z] || 0);

/**
 * Places a re-ordered 4D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out -
 * @param a -
 * @param x - new x coord index
 * @param y - new y coord index
 * @param z - new z coord index
 * @param w - new w coord index
 */
export const swizzle4 = (
	out: Vec | null,
	a: ReadonlyVec,
	x: number,
	y: number,
	z: number,
	w: number
) => setC4(out || a, a[x] || 0, a[y] || 0, a[z] || 0, a[w] || 0);

export const swapXY: VecOpV = (out, v) => swizzle3(out, v, 1, 0, 2);

export const swapXZ: VecOpV = (out, v) => swizzle3(out, v, 2, 1, 0);

export const swapYZ: VecOpV = (out, v) => swizzle3(out, v, 0, 2, 1);

/**
 * Sets `out[a] = n`, returns `out`.
 *
 * @param out -
 * @param n -
 * @param a -
 */
export const setSwizzle1 = (out: Vec, n: number, a: number) => (
	(out[a] = n), out
);

/**
 * Sets `out[a] = v.x, out[b] = v.y`, returns `out`.
 *
 * @param out -
 * @param v -
 * @param a -
 * @param b -
 */
export const setSwizzle2 = (out: Vec, v: ReadonlyVec, a: number, b: number) => (
	((out[a] = v[0]), (out[b] = v[1])), out
);

/**
 * Sets `out[a] = v.x, out[b] = v.y, out[c] = v.z`, returns `out`.
 *
 * @param out -
 * @param v -
 * @param a -
 * @param b -
 * @param c -
 */
export const setSwizzle3 = (
	out: Vec,
	v: ReadonlyVec,
	a: number,
	b: number,
	c: number
) => (((out[a] = v[0]), (out[b] = v[1]), (out[c] = v[2])), out);

/**
 * Sets `out[a] = v.x, out[b] = v.y, out[c] = v.z, out[d]=v.w`, returns `out`.
 *
 * @param out -
 * @param v -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const setSwizzle4 = (
	out: Vec,
	v: ReadonlyVec,
	a: number,
	b: number,
	c: number,
	d: number
) => (
	((out[a] = v[0]), (out[b] = v[1]), (out[c] = v[2]), (out[d] = v[3])), out
);
