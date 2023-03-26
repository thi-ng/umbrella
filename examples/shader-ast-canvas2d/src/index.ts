import {
	$x,
	$y,
	add,
	cos,
	defn,
	div,
	dot,
	float,
	mul,
	ret,
	sin,
	sym,
	vec3,
	vec4,
	type FloatSym,
	type Vec2Sym,
} from "@thi.ng/shader-ast";
import { targetGLSL } from "@thi.ng/shader-ast-glsl";
import { canvasRenderer, targetJS } from "@thi.ng/shader-ast-js";
import { fit0111, fit1101 } from "@thi.ng/shader-ast-stdlib";

const js = targetJS();
const gl = targetGLSL();

// ported from: http://glslsandbox.com/e#55242.0
const main = defn(
	// return type
	"vec4",
	// func name
	"main",
	// args (names are optional)
	[
		["vec2", "fragCoord"],
		["vec2", "res"],
		["float", "time"],
	],
	// bound args given to function body
	(frag, res, time) => {
		let a: FloatSym;
		let p: FloatSym;
		let uv: Vec2Sym;
		let sp: Vec2Sym;
		let dp: FloatSym;
		let p2: FloatSym;
		let m: FloatSym;
		return [
			(a = sym(add(mul(sin(time), float(2)), float(3)))),
			(p = sym(add(mul($y(frag), $x(res)), $x(frag)))),
			(uv = sym(fit0111(div(frag, res)))),
			(sp = sym(mul(uv, a))),
			(dp = sym(dot(sp, sp))),
			(p2 = sym(add(mul($y(sp), $x(res)), $x(sp)))),
			(m = sym(
				mul(
					div(add(p2, mul(p, a)), mul($x(res), $y(res))),
					mul($x(sp), $y(sp))
				)
			)),
			ret(
				vec4(
					fit1101(
						cos(mul(add(sin(mul(vec3(1, 2, 3), m)), dp), float(2)))
					),
					1
				)
			),
		];
	}
);

console.log("JS:");
console.log(js(main));
console.log("GLSL:");
console.log(gl(main));

const fn = js.compile(main).main;

const W = 640;
const H = 480;
const size = [W, H];
const canvas = document.createElement("canvas");
canvas.width = W;
canvas.height = H;
document.body.appendChild(canvas);

const rt = canvasRenderer(canvas);
const t0 = Date.now();

setInterval(() => {
	const time = (Date.now() - t0) * 0.001;
	rt((frag) => fn(frag, size, time));
}, 16);
