export interface SIMD {
	// prettier-ignore
	abs4_f32(out: number, a: number, num: number, so: number, sa: number): number;

	// prettier-ignore
	add4_f32(out: number, a: number, b: number, num: number, so: number, sa: number, sb: number): number;

	// prettier-ignore
	addn4_f32(out: number, a: number, n: number, num: number, so: number, sa: number): number;

	/**
	 * Takes three vec4 buffers, clamps `a` componentwise to `min(max(a, b),
	 * c)` and stores results in `out`. Both AOS / SOA layouts are
	 * supported, as long as all buffers are using the same layout.
	 *
	 * All strides must by multiples of 4. All pointers must be aligned to
	 * multiples of 16. Returns `out` pointer.
	 *
	 * Set `sb` and `sc` to 0 for clamping all `a` vectors against same
	 * bounds.
	 *
	 * @param out -
	 * @param a -
	 * @param b -
	 * @param c -
	 * @param num - number of vec4
	 * @param so - out element stride
	 * @param sa - A element stride
	 * @param sb - B element stride
	 * @param sc - C element stride
	 */
	clamp4_f32(
		out: number,
		a: number,
		b: number,
		c: number,
		num: number,
		so: number,
		sa: number,
		sb: number,
		sc: number
	): number;

	// prettier-ignore
	clampn4_f32(out: number, a: number, b: number, c: number, num: number, so: number, sa: number): number;

	// prettier-ignore
	div4_f32(out: number, a: number, b: number, num: number, so: number, sa: number, sb: number): number;

	// prettier-ignore
	divn4_f32(out: number, a: number, n: number, num: number, so: number, sa: number): number;

	/**
	 * Takes two densely packed vec2 AOS buffers `a` and `b`, computes their
	 * 2D dot products and stores results in `out`. Computes two results per
	 * iteration, hence `num` must be an even number or else the last vector
	 * will not be processed. `so` should be 1 for packed result buffers.
	 *
	 * @remarks
	 * `a` and `b` should be aligned to 16, `out` to multiples of 4.
	 *
	 * @param out -
	 * @param a -
	 * @param b -
	 * @param num -
	 */
	dot2_f32_aos(out: number, a: number, b: number, num: number): number;

	/**
	 * Takes two vec4 AOS buffers, computes their dot products and stores
	 * results in `out`. `so` should be 1 for a packed result buffer. `sa`
	 * and `sb` indicate the stride lengths (in floats) between each vector
	 * in each respective buffer and should be a multiple of 4.
	 *
	 * @param out -
	 * @param a -
	 * @param b -
	 * @param num -
	 * @param so -
	 * @param sa -
	 * @param sb -
	 */
	dot4_f32_aos(
		out: number,
		a: number,
		b: number,
		num: number,
		so: number,
		sa: number,
		sb: number
	): number;

	/**
	 * Takes two vec4 SOA buffers and computes their 4D dot products and
	 * writes results to `out`. `sa` and `sb` indicate the element
	 * stride size (in floats) of the respective vectors (should be
	 * multiple of 4). The results are always stored in a packed layout.
	 * Processes 4 vectors per iteration, hence `num` should be a
	 * multiple of 4 too.
	 *
	 * @param out -
	 * @param a -
	 * @param b -
	 * @param num -
	 * @param sa -
	 * @param sb -
	 */
	// prettier-ignore
	dot4_f32_soa(out: number, a: number, b: number, num: number, sa: number, sb: number): number;

	/**
	 * Also see {@link SIMD.sqrt4_f32}
	 *
	 * @param out -
	 * @param a -
	 * @param num -
	 * @param so -
	 * @param sa -
	 */
	// prettier-ignore
	invsqrt4_f32(out: number, a: number, num: number, so: number, sa: number): number;

	/**
	 * Takes three vec4 buffers, computes componentwise a * b + c and stores
	 * results in `out`. Both AOS / SOA layouts are supported, as long as
	 * all buffers are using the same layout.
	 *
	 * All strides must by multiples of 4. All pointers must be aligned to
	 * multiples of 16. Returns `out` pointer.
	 *
	 * @param out -
	 * @param a -
	 * @param b -
	 * @param c -
	 * @param num - number of vec4
	 * @param so - out element stride
	 * @param sa - A element stride
	 * @param sb - B element stride
	 * @param sc - C element stride
	 */
	madd4_f32(
		out: number,
		a: number,
		b: number,
		c: number,
		num: number,
		so: number,
		sa: number,
		sb: number,
		sc: number
	): number;

	// prettier-ignore
	maddn4_f32(out: number, a: number, b: number, c: number, num: number, so: number, sa: number, sc: number): number;

	mag2_f32_aos(out: number, a: number, num: number): number;

	magsq2_f32_aos(out: number, a: number, num: number): number;

	// prettier-ignore
	mag4_f32_aos( out: number, a: number, num: number, so: number, sa: number): number;

	// prettier-ignore
	magsq4_f32_aos( out: number, a: number, num: number, so: number, sa: number): number;

	// prettier-ignore
	max4_f32(out: number, a: number, b: number, num: number, so: number, sa: number, sb: number): number;

	// prettier-ignore
	min4_f32(out: number, a: number, b: number, num: number, so: number, sa: number, sb: number): number;

