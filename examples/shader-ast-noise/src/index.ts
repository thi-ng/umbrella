import type { FloatSym, Vec2Sym } from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import { canvasRenderer, targetJS } from "@thi.ng/shader-ast-js";
import { additive } from "@thi.ng/shader-ast-stdlib/math/additive";
import { fit1101 } from "@thi.ng/shader-ast-stdlib/math/fit";
import { snoise2 } from "@thi.ng/shader-ast-stdlib/noise/simplex2";
import { aspectCorrectedUV } from "@thi.ng/shader-ast-stdlib/screen/uv";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defMain, defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, vec2, vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { add } from "@thi.ng/shader-ast/ast/ops";
import { program } from "@thi.ng/shader-ast/ast/scope";
import { $xy } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { compileModel } from "@thi.ng/webgl/buffer";
import { draw } from "@thi.ng/webgl/draw";
import { defQuadModel } from "@thi.ng/webgl/geo/quad";
import { defShader } from "@thi.ng/webgl/shader";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL({ version: GLSLVersion.GLES_100 }); // WebGL
const JS = targetJS();

// https://www.shadertoy.com/view/Ms2SWW (by iq)
const mainImage = defn(
	"vec4",
	"mainImage",
	["vec2", "vec2", "float"],
	(fragCoord, res, time) => {
		let uv: Vec2Sym;
		let col: FloatSym;
		return [
			(uv = sym(aspectCorrectedUV(fragCoord, res))),
			// dynamically create a multi-octave version of `snoise2`
			// computed over 4 octaves w/ given phase shift and decay
			// factor (both per octave)
			(col = sym(
				additive("vec2", snoise2, 4)(add(uv, time), vec2(2), float(0.5))
			)),
			ret(vec4(vec3(fit1101(col)), 1)),
		];
	}
);

// build call graph for given entry function, sort in topological order
// and bundle all functions in a global scope for code generation...
const shaderProgram = program([mainImage]);

console.log("JS");
console.log(JS(shaderProgram));
console.log("GLSL");
console.log(GL(shaderProgram));

const W = 256;
const H = 256;
const size = [W, H];
const canvas = document.createElement("canvas");
canvas.width = W;
canvas.height = H;
document.body.appendChild(canvas);
const info = document.createElement("div");
info.innerText = (JS_MODE ? "Canvas2D" : "WebGL") + " version";
document.body.appendChild(info);

if (JS_MODE) {
	//
	// JS Canvas 2D shader emulation from here...
	//
	const fn = JS.compile(shaderProgram).mainImage;
	const rt = canvasRenderer(canvas);
	let time = 0;

	setInterval(() => {
		time += 0.01;
		rt((frag) => fn(frag, size, time));
	}, 16);
} else {
	//
	// WebGL mode...
	//
	const ctx: WebGLRenderingContext = canvas.getContext("webgl")!;
	// build fullscreen quad
	const model = defQuadModel({ uv: false });
	// set shader
	model.shader = defShader(ctx, {
		vs: (gl, _, attribs) => [
			defMain(() => [
				assign(gl.gl_Position, vec4(attribs.position, 0, 1)),
			]),
		],
		fs: (gl, unis, _, outs) => [
			mainImage,
			defMain(() => [
				assign(
					outs.fragColor,
					mainImage($xy(gl.gl_FragCoord), unis.resolution, unis.time)
				),
			]),
		],
		attribs: {
			position: "vec2",
		},
		uniforms: {
			resolution: ["vec2", [W, H]],
			time: "float",
		},
	});
	// compile model (attrib buffers)
	compileModel(ctx, model);

	const t0 = Date.now();
	// render loop
	setInterval(() => {
		const time = (Date.now() - t0) * 0.001;
		model.uniforms!.time = time;
		draw(model);
	});
}
