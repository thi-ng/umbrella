import type { Nullable } from "@thi.ng/api";
import { exposeGlobal } from "@thi.ng/expose";
import { ortho } from "@thi.ng/matrices";
import { fromRAF } from "@thi.ng/rstream";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { Node2D } from "@thi.ng/scenegraph";
import {
	$x,
	add,
	assign,
	defMain,
	distance,
	float,
	madd,
	mix,
	mul,
	sin,
	texture,
	vec3,
	vec4,
} from "@thi.ng/shader-ast";
import {
	additive,
	distManhattan2,
	fit1101,
	snoise3,
} from "@thi.ng/shader-ast-stdlib";
import { add2, copy, type ReadonlyVec, type Vec } from "@thi.ng/vectors";
import {
	compileModel,
	defQuadModel,
	defShader,
	glCanvas,
	type GLMat4,
} from "@thi.ng/webgl";
import type { AppCtx } from "./api";
import { OpNode } from "./opnode";

// setLogger(new ConsoleLogger("webgl", LogLevel.DEBUG));

const { canvas, gl } = glCanvas({
	width: 1280,
	height: 720,
	autoScale: false,
	ext: ["WEBGL_draw_buffers"],
	version: 1,
	parent: document.body,
});

const CTX: AppCtx = {
	canvas,
	gl,
	width: canvas.width,
	height: canvas.height,
	texSize: 256,

	// geometry for offscreen rendering (shader nodes)
	opQuad: compileModel(gl, defQuadModel()),

	// geometry + shader for drawing to main window
	mainQuad: {
		...compileModel(gl, defQuadModel({ size: 1 })),
		shader: defShader(gl, {
			// vertex shader
			// (will be transpiled to GLSL)
			vs: (gl, unis, ins, outs) => [
				defMain(() => [
					assign(outs.v_uv, ins.uv),
					assign(
						gl.gl_Position,
						mul(
							unis.proj,
							mul(unis.model, vec4(ins.position, 0, 1))
						)
					),
				]),
			],
			// fragment shader (same as in FX_SHADER_SPEC_UV in webgl pkg)
			// (will be transpiled to GLSL)
			fs: (_, unis, ins, outs) => [
				defMain(() => [
					assign(outs.fragColor, texture(unis.tex, ins.v_uv)),
				]),
			],
			attribs: {
				position: "vec2",
				uv: "vec2",
			},
			varying: {
				v_uv: "vec2",
			},
			uniforms: {
				tex: "sampler2D",
				model: "mat4",
				// 2D projection matrix
				proj: [
					"mat4",
					<GLMat4>ortho([], 0, canvas.width, canvas.height, 0, -1, 1),
				],
			},
		}),
	},
};

// scenegraph root node (no spatial transformation, purely used as reference frame)
const ROOT = new Node2D("root");

// main conent root in scenegraph
// all shader nodes will be assigned as children of this node
const CONTENT = new Node2D("content", ROOT, [CTX.width / 2, CTX.height / 2]);

// scenegraph node for centered quad of unit size
class QuadNode extends Node2D {
	constructor(
		id: string,
		parent?: Nullable<Node2D>,
		translate: Vec = [0, 0],
		rotate = 0,
		scale: Vec | number = 1
	) {
		super(id, parent, translate, rotate, scale);
	}

	// hit test impl
	containsLocalPoint([x, y]: ReadonlyVec) {
		return x >= -0.5 && x <= 0.5 && y >= -0.5 && y <= 0.5;
	}
}

// ring / diamond morph pattern shader node
const op1 = new OpNode(CTX, {
	// shader function
	// (will be transpiled to GLSL)
	main: (_, unis, ins, outs) => [
		defMain(() => [
			assign(
				outs.fragColor,
				vec4(
					vec3(
						// map -1 .. +1 => 0 .. 1 interval
						fit1101(
							sin(
								madd(
									mix(
										// circular (eucledian) distance
										distance(ins.v_uv, unis.center),
										// diamond (manhattan) distance
										distManhattan2(ins.v_uv, unis.center),
										// morph factor
										fit1101(sin(mul(unis.u_time, 0.01)))
									),
									// frequency scale (number of rings)
									float(unis.rings),
									// phase shift (animation)
									mul(unis.u_time, unis.speed)
								)
							)
						)
					),
					1
				)
			),
		]),
	],
	// will be exposed as user controllable parameters
	unis: {
		center: ["vec2", [0.5, 0.5]],
		rings: ["float", 16],
		speed: ["float", -0.1],
	},
	// texture inputs from other shader nodes
	inputs: [],
	// scene graph node for drawing in main canvas
	node: new QuadNode("op1", CONTENT, [-264, 0], 0, CTX.texSize),
});

