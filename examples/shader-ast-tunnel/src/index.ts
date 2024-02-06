import { intAbgr32Srgb } from "@thi.ng/color";
import { ABGR8888, defSampler, intBuffer } from "@thi.ng/pixel";
import {
	$x,
	$xy,
	$xyz,
	$y,
	F,
	S2D,
	V2,
	V4,
	add,
	assign,
	atan,
	defMain,
	defn,
	div,
	float,
	mul,
	neg,
	pow,
	program,
	ret,
	sym,
	texture,
	vec2,
	vec4,
	type FloatSym,
	type Vec2Sym,
} from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import {
	JS_DEFAULT_ENV,
	canvasRenderer,
	targetJS,
} from "@thi.ng/shader-ast-js";
import {
	FX_SHADER_SPEC,
	TextureFilter,
	TextureRepeat,
	compileModel,
	defQuadModel,
	defShader,
	defTexture,
	draw,
} from "@thi.ng/webgl";
import TEX_URL from "./tex.jpg";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL({ version: GLSLVersion.GLES_100 }); // WebGL
const JS = targetJS();

// https://www.shadertoy.com/view/Ms2SWW (by iq)
const mainImage = defn(
	V4,
	"mainImage",
	[V2, V2, F, S2D],
	(frag, res, time, tex) => {
		let p: Vec2Sym;
		let q: Vec2Sym;
		let uv: Vec2Sym;
		let r: FloatSym;
		return [
			(p = sym(div(add(neg(res), mul(frag, 2)), $y(res)))),
			(q = sym(pow(mul(p, p), vec2(4)))),
			(r = sym(pow(add($x(q), $y(q)), float(1 / 8)))),
			(uv = sym(
				vec2(
					add(div(0.3, r), time),
					div(atan($y(p), $x(p)), float(Math.PI))
				)
			)),
			ret(vec4(mul($xyz(texture(tex, uv)), r), 1)),
		];
	}
);

// assemble all functions in a global scope for code generation...
const shaderProgram = program([mainImage]);

console.log("JS");
console.log(JS(shaderProgram));
console.log("GLSL");
console.log(GL(shaderProgram));

const W = 320;
const H = 240;
const size = [W, H];
const canvas = document.createElement("canvas");
canvas.width = W;
canvas.height = H;
document.body.appendChild(canvas);
const info = document.createElement("div");
info.innerText = (JS_MODE ? "Canvas2D" : "WebGL") + " version";
document.body.appendChild(info);

const tex = new Image();

// preload texture
const preload = (async () => {
	tex.src = TEX_URL;
	await tex.decode();
})();

if (JS_MODE) {
	//
	// JS Canvas 2D shader emulation from here...
	//
	preload.then(() => {
		const texCanv = document.createElement("canvas");
		const TW = (texCanv.width = tex.width);
		const TH = (texCanv.height = tex.height);
		const texCtx = texCanv.getContext("2d")!;
		texCtx.drawImage(tex, 0, 0);
		const texData = new Uint32Array(
			texCtx!.getImageData(0, 0, TW, TH).data.buffer
		);

		// since texture sampling is not (yet) supported for the JS
		// codegen target, we're patching in a simple wrap-around 2D
		// lookup ourselves...
		// JS_DEFAULT_ENV.sampler2D.texture = (_, uv) => {
		//     let x = ((uv[0] * TW) | 0) % TW;
		//     let y = ((uv[1] * TH) | 0) % TH;
		//     x < 0 && (x += TW);
		//     y < 0 && (y += TH);
		//     return intAbgr32Srgb([], texData[y * TW + x]);
		// };

		// alternatively use custom image sampler to perform
		// filtered texture lookups:
		const sampler = defSampler(
			intBuffer(TW, TH, ABGR8888, texData),
			"linear",
			"wrap"
		);
		JS_DEFAULT_ENV.sampler2D.texture = (_, uv) =>
			intAbgr32Srgb([], sampler(uv[0] * TW, uv[1] * TH));

		// compile AST to actual JS:
		// under the hood all vector & matrix operations delegate to
		// thi.ng/vectors and thi.ng/matrices packages by default
		const { mainImage: main, __reset, __stats } = JS.compile(shaderProgram);
		const renderFn = canvasRenderer(canvas);
		let time = 0;

		setInterval(() => {
			time += 0.05;
			renderFn((frag) => {
				// reset internal vector pools (see thi.ng/shader-ast-js readme)
				__reset();
				// execute shader for given fragment coord
				return main(frag, size, time);
			});
			// log vector pool stats
			console.log(__stats());
		}, 16);
	});
} else {
	//
	// WebGL mode...
	//
	preload.then(() => {
		const ctx: WebGLRenderingContext = canvas.getContext("webgl")!;
		// build fullscreen quad
		const model = {
			...defQuadModel({ uv: false }),
			shader: defShader(ctx, {
				...FX_SHADER_SPEC,
				fs: (gl, unis, _, outs) => [
					mainImage,
					defMain(() => [
						assign(
							outs.fragColor,
							mainImage(
								$xy(gl.gl_FragCoord),
								unis.resolution,
								unis.time,
								unis.tex
							)
						),
					]),
				],
				uniforms: {
					resolution: [V2, [W, H]],
					time: F,
					tex: [S2D, 0],
				},
			}),
			textures: [
				defTexture(ctx, {
					image: tex,
					filter: TextureFilter.LINEAR,
					wrap: TextureRepeat.REPEAT,
				}),
			],
		};

		// compile model (attrib buffers)
		compileModel(ctx, model);

		const t0 = Date.now();
		// render loop
		setInterval(() => {
			const time = (Date.now() - t0) * 0.001;
			model.uniforms!.time = time;
			draw(model);
		});
	});
}
