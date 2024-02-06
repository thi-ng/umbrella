import {
	$xy,
	F,
	V2,
	V4,
	add,
	assign,
	defMain,
	defn,
	float,
	program,
	ret,
	sym,
	vec2,
	vec3,
	vec4,
	type FloatSym,
	type Vec2Sym,
} from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import { canvasRenderer, targetJS } from "@thi.ng/shader-ast-js";
import {
	additive,
	aspectCorrectedUV,
	fit1101,
	snoise2,
} from "@thi.ng/shader-ast-stdlib";
import { compileModel, defQuadModel, defShader, draw } from "@thi.ng/webgl";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL({ version: GLSLVersion.GLES_100 }); // WebGL
const JS = targetJS();

// https://www.shadertoy.com/view/Ms2SWW (by iq)
const mainImage = defn(V4, "mainImage", [V2, V2, F], (fragCoord, res, time) => {
	let uv: Vec2Sym;
	let col: FloatSym;
	return [
		(uv = sym(aspectCorrectedUV(fragCoord, res))),
		// dynamically create a multi-octave version of `snoise2`
		// computed over 4 octaves w/ given phase shift and decay
		// factor (both per octave)
		(col = sym(
			additive(V2, snoise2, 4)(add(uv, time), vec2(2), float(0.5))
		)),
		ret(vec4(vec3(fit1101(col)), 1)),
	];
});

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
	const { mainImage: main, __reset, __stats } = JS.compile(shaderProgram);
	const renderFn = canvasRenderer(canvas);
	let time = 0;

	setInterval(() => {
		time += 0.01;
		renderFn((frag) => {
			// reset internal vector pools (see thi.ng/shader-ast-js readme)
			__reset();
			// execute shader for given fragment coord
			return main(frag, size, time);
		});
		// log vector pool stats
		console.log(__stats());
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
			position: V2,
		},
		uniforms: {
			resolution: [V2, [W, H]],
			time: F,
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
