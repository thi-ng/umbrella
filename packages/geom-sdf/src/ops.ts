import type { Fn3, FnN2 } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { assert } from "@thi.ng/errors/assert";
import { SQRT2_2 } from "@thi.ng/math/api";
import { clamp as $clamp, clamp01 } from "@thi.ng/math/interval";
import { mix } from "@thi.ng/math/mix";
import { mod } from "@thi.ng/math/prec";
import type { FieldCoeff, SDFModifiers, SDFn } from "./api.js";

const { abs: $abs, min: $min, max: $max } = Math;

/** @internal */
const __asField = <T>(k: T | FieldCoeff<T>) => (isFunction(k) ? k : () => k);

/** @internal */
const __ensureChildren = (children: SDFn[], min = 1) =>
	assert(children.length >= 1, `require at least ${min} SDF(s)`);

/** @internal */
export const DEFAULT_MODS: SDFModifiers = {
	abs: false,
	flip: false,
	min: -Infinity,
	max: Infinity,
	offset: 0,
};

/**
 * Applies any SDF modifiers specified via {@link SDFModifiers} to the given
 * distance function. Returns a possibly updated distance function.
 *
 * @remarks
 * Order of application is: abs, offset, flip, min, max
 *
 * @param fn
 * @param mods
 */
export const withSDFModifiers = (fn: SDFn, mods: Partial<SDFModifiers>) => {
	const {
		abs: $abs,
		flip: $flip,
		offset: $offset,
		min: $min,
		max: $max,
	} = { ...DEFAULT_MODS, ...mods };
	if ($abs) fn = abs(fn);
	if (isFunction($offset) || $offset > 0) fn = offset(fn, $offset);
	if ($flip) fn = flip(fn);
	if ($min >= -Infinity) {
		if ($max < Infinity) return clamp(fn, $min, $max);
		fn = max(fn, $min);
	} else if ($max < Infinity) fn = min(fn, $max);
	return fn;
};

/**
 * SDF modifier. Augments given `fn` such that it always produces an unsigned
 * (absolute) distance.
 *
 * @param sdf
 */
export const abs =
	(sdf: SDFn): SDFn =>
	(p, minD?: number) =>
		$abs(sdf(p, minD));

/**
 * SDF modifier. Augments given `fn` such that the returned distance is <= given
 * `maxD`.
 *
 * @param sdf
 * @param maxD
 */
export const min =
	(sdf: SDFn, maxD: number): SDFn =>
	(p, minD?: number) =>
		$min(sdf(p, minD), maxD);

/**
 * SDF modifier. Augments given `fn` such that the returned distance is >= given
 * `minD`.
 *
 * @param sdf
 * @param minD
 */
export const max =
	(sdf: SDFn, minD: number): SDFn =>
	(p, currMin?: number) =>
		$max(sdf(p, currMin), minD);

/**
 * SDF modifier. Augments given `fn` such that the returned distance is clamped
 * to given `[minD, maxD]` interval.
 *
 * @param sdf
 * @param minD
 * @param maxD
 */
export const clamp =
	(sdf: SDFn, minD: number, maxD: number): SDFn =>
	(p, $minD?: number) =>
		$clamp(sdf(p, $minD), minD, maxD);

/**
 * SDF modifier. Augments given `fn` such that the sign of the returned distance
 * is flipped (i.e. inside vs. outside).
 *
 * @param sdf
 */
export const flip =
	(sdf: SDFn): SDFn =>
	(p, minD?: number) =>
		-sdf(p, minD);

/**
 * SDF modifier. Augments given `fn` such that the returned distance will have
 * given offset `r` (radius) subtracted. If `r` is a function it will be
 * evaluated for each point the original SDF function is evaluated too and its
 * return value will be subtracted, allowing for varying offsets.
 *
 * @param sdf
 * @param r
 */
export const offset = (sdf: SDFn, r: number | FieldCoeff): SDFn =>
	isFunction(r)
		? (p, minD?: number) => sdf(p, minD) - r(p)
		: (p, minD?: number) => sdf(p, minD) - r;

export const defOp =
	(op: FnN2) =>
	(children: SDFn[]): SDFn => {
		__ensureChildren(children);
		const n = children.length;
		return (p, minD = Infinity) => {
			let res = children[0](p, minD);
			if (res < minD) minD = res;
			for (let i = 1; i < n; i++) {
				const d = children[i](p, minD);
				if (d < minD) minD = d;
				res = op(res, d);
			}
			return res;
		};
	};

export const union = defOp($min);

export const isec = defOp($max);

export const diff = defOp((a, b) => $max(a, -b));

export const defParamOp =
	<T = number>(op: Fn3<number, number, T, number>) =>
	(k: T | FieldCoeff<T>, children: SDFn[]): SDFn => {
		__ensureChildren(children);
		const kfield = __asField<T>(k);
		const n = children.length;
		return (p, minD = Infinity) => {
			const $k = kfield(p);
			let res = children[0](p, minD);
			if (res < minD) minD = res;
			for (let i = 1; i < n; i++) {
				const d = children[i](p, minD);
				if (d < minD) minD = d;
				res = op(res, d, $k);
			}
			return res;
		};
	};

export const smoothUnion = defParamOp((a, b, k) => {
	const h = clamp01(0.5 + (0.5 * (b - a)) / k);
	return mix(b, a, h) - k * h * (1 - h);
});

export const smoothIsec = defParamOp((a, b, k) => {
	const h = clamp01(0.5 - (0.5 * (b - a)) / k);
	return mix(b, a, h) + k * h * (1 - h);
});

export const smoothDiff = defParamOp((a, b, k) => {
	const h = clamp01(0.5 - (0.5 * (a + b)) / k);
	return mix(a, -b, h) + k * h * (1 - h);
});

export const chamferUnion = defParamOp((a, b, k) =>
	$min(a, b, (a - k + b) * SQRT2_2)
);

export const chamferIsec = defParamOp((a, b, k) =>
	$max(a, b, (a + k + b) * SQRT2_2)
);

export const chamferDiff = defParamOp((a, b, k) =>
	$max(a, -b, (a + k - b) * SQRT2_2)
);

export const roundUnion = defParamOp(
	(a, b, k) =>
		$max(k, $min(a, b)) - Math.hypot($max(k - a, 0), $max(k - b, 0))
);

export const roundIsec = defParamOp(
	(a, b, k) =>
		$min(-k, $max(a, b)) + Math.hypot($max(k + a, 0), $max(k + b, 0))
);

export const roundDiff = defParamOp(
	(a, b, k) =>
		$min(-k, $max(a, -b)) + Math.hypot($max(k + a, 0), $max(k - b, 0))
);

const __steps = (a: number, b: number, [r, n]: [number, number]) => {
	const s = r / n;
	const u = b - r;
	return $min(a, b, 0.5 * (u + a + Math.abs(mod(u - a + s, 2 * s) - s)));
};

export const stepUnion = defParamOp(__steps);

export const stepIsec = defParamOp<[number, number]>(
	(a, b, k) => -__steps(-a, -b, k)
);

export const stepDiff = defParamOp<[number, number]>(
	(a, b, k) => -__steps(-a, b, k)
);
