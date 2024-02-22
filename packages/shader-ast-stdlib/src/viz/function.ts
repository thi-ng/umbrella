import type {
	FloatSym,
	Func1,
	Func2,
	Vec2Sym,
	Vec2Term,
} from "@thi.ng/shader-ast";
import { F, V2 } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { forLoop, ifThen } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import {
	FLOAT0,
	FLOAT2,
	VEC2_0,
	VEC2_1,
	float,
	vec2,
} from "@thi.ng/shader-ast/ast/lit";
import {
	add,
	div,
	gt,
	inc,
	lt,
	lte,
	or,
	sub,
} from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { fit } from "../math/fit.js";

export interface FnSampleOpts {
	/**
	 * Pixel radius per axis. The function will be sampled at ± N around the
	 * given base fragment position.
	 *
	 * @defaultValue 1
	 */
	radius: number;
	/**
	 * Number of sub-fragment steps per axis. The function will be sampled at ±
	 * {@link FnSampleOpts.radius} around the given base fragment position.
	 *
	 * @defaultValue 4
	 */
	steps: number;
	/**
	 * If true, the {@link functionSampler} will return 1.0 for the entire area
	 * below the curve (i.e. turns a line plot into an area plot). By default
	 * only the fragments touching the curve will produce non-zero results.
	 *
	 * @defaultValue false
	 */
	area: boolean;
	/**
	 * Min X position (in function domain). The function will only be evaluated
	 * within the [min..max] domain.
	 *
	 * @defaultValue 0
	 */
	min: number;
	/**
	 * Max X position (in function domain). The function will only be evaluated
	 * within the [min..max] domain.
	 *
	 * @defaultValue 1
	 */
	max: number;
}

/**
 * Higher order function. Takes a unary 1D function `fn` to evaluate and plot
 * within a given interval. Also takes a point mapping function `map` to
 * transform fragment coordinates into the function domain. Returns a new
 * specialized function, which then accepts 2x vec2 args: a fragment coordinate
 * and overall viewport dimensions. It then transforms the point into the
 * function domain and evaluates/samples the function `fn` in the sub-pixel
 * region around the input position. Returns a coverage ratio of how many
 * samples where on the curve.
 *
 * @remarks
 * The function domain, sampling region & quality can be configured via options.
 * See {@link FnSampleOpts} for details.
 *
 * See {@link functionDomainMapper} for a configurable point mapping function.
 */
export const functionSampler = (
	fn: Func1<"float", "float">,
	map: Func2<"vec2", "vec2", "vec2">,
	opts: Partial<FnSampleOpts> = {}
) => {
	const { min = 0, max = 1, radius = 1, steps = 4, area = false } = opts;
	return defn(F, undefined, [V2, V2], (frag, res) => {
		let count: FloatSym, total: FloatSym;
		let q: Vec2Sym;
		const invStep = float((2 * radius) / steps);
		return [
			(q = sym(map(frag, res))),
			// bail out early if outside [min..max] interval
			ifThen(or(lt($x(q), float(min)), gt($x(q), float(max))), [
				ret(FLOAT0),
			]),
			(count = sym(FLOAT0)),
			(total = sym(FLOAT0)),
			forLoop(
				sym(float(-radius)),
				(x) => lte(x, float(radius)),
				(x) => assign(x, add(x, invStep)),
				(x) => [
					forLoop(
						sym(float(-radius)),
						(y) => lte(y, float(radius)),
						(y) => assign(y, add(y, invStep)),
						(y) => [
							inc(total),
							assign(q, map(add(frag, vec2(x, y)), res)),
							ifThen(gt(fn($x(q)), $y(q)), [inc(count)]),
						]
					),
				]
			),
			...(!area
				? [
						ifThen(gt(count, div(total, FLOAT2)), [
							assign(count, sub(total, count)),
						]),
				  ]
				: []),
			ret(div(count, total)),
		];
	});
};

/**
 * Higher order helper function for {@link functionSampler} to map fragment
 * coordinates within a screen rect (defined by `pos` & `size` in UV space) into
 * the domain of the sampled function interval.
 *
 * @param amin
 * @param amax
 * @param bmin
 * @param bmax
 */
export const functionDomainMapper = (
	amin: Vec2Term,
	amax: Vec2Term,
	bmin: Vec2Term = VEC2_0,
	bmax: Vec2Term = VEC2_1
) =>
	defn(V2, undefined, [V2, V2], (p, res) => [
		ret(fit(div(p, res), amin, amax, bmin, bmax)),
	]);
