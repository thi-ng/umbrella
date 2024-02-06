import { red } from "@thi.ng/colored-noise";
import { ConsoleLogger } from "@thi.ng/logger";
import { V2, V4 } from "@thi.ng/shader-ast";
import { mapcat, normRange, repeatedly } from "@thi.ng/transducers";
import { Vec2 } from "@thi.ng/vectors";
import {
	BLEND_NORMAL,
	DrawMode,
	TextureFormat,
	clearCanvas,
	defMultiPass,
	glCanvas,
	setLogger,
} from "@thi.ng/webgl";

// configure logger to view generated shaders in console
setLogger(new ConsoleLogger("webgl"));

// config
const NUM_POINTS = 16;
const VEL_GAIN = 0.005;
const VEL_BIAS = 0.05 * VEL_GAIN;

const BG_COL = [0, 0, 0, 1];

// buffer to store point coordinates
// (all coordinates are in [-1,-1] .. [1,1] space)
const POSITIONS = new Float32Array([
	...mapcat((x) => [x * 2 - 1, -1], normRange(NUM_POINTS - 1)),
]);
// create memory mapped 2D vectors from buffer (i.e. modifying the coordinates
// of these vectors, automatically updates the above array at the corresponding
// indices)
// this isn't strictly necessary, but simplifies updating these points/buffer!
const POINTS = Vec2.mapBuffer(POSITIONS);

// pre-create a noise generator for each vertex
const VELOCITIES = [
	...repeatedly(() => red({ bins: 32, scale: VEL_GAIN }), NUM_POINTS),
];

// create WebGL canvas
const { gl } = glCanvas({
	width: 512,
	height: 512,
	autoScale: false,
	parent: document.body,
	version: 2,
});

// define multipass shader pipeline:
// 1st pass: render the geometry (polyline) to an offscreen buffer/texture
// 2nd pass: merely copy the offscreen texture to the main canvas
const pipeline = defMultiPass({
	gl,
	width: gl.drawingBufferWidth,
	height: gl.drawingBufferHeight,
	// pre-declare/specify textures
	textures: {
		// use floating point texture format for offscreen
		stage1: { format: TextureFormat.RGBA32F },
	},
	passes: [
		// 1st shader pass
		{
			// define modelspec & buffer(s) for polyline geometry
			model: {
				attribs: {
					// only using 2D points, hence size=2
					position: { data: POSITIONS, size: 2 },
				},
				num: NUM_POINTS,
				mode: DrawMode.LINE_STRIP,
			},
			// shader pair
			vs: `void main() { gl_Position = vec4(position, 0., 1.); }`,
			fs: `void main() { output0 = color; }`,
			// input textures (here none)
			inputs: [],
			// declare output textures
			outputs: ["stage1"],
			// custom shader attributes (MUST be same as defined above in `model`)
			attribs: {
				position: V2,
			},
			// custom shader uniforms
			// (here we're drawing with a very faint white, only 0.5% alpha)
			uniforms: {
				color: [V4, [1, 1, 1, 0.005]],
			},
			// GL state flags/config
			state: {
				blend: true,
				blendFn: BLEND_NORMAL,
			},
		},
		// 2nd shader pass
		{
			// copy texture to main draw buffer
			fs: `void main() { fragColor = texelFetch(input0, ivec2(gl_FragCoord.xy), 0); }`,
			// use offscreen tex as input
			inputs: ["stage1"],
			// no outputs defined, means writing result to main
			outputs: [],
		},
	],
});

// pre-fill the offscreen texture with background color
pipeline.fbos[0].bind();
clearCanvas(gl, BG_COL);
pipeline.fbos[0].unbind();

const update = () => {
	// update y-position of vertices using their noise generators
	POINTS.forEach((p, i) => (p.y += VELOCITIES[i].next().value! + VEL_BIAS));
	// update corresponding WebGL buffer
	pipeline.models[0].attribs.position.buffer!.set(POSITIONS);
	// execute pipeline
	pipeline.update();
	// retrigger
	requestAnimationFrame(update);
};

update();
