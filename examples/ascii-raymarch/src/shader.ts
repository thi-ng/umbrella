import {
	$x,
	$xyz,
	V2,
	V3,
	V4,
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
import { targetJS } from "@thi.ng/shader-ast-js";
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

// apart from very minor adjustments, this raymarching shader is the same as
// used in this example:
// https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-raymarch

// scene definition for raymarch function. uses SDF primitive functions
// included in "standard library" bundled with shader-ast pkg
const scene = defn(V2, "scene", [V3], (pos) => {
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
	V4,
	"main",
	[V2, V2, V3, V3, V3],
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

// transpile shader to JS
export const { main } = JS.compile(shaderProgram);
