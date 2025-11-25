import { defArcBall } from "@thi.ng/arcball";
import { perspective } from "@thi.ng/matrices";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { SOA } from "@thi.ng/soa";
import { permutations, repeat } from "@thi.ng/transducers";
import { normalize3 } from "@thi.ng/vectors";
import {
	clearCanvas,
	compileModel,
	defShader,
	draw,
	glCanvas,
	LAMBERT,
	type GLMat4,
	type GLVec3,
	type ModelSpec,
} from "@thi.ng/webgl";

const W = Math.min(window.innerWidth - 32, window.innerHeight - 64);

const { canvas, gl } = glCanvas({
	width: W,
	height: W,
	parent: document.body,
});

// create arcball controller
const arcball = defArcBall(canvas.width, canvas.height, { eyeDist: 4 });

// function to create a cube geometry assigning different nornals and colors to
// each of the 6 faces...
const cube = (): Partial<ModelSpec> => {
	const soa = new SOA(36, {
		position: { size: 3 },
		normal: { size: 3 },
		col: { size: 3 },
	});
	const [a, b, c, d, e, f, g, h] = [
		...permutations([-1, 1], [-1, 1], [-1, 1]),
	];
	[
		// tuples of: quad verts, normal, color
		[a, b, c, d, [-1, 0, 0], [1, 0, 0]],
		[f, e, h, g, [1, 0, 0], [0, 1, 0]],
		[e, f, a, b, [0, -1, 0], [0, 0, 1]],
		[c, d, g, h, [0, 1, 0], [1, 1, 0]],
		[e, a, g, c, [0, 0, -1], [1, 0, 1]],
		[b, f, d, h, [0, 0, 1], [0, 1, 1]],
	].forEach(([a, b, c, d, n, col], i: number) => {
		i *= 6;
		soa.setAttribValues("position", [a, b, d, a, d, c], i);
		soa.setAttribValues("normal", repeat(n, 6), i);
		soa.setAttribValues("col", repeat(col, 6), i);
	});
	return {
		attribs: {
			position: { data: <Float32Array>soa.buffers.position, size: 3 },
			normal: { data: <Float32Array>soa.buffers.normal, size: 3 },
			col: { data: <Float32Array>soa.buffers.col, size: 3 },
		},
		num: 36,
	};
};

// create WebGL geometry buffers, compile shader
const model = compileModel(gl, <ModelSpec>{
	shader: defShader(gl, LAMBERT({ color: "col" })),
	uniforms: {
		proj: <GLMat4>perspective([], 60, 1, 0.1, 10),
		lightDir: <GLVec3>normalize3(null, [0.5, 0.75, 1]),
	},
	...cube(),
});

// redraw function, uses arcball's current view matrix
const redraw = () => {
	model.uniforms!.view = <GLMat4>arcball.viewMat;
	clearCanvas(gl, [0, 0, 0, 1]);
	draw(model);
};

// initial draw
redraw();

// attach gesture stream to canvas and delegate events to arcball this is an
// abstraction over both mouse, touch and wheel events. in our case the scene
// will only be redrawn when a gesture event required it...
gestureStream(canvas, {
	scale: true,
	smooth: 0.5,
	zoom: arcball.eyeDist,
	minZoom: 2.5,
	maxZoom: 8,
}).subscribe({
	next(e) {
		switch (e.type) {
			case "start":
				arcball.down(e.pos);
				break;
			case "drag":
				arcball.drag(e.pos);
				break;
			case "end":
				arcball.up();
				break;
			case "zoom":
				arcball.setEyeDistance(e.zoom);
				break;
		}
		if (e.type !== "move") redraw();
	},
});
