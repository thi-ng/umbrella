import { adaptDPI } from "@thi.ng/canvas";
import { start } from "@thi.ng/hdom";
import { canvasWebGL } from "@thi.ng/hdom-components";
import { fitClamped } from "@thi.ng/math";
import { concat, lookAt, perspective, transform44 } from "@thi.ng/matrices";
import { SYSTEM } from "@thi.ng/random";
import { fromDOMEvent, type ISubscription } from "@thi.ng/rstream";
import {
	$w,
	F,
	M4,
	V3,
	add,
	assign,
	defMain,
	div,
	float,
	length,
	mod,
	mul,
	sin,
	smoothstep,
	sub,
	vec3,
	vec4,
} from "@thi.ng/shader-ast";
import { map } from "@thi.ng/transducers";
import { AttribPool } from "@thi.ng/vector-pools";
import {
	Y3,
	ZERO3,
	fit3,
	madd3,
	mixN,
	mulN,
	type ReadonlyVec,
} from "@thi.ng/vectors";
import {
	BLEND_NORMAL,
	DrawMode,
	TextureFilter,
	TextureRepeat,
	clearCanvas,
	compileModel,
	defShader,
	defTexture,
	defaultViewport,
	draw,
	type GLMat4,
	type ModelSpec,
} from "@thi.ng/webgl";
import {
	alignCenter,
	msdfShader,
	text,
	type MSDFFont,
} from "@thi.ng/webgl-msdf";
import GLYPHS from "./ibmplexsans-light-msdf-converted.json";
import GLYPH_TEX from "./ibmplexsans-light.png";

const TEXT = `Do not go gentle into that good night,
Old age should burn and rave at close of day;
Rage, rage against the dying of the light.

Though wise men at their end know dark is right,
Because their words had forked no lightning they
Do not go gentle into that good night.

Good men, the last wave by, crying how bright
Their frail deeds might have danced in a green bay,
Rage, rage against the dying of the light.

Wild men who caught and sang the sun in flight,
And learn, too late, they grieved it on its way,
Do not go gentle into that good night.

Grave men, near death, who see with blinding sight
Blind eyes could blaze like meteors and be gay,
Rage, rage against the dying of the light.

And you, my father, there on that sad height,
Curse, bless, me now with your fierce tears, I pray.
Do not go gentle into that good night.
Rage, rage against the dying of the light.

Dylan Thomas`;

const BG_COL = [0, 0, 0];

const createText = (
	gl: WebGLRenderingContext,
	font: MSDFFont,
	img: HTMLImageElement,
	txt: string,
	col = [1, 0.8, 0, 1]
) => {
	const model = {
		...text(font, txt, {
			align: alignCenter,
			leading: 1.4,
			spacing: 1,
			dirY: -1,
			useColor: true,
		}),
		shader: defShader(gl, msdfShader({ color: true })),
		textures: [
			defTexture(gl, {
				image: img,
				filter: TextureFilter.LINEAR,
				wrap: TextureRepeat.CLAMP,
			}),
		],
		uniforms: {
			bg: [0, 0, 0, 1],
			thresh: -0.2,
		},
	};
	// update bottom vertex colors of each character
	for (let i = 2; i < model.attribPool!.capacity; i += 4) {
		model.attribPool!.setAttribValues("color", [col, col], i);
	}
	return compileModel(gl, model);
};

const createStarField = (gl: WebGLRenderingContext, num = 1000) => {
	const pool = new AttribPool({
		attribs: {
			position: { type: "f32", size: 3, byteOffset: 0 },
			dir: { type: "f32", size: 3, byteOffset: 12 },
			id: { type: "f32", size: 1, byteOffset: 24 },
		},
		mem: {
			size: num * 28 + 8 /* FIXME */ + 40,
		},
		num,
	});
	for (let i = 0, r = SYSTEM; i < num; i++) {
		const pos = [r.minmax(-15, 15), r.minmax(0, 10), 0];
		pool.setAttribValue("position", i, pos);
		pool.setAttribValue(
			"dir",
			i,
			mixN([], mulN([], pos, 0.1), [0, -1, r.minmax(2, 5)], 0.8)
		);
		pool.setAttribValue("id", i, i);
	}
	return compileModel(gl, {
		attribs: {},
		attribPool: pool,
		uniforms: {},
		shader: defShader(gl, {
			vs: (gl, unis, ins, outs) => [
				defMain(() => [
					assign(
						outs.valpha,
						add(
							mul(sin(mul(ins.id, float(37.13829))), float(0.3)),
							float(0.7)
						)
					),
					assign(
						gl.gl_Position,
						mul(
							mul(unis.proj, unis.modelview),
							vec4(
								sub(
									mod(
										add(
											ins.position,
											mul(ins.dir, unis.time)
										),
										float(10)
									),
									float(5)
								),
								1
							)
						)
					),
					assign(gl.gl_PointSize, div(float(20), $w(gl.gl_Position))),
				]),
			],
			fs: (gl, _, ins, outs) => [
				defMain(() => [
					assign(
						outs.fragColor,
						vec4(
							vec3(ins.valpha),
							sub(
								float(1),
								smoothstep(
									float(0.1),
									float(0.5),
									length(sub(gl.gl_PointCoord, float(0.5)))
								)
							)
						)
					),
				]),
			],
			attribs: {
				position: V3,
				dir: V3,
				id: F,
			},
			varying: {
				valpha: F,
			},
			uniforms: {
				modelview: M4,
				proj: M4,
				time: F,
			},
			state: {
				blend: true,
				blendFn: BLEND_NORMAL,
			},
		}),
		mode: DrawMode.POINTS,
		num,
	});
};

const app = () => {
	// If using MSDF font def from https://msdf-bmfont.donmccurdy.com/
	// const glyphs = convertGlyphs(GLYPHS);
	const glyphs = GLYPHS;
	let stars: ModelSpec;
	let body: ModelSpec;
	let mouse: ISubscription<any, ReadonlyVec>;
	const canvas = canvasWebGL({
		init: async (el, gl) => {
			const img = new Image();
			img.src = GLYPH_TEX;
			await img.decode();
			body = createText(gl, glyphs, img, TEXT);
			stars = createStarField(gl);
			body.uniforms!.proj = stars.uniforms!.proj = <GLMat4>(
				perspective(
					[],
					60,
					gl.drawingBufferWidth / gl.drawingBufferHeight,
					0.1,
					20
				)
			);
			mouse = fromDOMEvent(el, "mousemove").transform(
				map((e) =>
					fit3(
						[],
						[e.clientX, e.clientY, 0],
						ZERO3,
						[window.innerWidth, window.innerHeight, 0],
						[-1, -1, 0],
						[1, 1, 0]
					)
				)
			);
		},
		update: (el, gl, __, time) => {
			if (!body) return;
			adaptDPI(el, window.innerWidth, window.innerHeight);
			const eye = madd3(
				[],
				mouse.deref() || ZERO3,
				[2, 0.5, 0],
				[0, -4, 5]
			);
			const view = lookAt([], eye, ZERO3, Y3);
			body.uniforms!.modelview = <GLMat4>(
				concat(
					[],
					view,
					transform44(
						[],
						[0, fitClamped(time % 70000, 0, 70000, -3.5, 20), 0],
						ZERO3,
						0.005
					)
				)
			);
			stars.uniforms!.modelview = <GLMat4>view;
			stars.uniforms!.time = 10 + time * 0.001;
			defaultViewport(gl);
			clearCanvas(gl, BG_COL);
			draw([stars, body]);
		},
	});
	return [canvas, { width: window.innerWidth, height: window.innerHeight }];
};

start(app());