	// prettier-ignore
	mix4_f32(out: number, a: number, b: number, t: number, num: number, so: number, sa: number, sb: number, st: number): number;

	// prettier-ignore
	mixn4_f32(out: number, a: number, b: number, t: number, num: number, so: number, sa: number, sb: number): number;

	// prettier-ignore
	mul4_f32(out: number, a: number, b: number, num: number, so: number, sa: number, sb: number): number;

	// prettier-ignore
	muln4_f32(out: number, a: number, n: number, num: number, so: number, sa: number): number;

	// prettier-ignore
	mul_m22v2_aos(out: number, mat: number, vec: number, num: number): number;

	// prettier-ignore
	mul_m23v2_aos(out: number, mat: number, vec: number, num: number): number;

	// prettier-ignore
	mul_m44v4_aos(out: number, mat: number, vec: number, num: number, so: number, sv: number): number;

	// prettier-ignore
	msub4_f32(out: number, a: number, b: number, c: number, num: number, so: number, sa: number, sb: number, sc: number): number;

	/**
	 * Takes three vec4 buffers, computes componentwise a * b - c and stores
	 * results in `out`. Both AOS / SOA layouts are supported, as long as
	 * all buffers are using the same layout.
	 *
	 * All strides must by multiples of 4. All pointers must be aligned to
	 * multiples of 16. Returns `out` pointer.
	 *
	 * @param out -
	 * @param a -
	 * @param b - scalar factor
	 * @param c -
	 * @param num - number of vec4
	 * @param so - out element stride
	 * @param sa - A element stride
	 * @param sc - C element stride
	 */
	msubn4_f32(
		out: number,
		a: number,
		b: number,
		c: number,
		num: number,
		so: number,
		sa: number,
		sc: number
	): number;

	// prettier-ignore
	neg4_f32(out: number, a: number, num: number, so: number, sa: number): number;

	// prettier-ignore
	normalize2_f32_aos(out: number, a: number, num: number, norm: number): number;

	// prettier-ignore
	normalize4_f32_aos(out: number, a: number, num: number, norm: number, so: number, sa: number): number;

	/**
	 * Sets a single float vector lane `id` in `num` items from `addr`,
	 * spaced by `stride`. `id` is used as start offset for `addr`. Both
	 * `id` and `stride` are in floats, not bytes. Returns `addr`.
	 *
	 * ```ts
	 * // see README for simd initialization
	 *
	 * // set Y component in AOS vec4 buffer from addr 0x1000
	 * simd.set_lane_f32(0x1000, 1, 1.23, 4, 4)
	 * ```
	 *
	 * @param addr -
	 * @param id -
	 * @param x -
	 * @param num -
	 * @param stride -
	 */
	set_lane_f32(
		addr: number,
		id: number,
		x: number,
		num: number,
		stride: number
	): number;

	/**
	 * Also see {@link SIMD.invsqrt4_f32}
	 *
	 * @param out -
	 * @param a -
	 * @param num -
	 * @param so -
	 * @param sa -
	 */
	// prettier-ignore
	sqrt4_f32(out: number, a: number, num: number, so: number, sa: number): number;

	// prettier-ignore
	sub4_f32(out: number, a: number, b: number, num: number, so: number, sa: number, sb: number): number;

	// prettier-ignore
	subn4_f32(out: number, a: number, n: number, num: number, so: number, sa: number): number;

	sum4_f32(a: number, num: number, sa: number): number;

	/**
	 * Swaps, reorders or replaces vector components in an AOS f32/u32 vec4
	 * buffer. The `x`,`y`,`z`,`w` args indicate the intended lane values
	 * (each 0-3).
	 *
	 * @example
	 * ```ts
	 * // see README for simd initialization
	 *
	 * simd.f32.set([10, 20, 30, 40], 0)
	 * simd.swizzle4_f32(
	 *   16,         // dest ptr
	 *   0,          // src ptr
	 *   3, 0, 1, 2, // lane IDs
	 *   1,          // num vectors
	 *   4,          // output stride (in f32/u32)
	 *   4           // input stride
	 * )
	 *
	 * simd.f32.slice(4, 8)
	 * // [40, 10, 20, 30]
	 * ```
	 *
	 * @param out -
	 * @param a -
	 * @param x -
	 * @param y -
	 * @param z -
	 * @param w -
	 * @param num -
	 * @param so -
	 * @param sa -
	 */
	swizzle4_32_aos(
		out: number,
		a: number,
		x: number,
		y: number,
		z: number,
		w: number,
		num: number,
		so: number,
		sa: number
	): number;

	/**
	 * WASM memory instance given to `init()`.
	 */
	memory: WebAssembly.Memory;
	/**
	 * Float64 view of WASM memory.
	 */
	f64: Float64Array;
	/**
	 * Float32 view of WASM memory.
	 */
	f32: Float32Array;
	/**
	 * Uint32 view of WASM memory.
	 */
	u32: Uint32Array;
	/**
	 * Int32 view of WASM memory.
	 */
	i32: Int32Array;
	/**
	 * Uint16 of WASM memory.
	 */
	u16: Uint16Array;
	/**
	 * Int16 view of WASM memory.
	 */
	i16: Int16Array;
	/**
	 * Uint8 view of WASM memory.
	 */
	u8: Uint8Array;
	/**
	 * Int8 view of WASM memory.
	 */
	i8: Int8Array;
}
