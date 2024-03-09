import { pixelCanvas2d } from "@thi.ng/canvas";
import { colorFromRange, srgb } from "@thi.ng/color";
import { sin } from "@thi.ng/dsp";
import {
	add,
	assign,
	defMain,
	distance,
	float,
	mix,
	mul,
	smoothstep,
	sym,
	vec2,
	type FloatSym,
	type Vec2Sym,
	type Vec4Sym,
} from "@thi.ng/shader-ast";
import { blendSrcOver, blur9, fragUV } from "@thi.ng/shader-ast-stdlib";
import {
	TextureFilter,
	TextureFormat,
	TextureType,
	defMultiPass,
	glCanvas,
	passCopy,
	passCopyMain,
	readPixels,
	type PassOpts,
} from "@thi.ng/webgl";

const width = 600;
const height = 600;

// setup WebGL2 canvas
const { gl, canvas } = glCanvas({
	width,
	height,
	autoScale: false,
	parent: document.getElementById("app")!,
	version: 2,
	opts: { premultipliedAlpha: false },
});

const { ctx } = pixelCanvas2d(width, height, document.getElementById("app"));

// main shader function to draw with a brush to a render texture.
// this shader is written using thi.ng/shader-ast and uses several highlevel
// helper functions from thi.ng/shader-ast-stdlib. it will be transpiled to GLSL
// by thi.ng/webgl as part of the multipass pipeline defined further below...
const doodle: PassOpts["fs"] = (gl, unis, ins, outs) => [
	defMain(() => {
		let uv: Vec2Sym;
		let bg: Vec4Sym;
		let color: Vec4Sym;
		let d: FloatSym;
		return [
			// normalize fragment coordinate
			(uv = sym(fragUV(gl.gl_FragCoord, unis.resolution))),
			// blur background (aka previous frame)
			(bg = sym(
				mix(
					blur9(unis.input0, unis.resolution, uv, vec2(1, 0)),
					blur9(unis.input0, unis.resolution, uv, vec2(0, 1)),
					float(0.5)
				)
			)),
			// compute distance to mouse position
			(d = sym(distance(uv, fragUV(unis.mousePos, unis.resolution)))),
			// create round brush with antialiased edge
			// we interpolate between configured brush color and transparent outside
			// (smoothstep returns a number in [0,1] range based on distance)
			// https://registry.khronos.org/OpenGL-Refpages/es3.0/html/smoothstep.xhtml
			(color = sym(
				mul(
					unis.color,
					smoothstep(
						add(unis.radius, float(1.5 / width)),
						unis.radius,
						d
					)
				)
			)),
			// use Porter-Duff alpha blending to mix color with background
			// https://docs.thi.ng/umbrella/shader-ast-stdlib/functions/porterDuff.html
			assign(outs.output0, blendSrcOver(color, bg)),
		];
	}),
];

// define WebGL multipass pipeline, including texture definitions, shader
// passes, uniform variables...
const app = defMultiPass({
	gl,
	width,
	height,
	// we need 2 textures: always write to `curr` & read from `prev`
	// by default the textures will be the same size as given above
	// (the texture formats given here are defaults too)
	textures: {
		curr: {
			format: TextureFormat.RGBA,
			type: TextureType.UNSIGNED_BYTE,
		},
		prev: {
			format: TextureFormat.RGBA,
			type: TextureType.UNSIGNED_BYTE,
			filter: TextureFilter.LINEAR,
		},
	},
	// list of shader passes, executed in sequence
	passes: [
		{
			// fragment shader for this pass is the above doodle fn
			fs: doodle,
			// we want to read the previous frame (aka feedback buffer)
			inputs: ["prev"],
			// we want to write to current frame/texture
			outputs: ["curr"],
			// custom uniforms (incl. optional defaults)
			uniforms: {
				resolution: "vec2",
				mousePos: "vec2",
				color: "vec4",
				radius: "float",
			},
		},

		// the 2nd render pass simply copies the current texture to the previous one.
		// passCopy() is provided by thi.ng/webgl and returns a shader pass spec
		// which copies one or more textures
		passCopy(["curr"], ["prev"]),

		// the 3rd pass is just copying the same texture to the main drawing
		// buffer so it's visible in the WebGL canvas (earlier passes only write
		// to offscreen textures/buffers aka FBOs). depending on use case, this
		// step might not be necessary (e.g. if the canvas is not attached to
		// the DOM)
		passCopyMain("curr"),
	],
});

// event handler to draw a single frame with the brush pos set to given
// coordinates and updated brush size & color...
const update = (x: number, y: number) => {
	const { left, top } = canvas.getBoundingClientRect();
	// handle to the 1st shader pass uniforms
	const unis = app.models[0].uniforms!;
	// set mouse/brush position (Y axis is flipped in WebGL)
	unis.mousePos = [x - left, height - (y - top)];
	// pick random color from a range preset
	// https://github.com/thi-ng/umbrella/blob/develop/packages/color/README.md#color-theme-generation
	unis.color = srgb(colorFromRange("warm")).buf;
	// use a sine oscillator to vary brush size over time
	unis.radius = sin(performance.now(), 5e-4, 0.04, 0.1);
	// draw a single frame (argument is a time value, not used here)
	app.update(0);
};

// read texture from fbo
const copyCurrentFrame = () => {
	// get pixel buffer of 2D canvas
	const idata = ctx.getImageData(0, 0, width, height);

	// bind the WebGL frame buffer of the 1st shader pass
	app.fbos[0].bind();
	// read that shader pass' output texture (aka the "curr" texture)
	// (readPixels always reads from the currently bound frame buffer)
	readPixels(
		gl,
		0,
		0,
		width,
		height,
		TextureFormat.RGBA,
		TextureType.UNSIGNED_BYTE,
		// target pixel array is the image data of the 2d canvas
		idata.data
	);
	// unbind the frame buffer
	app.fbos[0].unbind();

	// WebGL textures are stored "upside down"
	// depending on intended use we might need to manually flip the texture
	flipY(idata.data, width, height);

	// copy to 2D canvas
	ctx.putImageData(idata, 0, 0);
};

// btw. this could be done much more easily via thi.ng/pixel...
// https://docs.thi.ng/umbrella/pixel/classes/IntBuffer.html#flipY
const flipY = (
	tex: Uint8ClampedArray,
	width: number,
	height: number,
	channels = 4
) => {
	const stride = width * channels;
	const tmp = new Uint8Array(stride);
	for (
		let y1 = 0, y2 = height - 1, ymid = height / 2;
		y1 < ymid;
		y1++, y2--
	) {
		const i1 = y1 * stride;
		const i2 = y2 * stride;
		tmp.set(tex.subarray(i1, i1 + stride));
		tex.copyWithin(i1, i2, i2 + stride);
		tex.set(tmp, i2);
	}
	return tex;
};

// setup event listeners

canvas.addEventListener("mousemove", (e) => update(e.clientX, e.clientY));
canvas.addEventListener("touchmove", (e) => {
	update(e.touches[0].clientX, e.touches[0].clientY);
	e.preventDefault();
});

// copy current frame to second canvas
window.addEventListener("keydown", (e) => {
	if (e.key === "x") {
		copyCurrentFrame();
	}
});
