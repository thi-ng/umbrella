import type { Func2, Vec2Sym, Vec3Sym } from "@thi.ng/shader-ast";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { add, lt, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $x, $xy, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import {
	abs,
	floor,
	fract,
	max,
	min,
	mod,
	sqrt,
} from "@thi.ng/shader-ast/builtin/math";
import { permute3 } from "./permute.js";

export const worleyDist = defn(
	"vec3",
	"worleyDist",
	["vec3", "vec3"],
	(a, b) => [ret(add(mul(a, a), mul(b, b)))]
);

export const worleyDistManhattan = defn(
	"vec3",
	"worleyDistManhatten",
	["vec3", "vec3"],
	(a, b) => [ret(add(abs(a), abs(b)))]
);

/**
 * Higher order function. Computes 2D Worley noise using provided
 * distance function. The returned function takes 2 args: position and
 * jitter amount, the latter in [0..1] interval. Returns noise
 * components as vec2, with the x component containing the distance from
 * closest simplex center and y the noise value. The vector components
 * can be used individually or combined (e.g. `noise.y - noise.x`)...
 *
 * Based on implementation by Stefan Gustavson:
 * http://webstaff.itn.liu.se/~stegu/GLSL-cellular/GLSL-cellular-notes.pdf
 *
 * @param distFn -
 */
export const worley2 = (distFn: Func2<"vec3", "vec3", "vec3">) =>
	defn("vec2", "worley2", ["vec2", "float"], (P, jitter) => {
		const K = float(1 / 7);
		const Ko = float(3 / 7);
		const oI = sym(vec3(-1, 0, 1));
		const oF = sym(vec3(-0.5, 0.5, 1.5));
		let pI: Vec2Sym;
		let pF: Vec2Sym;
		let px: Vec3Sym;
		let p: Vec3Sym;
		let d1: Vec3Sym;
		let d2: Vec3Sym;
		let d3: Vec3Sym;
		let d1a: Vec3Sym;
		const $dist = (x: number) =>
			distFn(
				add(add($x(pF), x), mul(sub(fract(mul(p, K)), Ko), jitter)),
				add(
					sub($y(pF), oF),
					mul(
						sub(mul(mod(floor(mul(p, K)), float(7)), K), Ko),
						jitter
					)
				)
			);
		return [
			oI,
			oF,
			(pI = sym(mod(floor(P), float(289)))),
			(pF = sym(fract(P))),
			(px = sym(permute3(add(oI, $x(pI))))),
			(p = sym(permute3(add(add(oI, $y(pI)), $x(px))))),
			(d1 = sym($dist(0.5))),
			assign(p, permute3(add(oI, add($y(pI), $y(px))))),
			(d2 = sym($dist(-0.5))),
			assign(p, permute3(add(oI, add($y(pI), $z(px))))),
			(d3 = sym($dist(-1.5))),
			(d1a = sym(min(d1, d2))),
			assign(d2, min(max(d1, d2), d3)),
			assign(d1, min(d1a, d2)),
			assign(d2, max(d1a, d2)),
			assign($xy(d1), ternary(lt($x(d1), $y(d1)), $xy(d1), $(d1, "yx"))),
			assign(
				$(d1, "xz"),
				ternary(lt($x(d1), $z(d1)), $(d1, "xz"), $(d1, "zx"))
			),
			assign($(d1, "yz"), min($(d1, "yz"), $(d2, "yz"))),
			assign($y(d1), min(min($y(d1), $z(d1)), $x(d2))),
			ret(sqrt($xy(d1))),
		];
	});
