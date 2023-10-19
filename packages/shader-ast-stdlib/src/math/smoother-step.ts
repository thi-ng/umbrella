import type { PrimTypeMap, TaggedFn1 } from "@thi.ng/shader-ast";
import { F, V2, V3, V4 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { add, div, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { clamp01 } from "./clamp.js";

const $ = <N extends 1 | 2 | 3 | 4, T extends PrimTypeMap[N]>(n: N, type: T) =>
	defn(type, `smootherStep01${n > 1 ? "_" + n : ""}`, [type], (x) => [
		// @ts-ignore
		ret(mul(x, mul(x, mul(x, add(mul(x, sub(mul(x, 6), 15)), 10))))),
	]);

/**
 * Specialized version of {@link smootherStep}, assuming edges are 0/1
 * respectively and `x` is in [0..1]. No clamping performed.
 *
 * @param x
 */
export const smootherStep01 = $(1, F);
export const smootherStep01_2 = $(2, V2);
export const smootherStep01_3 = $(3, V3);
export const smootherStep01_4 = $(4, V4);

const $$ = <N extends 1 | 2 | 3 | 4, T extends PrimTypeMap[N]>(
	n: N,
	type: T,
	fn: TaggedFn1<T, T>
) =>
	defn(
		type,
		`smootherStep${n > 1 ? n : ""}`,
		[type, type, type],
		(e0, e1, x) => [ret(fn(clamp01(<any>div(sub(x, e0), sub(e1, e0)))))]
	);

/**
 * Similar to GLSL-native `smoothstep()` but using different, higher degree
 * polynomial.
 *
 * @remarks
 * Also see {@link smootherStep01}
 */
export const smootherStep = $$(1, F, smootherStep01);
export const smootherStep2 = $$(2, V2, smootherStep01_2);
export const smootherStep3 = $$(3, V3, smootherStep01_3);
export const smootherStep4 = $$(4, V4, smootherStep01_4);
