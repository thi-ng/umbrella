import { adaptDPI } from "@thi.ng/adapt-dpi";
import { sin } from "@thi.ng/dsp/osc-sin";
import { canvasWebGL } from "@thi.ng/hdom-components/canvas";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { start } from "@thi.ng/hdom/start";
import { concat } from "@thi.ng/matrices/concat";
import { lookAt } from "@thi.ng/matrices/lookat";
import { perspective } from "@thi.ng/matrices/perspective";
import { transform44 } from "@thi.ng/matrices/transform";
import { metaStream } from "@thi.ng/rstream/metastream";
import { fromPromise } from "@thi.ng/rstream/promise";
import { reactive } from "@thi.ng/rstream/stream";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defMain } from "@thi.ng/shader-ast/ast/function";
import { vec4 } from "@thi.ng/shader-ast/ast/lit";
import { mul } from "@thi.ng/shader-ast/ast/ops";
import { normalize } from "@thi.ng/shader-ast/builtin/math";
import { texture } from "@thi.ng/shader-ast/builtin/texture";
import type { GLMat4, ModelSpec, ShaderSpec } from "@thi.ng/webgl";
import { BLEND_ADD } from "@thi.ng/webgl/api/blend";
import { TextureFilter } from "@thi.ng/webgl/api/texture";
import { compileModel } from "@thi.ng/webgl/buffer";
import { draw } from "@thi.ng/webgl/draw";
import { defCubeModel } from "@thi.ng/webgl/geo/cube";
import { defShader } from "@thi.ng/webgl/shader";
import { defTextureCubeMap } from "@thi.ng/webgl/texture";

const CUBEMAP_SHADER: ShaderSpec = {
	vs: (gl, unis, ins, outs) => [
		defMain(() => [
			assign(outs.vnormal, ins.position),
			assign(gl.gl_Position, mul(unis.mvp, vec4(ins.position, 1))),
		]),
	],
	fs: (_, unis, ins, outs) => [
		defMain(() => [
			assign(outs.fragColor, texture(unis.tex, normalize(ins.vnormal))),
		]),
	],
	attribs: {
		position: "vec3",
	},
	varying: {
		vnormal: "vec3",
	},
	uniforms: {
		mvp: "mat4",
		tex: "samplerCube",
	},
	state: {
		depth: false,
		blend: true,
		blendFn: BLEND_ADD,
	},
};

const CUBE_MAPS = [
	["langholmen2", "Langholmen"],
	["golden-gate", "Golden Gate"],
	["maskonaive2", "Maskonaive"],
];

const app = () => {
	const selection = reactive(CUBE_MAPS[0][0]);
	let model: ModelSpec;
	const canvas = canvasWebGL({
		init: (_, gl) => {
			selection
				.subscribe(
					metaStream((id: string) =>
						fromPromise(loadCubeMap(`./img/${id}/`))
					)
				)
				.subscribe({
					next(faces) {
						try {
							model = compileModel(gl, {
								...defCubeModel({ normal: false, uv: false }),
								shader: defShader(gl, CUBEMAP_SHADER),
								uniforms: {},
								textures: [
									defTextureCubeMap(gl, faces, {
										filter: [
											TextureFilter.LINEAR_MIPMAP_LINEAR,
											TextureFilter.LINEAR,
										],
										mipmap: true,
									}),
								],
							});
						} catch (err) {
							console.warn(err);
						}
					},
					error(e) {
						console.warn(e);
						return true;
					},
				});
		},
		update: (el, gl, __, time) => {
			if (!model) return;
			const bg = 0.01;
			const p = perspective(
				[],
				45,
				gl.drawingBufferWidth / gl.drawingBufferHeight,
				0.01,
				10
			);
			const v = lookAt(
				[],
				[0, 0, sin(time, 0.00008, 1.99, 2)],
				[0, 0, 0],
				[0, 1, 0]
			);
			const m = transform44(
				[],
				[0, 0, 0],
				[sin(time, 0.0001, 0.7, 0.5), time * 0.0007, 0],
				1
			);
			model.uniforms!.mvp = <GLMat4>concat([], p, v, m);
			adaptDPI(el, window.innerWidth, window.innerHeight);
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
			gl.clearColor(bg, bg, bg, 1);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			draw(model);
		},
	});
	return () => [
		"div.sans-serif",
		[canvas, { width: window.innerWidth, height: window.innerHeight }],
		[
			"div.fixed.top-0.left-0.z-1.ma3",
			[
				dropdown,
				{
					onchange: (e: Event) =>
						selection.next((<HTMLSelectElement>e.target).value),
				},
				CUBE_MAPS,
				selection.deref(),
			],
		],
	];
};

const imagePromise = (url: string) =>
	new Promise<HTMLImageElement>((resolve, fail) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = (e) => {
			console.warn("error loading: " + url);
			fail(e);
		};
		img.src = url;
	});

const loadCubeMap = (base: string) =>
	Promise.all(
		["posx", "negx", "posy", "negy", "posz", "negz"].map((id) =>
			imagePromise(base + id + ".jpg")
		)
	);

start(app());
