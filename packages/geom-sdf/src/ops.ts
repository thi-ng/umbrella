import type { Fn3, FnN2 } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { assert } from "@thi.ng/errors/assert";
import { clamp01, mix, mod, SQRT2_2 } from "@thi.ng/math";
import type { FieldCoeff, SDFn } from "./api.js";

const __asField = <T>(k: T | FieldCoeff<T>) => (isFunction(k) ? k : () => k);

const __ensureChildren = (children: SDFn[], min = 1) =>
	assert(children.length >= 1, `require at least ${min} SDF(s)`);

const { min, max } = Math;

export const abs =
	(sdf: SDFn): SDFn =>
	(p, minD?: number) =>
		Math.abs(sdf(p, minD));

export const flip =
	(sdf: SDFn): SDFn =>
	(p, minD?: number) =>
		-sdf(p, minD);

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

export const union = defOp(min);

export const isec = defOp(max);

export const diff = defOp((a, b) => max(a, -b));

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
	min(min(a, b), (a - k + b) * SQRT2_2)
);

export const chamferIsec = defParamOp((a, b, k) =>
	max(max(a, b), (a + k + b) * SQRT2_2)
);

export const chamferDiff = defParamOp((a, b, k) =>
	max(max(a, -b), (a + k - b) * SQRT2_2)
);

export const roundUnion = defParamOp(
	(a, b, k) => max(k, min(a, b)) - Math.hypot(max(k - a, 0), max(k - b, 0))
);

export const roundIsec = defParamOp(
	(a, b, k) => min(-k, max(a, b)) + Math.hypot(max(k + a, 0), max(k + b, 0))
);

export const roundDiff = defParamOp(
	(a, b, k) => min(-k, max(a, -b)) + Math.hypot(max(k + a, 0), max(k - b, 0))
);

const __steps = (a: number, b: number, [r, n]: [number, number]) => {
	const s = r / n;
	const u = b - r;
	return min(min(a, b), 0.5 * (u + a + Math.abs(mod(u - a + s, 2 * s) - s)));
};

export const stepUnion = defParamOp(__steps);

export const stepIsec = defParamOp<[number, number]>(
	(a, b, k) => -__steps(-a, -b, k)
);

export const stepDiff = defParamOp<[number, number]>(
	(a, b, k) => -__steps(-a, b, k)
);
