import type {
	IVector,
	VecOpV,
	VecOpVN,
	VecOpVV,
	VecOpVVN,
	VecOpVVV,
} from "./api.js";

/**
 * Vec2/3/4 view based buffer transformation for {@link VecOpVV} type
 * ops and supporting arbitrary component and element layouts of all
 * input and output buffers.
 *
 * @remarks
 * The given pre-initialized vectors MUST be separate instances, are
 * used as sliding cursors / views of their respective backing buffers
 * and will be modified as part of the transformation process (though
 * the input buffers themselves are treated as immutable, unless `out`
 * is configured to use one of the input buffers).
 *
 * In each iteration `op` is called via `op(out, a, b)`, followed by
 * cursor updates to process the next vector view. No bounds checking is
 * performed.
 *
 * This function returns `out`'s backing buffer.
 *
 * @example
 * ```ts
 * import { add2, mapVV, Vec2 } from "@thi.ng/vectors";
 *
 * // each input buffer contains 2 2D vectors, but using
 * // different strided data layouts
 * mapVV(
 *   // transformation function
 *   add2,
 *   // init output buffer view
 *   new Vec2(),
 *   // wrap 1st input buffer & configure offset & component stride
 *   new Vec2([1,0,2,0,0,0,0,0,3,0,4,0,0,0,0,0], 0, 2),
 *   // wrap 2nd input buffer
 *   new Vec2([0,10,0,0,20,0,0,30,0,0,40], 1, 3),
 *   2, // num vectors
 *   2, // output element stride
 *   8, // input #1 element stride
 *   6  // input #2 element stride
 * );
 * // [ 11, 22, 33, 44 ]
 * ```
 *
 * Alternatively, `Vec2/3/4.iterator()` combined with transducers can be
 * used to achieve the same (and more flexible) transformations, but
 * will incur more intermediate object allocations. `mapV*()` functions
 * only use (and mutate) the provided vector instances and do not
 * allocate any further objects.
 *
 * ```ts
 * import { add2, Vec2 } from "@thi.ng/vectors";
 * import { map, run, zip } from "@thi.ng/transducers";
 *
 * // output buffer
 * const out = new Array(4);
 *
 * run(
 *   map(([o, a, b]) => add2(o, a, b)),
 *   zip(
 *     Vec2.iterator(out, 2),
 *     Vec2.iterator([1,0,2,0,0,0,0,0,3,0,4,0,0,0,0,0], 2, 0, 2, 8),
 *     Vec2.iterator([0,10,0,0,20,0,0,30,0,0,40], 2, 1, 3, 6),
 *   )
 * );
 *
 * out
 * // [ 11, 22, 33, 44 ]
 * ```
 *
 * @param op -
 * @param out -
 * @param a -
 * @param b -
 * @param num -
 * @param so -
 * @param sa -
 * @param sb -
 */
export const mapVV = (
	op: VecOpVV,
	out: IVector<any>,
	a: IVector<any>,
	b: IVector<any>,
	num: number,
	so = out.length * out.stride,
	sa = a.length * a.stride,
	sb = b.length * b.stride
) => {
	while (num-- > 0) {
		op(out, a, b);
		out.offset += so;
		a.offset += sa;
		b.offset += sb;
	}
	return out.buf;
};

/**
 * Like {@link mapVV}, but for {@link VecOpV} type ops and hence only using
 * single input.
 *
 * @example
 * ```ts
 * import { mapV, swapXY, Vec2 } from "@thi.ng/vectors";
 *
 * // 4x 2D vectors in SOA layout
 * // i.e. [x1, x2, x3, x4, y1, y2, y3, y4]
 * buf = [1, 3, 5, 7, 2, 4, 6, 8];
 *
 * // use `swapXY` to swizzle each vector and use AOS for output
 * res = mapV(swapXY, new Vec2(), new Vec2(buf, 0, 4), 4, 2, 1);
 * // [ 2, 1, 4, 3, 6, 5, 8, 7 ]
 *
 * // unpack result for demonstration purposes
 * [...Vec2.iterator(res, 4)].map(v => [...v]);
 * // [ [ 2, 1 ], [ 4, 3 ], [ 6, 5 ], [ 8, 7 ] ]
 * ```
 *
 * @param op -
 * @param out -
 * @param a -
 * @param num -
 * @param so -
 * @param sa -
 */
export const mapV = (
	op: VecOpV,
	out: IVector<any>,
	a: IVector<any>,
	num: number,
	so = out.length * out.stride,
	sa = a.length * a.stride
) => {
	while (num-- > 0) {
		op(out, a);
		out.offset += so;
		a.offset += sa;
	}
	return out.buf;
};

/**
 * Like {@link mapVV}, but for {@link VecOpVN} type ops and hence using
 * a single vector input buffer `a` and a scalar `n`.
 *
 * @param op -
 * @param out -
 * @param a -
 * @param n -
 * @param num -
 * @param so -
 * @param sa -
 */
export const mapVN = (
	op: VecOpVN,
	out: IVector<any>,
	a: IVector<any>,
	n: number,
	num: number,
	so = out.length * out.stride,
	sa = a.length * a.stride
) => {
	while (num-- > 0) {
		op(out, a, n);
		out.offset += so;
		a.offset += sa;
	}
	return out.buf;
};

/**
 * Like {@link mapVV}, but for {@link VecOpVVV} type ops and hence using
 * three vector input buffers `a`, `b`, `c`.
 *
 * @param op -
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 * @param num -
 * @param so -
 * @param sa -
 * @param sb -
 * @param sc -
 */
export const mapVVV = (
	op: VecOpVVV,
	out: IVector<any>,
	a: IVector<any>,
	b: IVector<any>,
	c: IVector<any>,
	num: number,
	so = out.length * out.stride,
	sa = a.length * a.stride,
	sb = b.length * b.stride,
	sc = c.length * c.stride
) => {
	while (num-- > 0) {
		op(out, a, b, c);
		out.offset += so;
		a.offset += sa;
		b.offset += sb;
		c.offset += sc;
	}
	return out.buf;
};

/**
 * Like {@link mapVV}, but for {@link VecOpVVN} type ops and hence using
 * two vector input buffers `a`, `b` and a scalar `n`.
 *
 * @param op -
 * @param out -
 * @param a -
 * @param b -
 * @param n -
 * @param num -
 * @param so -
 * @param sa -
 * @param sb -
 */
export const mapVVN = (
	op: VecOpVVN,
	out: IVector<any>,
	a: IVector<any>,
	b: IVector<any>,
	n: number,
	num: number,
	so = out.length * out.stride,
	sa = a.length * a.stride,
	sb = b.length * b.stride
) => {
	while (num-- > 0) {
		op(out, a, b, n);
		out.offset += so;
		a.offset += sa;
		b.offset += sb;
	}
	return out.buf;
};
