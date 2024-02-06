import type { Sampler2DSym, Vec2Sym, Vec4Sym } from "@thi.ng/shader-ast";
import { S2D, V2, V4 } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2 } from "@thi.ng/shader-ast/ast/lit";
import { add, div, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { texture } from "@thi.ng/shader-ast/builtin/texture";

/**
 * Inline function. Computes single blur step for given +/- offset &
 * weight.
 *
 * @param col -
 * @param tex -
 * @param uv -
 * @param off -
 * @param k -
 */
const singlePass = (
	col: Vec4Sym,
	tex: Sampler2DSym,
	uv: Vec2Sym,
	off: Vec2Sym,
	k: number
) =>
	assign(
		col,
		add(
			col,
			mul(add(texture(tex, add(uv, off)), texture(tex, sub(uv, off))), k)
		)
	);

/**
 * 5x5 gaussian blur texture lookup, optimized, but based on:
 *
 * - http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/
 * - https://github.com/Jam3/glsl-fast-gaussian-blur
 *
 * @param tex - sampler2D
 * @param res - resolution
 * @param uv -
 * @param dir - blur pass direction (`vec2(1,0)` or `vec2(0,1)`)
 */
export const blur5 = defn(
	V4,
	"blur5",
	[S2D, V2, V2, V2],
	(tex, res, uv, dir) => {
		let col: Vec4Sym;
		let off: Vec2Sym;
		const k1 = 0.29411764705882354;
		const k2 = 0.35294117647058826;
		return [
			(off = sym(div(mul(vec2(1 + 1 / 3), dir), res))),
			(col = sym(mul(texture(tex, uv), k1))),
			singlePass(col, tex, uv, off, k2),
			ret(col),
		];
	}
);

/**
 * 9x9 gaussian blur texture lookup, optimized, but based on:
 *
 * - http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/
 * - https://github.com/Jam3/glsl-fast-gaussian-blur
 *
 * @param tex - sampler2D
 * @param res - resolution
 * @param uv -
 * @param dir - blur pass direction (`vec2(1,0)` or `vec2(0,1)`)
 */
export const blur9 = defn(
	V4,
	"blur9",
	[S2D, V2, V2, V2],
	(tex, res, uv, dir) => {
		let col: Vec4Sym;
		let off: Vec2Sym;
		let off2: Vec2Sym;
		let delta: Vec2Sym;
		const k1 = 0.3162162162;
		const k2 = 0.0702702703;
		return [
			(delta = sym(div(dir, res))),
			(off = sym(mul(delta, 1.3846153846))),
			(off2 = sym(mul(delta, 3.2307692308))),
			(col = sym(mul(texture(tex, uv), 0.227027027))),
			singlePass(col, tex, uv, off, k1),
			singlePass(col, tex, uv, off2, k2),
			ret(col),
		];
	}
);

/**
 * 13x13 gaussian blur texture lookup, optimized, but based on:
 *
 * - http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/
 * - https://github.com/Jam3/glsl-fast-gaussian-blur
 *
 * @param tex - sampler2D
 * @param res - resolution
 * @param uv -
 * @param dir - blur pass direction (`vec2(1,0)` or `vec2(0,1)`)
 */
export const blur13 = defn(
	V4,
	"blur13",
	[S2D, V2, V2, V2],
	(tex, res, uv, dir) => {
		let col: Vec4Sym;
		let off: Vec2Sym;
		let off2: Vec2Sym;
		let off3: Vec2Sym;
		let delta: Vec2Sym;
		const k1 = 0.2969069646728344;
		const k2 = 0.09447039785044732;
		const k3 = 0.010381362401148057;
		return [
			(delta = sym(div(dir, res))),
			(off = sym(mul(delta, 1.411764705882353))),
			(off2 = sym(mul(delta, 3.2941176470588234))),
			(off3 = sym(mul(delta, 5.176470588235294))),
			(col = sym(mul(texture(tex, uv), 0.1964825501511404))),
			singlePass(col, tex, uv, off, k1),
			singlePass(col, tex, uv, off2, k2),
			singlePass(col, tex, uv, off3, k3),
			ret(col),
		];
	}
);
