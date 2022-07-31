import type {
	FloatTerm,
	Mat3Term,
	Vec2Term,
	Vec3Term,
} from "@thi.ng/shader-ast";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { indexMat } from "@thi.ng/shader-ast/ast/indexed";
import {
	float,
	FLOAT0,
	FLOAT05,
	FLOAT1,
	vec3,
	VEC3_0,
	VEC3_1,
} from "@thi.ng/shader-ast/ast/lit";
import { lt, madd, mul, reciprocal, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { max, min, pow } from "@thi.ng/shader-ast/builtin/math";
import { fit01, fitClamped } from "../math/fit.js";

/**
 * Takes normalized `mid` level and converts it into an exponent for gamma
 * correction using {@link levelAdjustGamma}.
 *
 * @remarks
 * Reference: https://stackoverflow.com/a/48859502/294515
 */
export const midLevelGamma = defn(
	"float",
	"midLevelGamma",
	["float"],
	(mid) => [
		ret(
			reciprocal(
				ternary(
					lt(mid, FLOAT05),
					min(float(9.99), madd(float(9), sub(1, mul(mid, 2)), 1)),
					max(float(0.01), sub(1, sub(mul(mid, 2), 1)))
				)
			)
		),
	]
);

/**
 * Inline function.  Similar to {@link midLevelGamma}, but for RGB values (with
 * potentially varying settings per channel). To be used with
 * {@link levelAdjustGammaRGB}.
 *
 * @param mid -
 */
export const midLevelGammaRGB = (mid: Vec3Term) =>
	vec3(
		midLevelGamma($x(mid)),
		midLevelGamma($y(mid)),
		midLevelGamma($z(mid))
	);

/**
 * Applies level remapping from `input` to `output` (each given as
 * `vec2(min,max)`) with `gamma` correction. Results will be clamped to [0..1]
 * range.
 */
export const levelAdjustGamma = defn(
	"float",
	"levelAdjustGamma",
	["float", "float", "vec2", "vec2"],
	(x, gamma, input, output) => [
		ret(
			fit01<FloatTerm>(
				pow(
					fitClamped<FloatTerm>(
						x,
						$x(input),
						$y(input),
						FLOAT0,
						FLOAT1
					),
					gamma
				),
				$x(output),
				$y(output)
			)
		),
	]
);

/**
 * Similar to {@link levelAdjustGamma}, but for RGB values (with potentially
 * varying settings per channel).
 *
 * @remarks
 * Note: Only the first to columns of the `mat3` args will be used (for WebGL1
 * compatibility):
 *
 * - 1st column = RGB min values
 * - 2nd column = RGB max values
 */
export const levelAdjustGammaRGB = defn(
	"vec3",
	"levelAdjustGammaRGB",
	["vec3", "vec3", "mat3", "mat3"],
	(x, gamma, input, output) => [
		ret(
			fit01<Vec3Term>(
				pow(
					fitClamped<Vec3Term>(
						x,
						indexMat(input, 0),
						indexMat(input, 1),
						VEC3_0,
						VEC3_1
					),
					gamma
				),
				indexMat(output, 0),
				indexMat(output, 1)
			)
		),
	]
);

/**
 * Inline function. Similar to {@link levelAdjustGamma}, but first computes
 * gamma from given `mid` level.
 *
 * @remarks
 * Also see {@link midLevelGamma}.
 *
 * @param x - float
 * @param mid - float
 * @param input - vec2(min,max)
 * @param output - vec2(min,max)
 */
export const levelAdjustMid = (
	x: FloatTerm,
	mid: FloatTerm,
	input: Vec2Term,
	output: Vec2Term
) => levelAdjustGamma(x, midLevelGamma(mid), input, output);

/**
 * Inline function. Similar to {@link levelAdjustMid}, but for RGB values (with
 * potentially varying settings per channel).
 *
 * @remarks
 * Also see {@link levelAdjustGammaRGB}, {@link midLevelGammaRGB}.
 *
 * @param x -
 * @param mid -
 * @param input -
 * @param output -
 */
export const levelAdjustMidRGB = (
	x: Vec3Term,
	mid: Vec3Term,
	input: Mat3Term,
	output: Mat3Term
) => levelAdjustGammaRGB(x, midLevelGammaRGB(mid), input, output);
