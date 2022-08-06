import { canvasWebGL } from "@thi.ng/hdom-components/canvas";
import { start } from "@thi.ng/hdom/start";
import { concat } from "@thi.ng/matrices/concat";
import { lookAt } from "@thi.ng/matrices/lookat";
import { perspective } from "@thi.ng/matrices/perspective";
import { rotationX44, rotationY44 } from "@thi.ng/matrices/rotation";
import { SOA } from "@thi.ng/soa/soa";
import { permutations } from "@thi.ng/transducers/permutations";
import { repeat } from "@thi.ng/transducers/repeat";
import { normalize3 } from "@thi.ng/vectors/normalize";
import type { GLMat4, GLVec3, ModelSpec } from "@thi.ng/webgl";
import { compileModel } from "@thi.ng/webgl/buffer";
import { draw } from "@thi.ng/webgl/draw";
import { defShader } from "@thi.ng/webgl/shader";
import { LAMBERT } from "@thi.ng/webgl/shaders/lambert";

const cube = (): Partial<ModelSpec> => {
	const soa = new SOA(36, {
		pos: { size: 3 },
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
		soa.setAttribValues("pos", [a, b, d, a, d, c], i);
		soa.setAttribValues("normal", repeat(n, 6), i);
		soa.setAttribValues("col", repeat(col, 6), i);
	});
	return {
		// THIS WILL BE SIMPLIFIED!
		attribs: {
			position: { data: <Float32Array>soa.buffers.pos, size: 3 },
			normal: { data: <Float32Array>soa.buffers.normal, size: 3 },
			col: { data: <Float32Array>soa.buffers.col, size: 3 },
		},
		num: 36,
	};
};

const app = () => {
	let model: ModelSpec;
	const canvas = canvasWebGL({
		init(_, gl) {
			model = compileModel(gl, <ModelSpec>{
				shader: defShader(gl, LAMBERT({ color: "col" })),
				uniforms: {
					proj: <GLMat4>perspective([], 60, 1, 0.1, 10),
					view: <GLMat4>lookAt([], [0, 0, 4], [0, 0, 0], [0, 1, 0]),
					lightDir: <GLVec3>normalize3(null, [0.5, 0.75, 1]),
				},
				...cube(),
			});
		},
		update(_, gl, __, time) {
			if (!model) return;
			time *= 0.001;
			model.uniforms!.model = <GLMat4>(
				concat([], rotationX44([], time), rotationY44([], time * 0.66))
			);
			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			draw(model);
		},
	});
	return [canvas, { width: 600, height: 600 }];
};

start(app());