// chromatic aberration shader
const op2 = new OpNode(CTX, {
	main: (_, unis, ins, outs) => [
		defMain(() => [
			assign(
				outs.fragColor,
				vec4(
					// read RGB color channels individually
					// each with different offset vector
					$x(texture(unis.u_in0, add(ins.v_uv, unis.shiftR))),
					$x(texture(unis.u_in0, add(ins.v_uv, unis.shiftG))),
					$x(texture(unis.u_in0, add(ins.v_uv, unis.shiftB))),
					1
				)
			),
		]),
	],
	unis: {
		shiftR: ["vec2", [0.1, 0]],
		shiftG: ["vec2", [0.05, 0]],
		shiftB: ["vec2", [0.02, 0]],
	},
	inputs: [op1.tex],
	node: new QuadNode("op2", CONTENT, [0, 132], 0, CTX.texSize),
});

// noise shader node
const op3 = new OpNode(CTX, {
	main: (_, unis, ins, outs) => [
		defMain(() => [
			assign(
				outs.fragColor,
				vec4(
					vec3(
						fit1101(
							// functional programming / composition for shaders
							// additive is a HOF to calculate multi-octave noise
							// with configurable behavior
							additive("vec3", snoise3, 2)(
								vec3(ins.v_uv, mul(unis.u_time, 0.005)),
								vec3(2),
								float(1)
							)
						)
					),
					1
				)
			),
		]),
	],
	unis: {},
	inputs: [],
	node: new QuadNode("op3", CONTENT, [0, -132], 0, CTX.texSize),
});

// displacement shader node
// uses value from 2nd texture as displacement factor to manipulate
// lookup position in 1st texture
const op4 = new OpNode(CTX, {
	main: (_, unis, ins, outs) => [
		defMain(() => [
			assign(
				outs.fragColor,
				texture(
					unis.u_in0,
					mul(ins.v_uv, $x(texture(unis.u_in1, ins.v_uv)))
				)
			),
		]),
	],
	unis: {},
	inputs: [op2.tex, op3.tex],
	node: new QuadNode("op4", CONTENT, [264, 0], 0, CTX.texSize),
});

// update loop
fromRAF().subscribe({
	next(t) {
		// update all shader nodes, render to their FBOs
		op1.update(t);
		op2.update(t);
		op3.update(t);
		op4.update(t);

		// then draw all in main canvas
		gl.viewport(0, 0, CTX.width, CTX.height);
		gl.clearColor(0, 0, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		op1.draw();
		op2.draw();
		op3.draw();
		op4.draw();
	},
});

// mouse event handling
gestureStream(CTX.canvas, { minZoom: 0.1, maxZoom: 4, smooth: 0.05 }).subscribe(
	{
		next(e) {
			switch (e.type) {
				case "start":
					const info = ROOT.childForPoint(e.pos);
					this.sel = info ? info.node : CONTENT;
					this.startTheta = this.sel.rotate;
					this.startPos = this.sel.parent.mapLocalPointToNode(
						ROOT,
						copy(this.sel.translate)
					);
					break;
				case "drag":
					if (e.buttons == 2) {
						this.sel.rotate =
							this.startTheta + e.active[0].delta![0] * 0.01;
					} else {
						const pos = add2([], this.startPos, e.active[0].delta!);
						this.sel.translate =
							this.sel.parent.mapGlobalPoint(pos);
					}
					CONTENT.update();
					break;
				case "zoom":
					CONTENT.scale = e.zoom;
					CONTENT.update();
			}
		},
	}
);

// expose shader nodes in devtools / console
exposeGlobal("op1", op1);
exposeGlobal("op2", op2);
exposeGlobal("op3", op3);
exposeGlobal("op4", op4);

exposeGlobal("content", CONTENT);
