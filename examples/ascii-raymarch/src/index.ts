import { fiber } from "@thi.ng/fibers";
import { GRAY8, RGB565, intBuffer } from "@thi.ng/pixel";
import {
	$x,
	$xyz,
	assign,
	defn,
	float,
	gte,
	ifThen,
	mix,
	mul,
	program,
	ret,
	sym,
	vec2,
	vec3,
	vec4,
	type FloatSym,
	type Vec2Sym,
	type Vec3Sym,
} from "@thi.ng/shader-ast";
import { renderBuffer, rgbaRgb565, targetJS } from "@thi.ng/shader-ast-js";
import {
	clamp01,
	diffuseLighting,
	fit1101,
	fogExp2,
	halfLambert,
	lookat,
	rayPointAt,
	raymarchAO,
	raymarchDir,
	raymarchNormal,
	raymarchScene,
	sdfBox3,
	sdfRepeat3,
	sdfSmoothUnion,
	sdfSphere,
} from "@thi.ng/shader-ast-stdlib";
import {
	BARS_H,
	BARS_V,
	SHADES_ASCII_10,
	SHADES_ASCII_16,
	SHADES_BLOCK,
	SHADES_BLOCK_ALT,
	canvas,
	formatCanvas,
	image,
	imageRawFmtOnly,
} from "@thi.ng/text-canvas";
import { FMT_HTML565 } from "@thi.ng/text-format";
import { cycle, duplicate } from "@thi.ng/transducers";
import { rotateZ } from "@thi.ng/vectors";

// scene definition for raymarch function. uses SDF primitive functions
// included in "standard library" bundled with shader-ast pkg
const scene = defn("vec2", "scene", ["vec3"], (pos) => {
	let d1: FloatSym;
	let d2: FloatSym;
	let d3: FloatSym;
	let d4: FloatSym;
	let smooth = float(0.2);
	return [
		assign(pos, sdfRepeat3(pos, vec3(2.1))),
		(d1 = sym(sdfSphere(pos, float(0.5)))),
		(d2 = sym(sdfBox3(pos, vec3(1, 0.2, 0.2)))),
		(d3 = sym(sdfBox3(pos, vec3(0.2, 0.2, 1)))),
		(d4 = sym(sdfBox3(pos, vec3(0.2, 1, 0.2)))),
		ret(
			vec2(
				sdfSmoothUnion(
					sdfSmoothUnion(sdfSmoothUnion(d1, d2, smooth), d3, smooth),
					d4,
					smooth
				),
				1
			)
		),
	];
});

// main fragment shader function
// again uses several shader-ast std lib helpers
const mainImage = defn(
	"vec4",
	"main",
	["vec2", "vec2", "vec3", "vec3", "vec3"],
	(frag, res, eyePos, up, lightDir) => {
		let dir: Vec3Sym;
		let result: Vec2Sym;
		let isec: Vec3Sym;
		let norm: Vec3Sym;
		let material: Vec3Sym;
		let diffuse: FloatSym;
		// background color
		const bg = vec3(1, 1, 1.5);
		const ambient = vec3(0.15, 0.06, 0);
		return [
			// compute ray dir from fragCoord, viewport res and FOV
			// then apply basic camera settings (eye, target, up)
			(dir = sym(
				$xyz(
					mul(
						lookat(eyePos, vec3(), up),
						vec4(raymarchDir(frag, res, float(120)), 0)
					)
				)
			)),
			// perform raymarch
			(result = sym(
				// `raymarchScene` is a higher-order, configurable function which constructs
				// a raymarch function using our supplied scene fn
				raymarchScene(scene, { steps: 50, eps: 0.025 })(eyePos, dir)
			)),
			// early bailout if nothing hit
			ifThen(gte($x(result), float(10)), [ret(vec4(bg, 1))]),
			// set intersection pos
			(isec = sym(rayPointAt(eyePos, dir, $x(result)))),
			// surface normal
			(norm = sym(
				// higher-order fn to compute surface normal
				raymarchNormal(scene)(isec, float(0.01))
			)),
			// set material color
			(material = sym(fit1101(isec))),
			// compute diffuse term
			(diffuse = sym(
				mul(
					halfLambert(norm, lightDir),
					// higher order fn to compute ambient occlusion
					raymarchAO(scene, 3)(isec, norm)
				)
			)),
			// combine lighting & material colors
			ret(
				vec4(
					mix(
						clamp01(
							diffuseLighting(diffuse, material, vec3(1), ambient)
						),
						bg,
						fogExp2($x(result), float(0.2))
					),
					1
				)
			),
		];
	}
);

// build call graph for given entry function, sort in topological order
// and bundle all functions in a global scope for code generation...
const shaderProgram = program([mainImage]);

const JS = targetJS();
console.log(JS(shaderProgram));

const W = 128;
const H = 48;
const size = [W, H];

const HEADER = `ASCII art raymarching via thi.ng/shader-ast & thi.ng/text-canvas
hotkeys: c = toggle color, t = toggle theme switch, space = toggle update\n\n`;

const lightDir = [0.707, 0.707, 0];

// transpile shader to JS
const { main } = JS.compile(shaderProgram);

// pixel buffer for render
const img = intBuffer(W, H, RGB565);
// dummy buffer for non-colored mode
const solidWhite = new Uint16Array(W * H).fill(0xffff);
// text canvas setup
const tc = canvas(W, H);
const fmt = FMT_HTML565();
// DOM element (<pre>)
const el = document.getElementById("app")!;

// character selection (cyclic)
const charSel = cycle(
	duplicate(30, [
		SHADES_ASCII_10,
		SHADES_BLOCK,
		SHADES_ASCII_16,
		BARS_H,
		BARS_V,
		SHADES_BLOCK_ALT,
	])
);

// state flags
let isColor = true;
let isUpdate = true;
let autoThemeSwitch = true;
let isRerender = false;

// main loop
fiber(function* () {
	let time = 0;
	let chars = charSel.next().value!;
	while (true) {
		if (isUpdate || isRerender) {
			if (!isRerender) time += 1 / 30;
			if (autoThemeSwitch) chars = charSel.next().value!;
			const eyePos = [
				Math.cos(time) * 2.5,
				Math.cos(time / 2) * 0.7,
				Math.sin(time) * 2.5,
			];
			const upDir = rotateZ(
				null,
				[0, 1, 0],
				Math.sin(time * 0.1) * (Math.PI / 3)
			);

			// render compiled shader to pixel buffer
			renderBuffer(
				(frag) => main(frag, size, eyePos, upDir, lightDir),
				img,
				{ fmt: rgbaRgb565 }
			);
			// convert to text
			image(tc, 0, 0, W, H, img.as(GRAY8).data, { chars });
			// apply img to manipulate character colors only
			imageRawFmtOnly(tc, 0, 0, W, H, isColor ? img.data : solidWhite);
			// apply to DOM
			el.innerHTML = HEADER + formatCanvas(tc, fmt);
			isRerender = false;
		}
		yield;
	}
}).run();

window.addEventListener("keydown", (e) => {
	switch (e.key.toLowerCase()) {
		case "c":
			isColor = !isColor;
			isRerender = true;
			break;
		case "t":
			autoThemeSwitch = !autoThemeSwitch;
			isRerender = true;
			break;
		case " ":
			isUpdate = !isUpdate;
			break;
	}
});
