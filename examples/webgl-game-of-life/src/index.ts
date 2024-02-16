import { ConsoleLogger, ROOT } from "@thi.ng/logger";
import { SYSTEM } from "@thi.ng/random";
import { V3 } from "@thi.ng/shader-ast";
import { repeatedly } from "@thi.ng/transducers";
import { TextureFormat, defMultiPass, glCanvas, passCopy } from "@thi.ng/webgl";

// configure a logger to display generated shaders in console
ROOT.set(new ConsoleLogger());

// simulation size
const W = 512;

// create WebGL2 canvas
const canvas = glCanvas({
	version: 2,
	width: W,
	height: W,
	autoScale: false,
	parent: document.getElementById("app")!,
});

// create multipass render pipeline
const gameOfLife = defMultiPass({
	gl: canvas.gl,
	width: W,
	height: W,
	// define interim buffers to store sim state
	textures: {
		// current CA generation
		// use R8 format since we don't need more to store cell states
		curr: {
			format: TextureFormat.R8,
			// pre-seed simulation with noise texture
			image: new Uint8Array(
				repeatedly(() => (SYSTEM.probability(0.5) ? -1 : 0), W * W)
			),
		},
		// interim buffer for next CA generation
		// (shaders cannot read & write to the same texture)
		next: { format: TextureFormat.R8 },
	},
	// configure shader passes (will be executed in given order)
	// we don't (but could) specify geometry or vertex shader here
	// if omitted a default "fullscreen quad" with a simple
	// passthrough vertex shader will be used...
	passes: [
		// first pass: Game Of Life (GoL) simulation
		{
			fs: `
// helper function to read cell state (with wrap-around)
int read(ivec2 p) {
    return int(texelFetch(input0, (p + resolution) % resolution, 0).r);
}

void main() {
    ivec2 p = ivec2(gl_FragCoord.xy);
    ivec3 o = ivec3(-1, 0, 1);
    // read cell states & count neighbors
    int state = read(p);
    int num = read(p + o.yz);
    num += read(p + o.yx);
    num += read(p + o.zy);
    num += read(p + o.xy);
    num += read(p + o.zz);
    num += read(p + o.xz);
    num += read(p + o.zx);
    num += read(p + o.xx);
    // apply sim rules from lookup tables (see below)
    // ("output0" refers to first output texture of potentially multiple)
    output0 = vec4(state > 0 ? alive[num] : birth[num]);
}`,
			// define texture inputs & outputs (IDs from above `textures` config)
			inputs: ["curr"],
			outputs: ["next"],
			// each shader pass can define its own uniforms
			// (`time` & `resolution` are populated automatically if defined here)
			uniforms: {
				resolution: "ivec2",
				// CA simulation rules as look up tables for all possible neighbor counts
				// enables easy experimentation with new rules...
				// Game of Life rules: stay alive if 2 or 3, birth if 3 neighbors
				// (require 9 states to cover outcomes for 0-8 neighbors)
				alive: ["int[]", 9, [0, 0, 1, 1, 0, 0, 0, 0, 0]],
				birth: ["int[]", 9, [0, 0, 0, 1, 0, 0, 0, 0, 0]],
			},
		},

		// 2nd shader pass is a simple ping-pong copy pass
		// this will copy the "next" texture back into the "curr" texture
		passCopy(["next"], ["curr"]),

		// final shader pass: render the CA to the main color buffer
		{
			fs: `
void main() {
    // read cell state and choose color
    fragColor = vec4(mix(dead, alive, texelFetch(input0, ivec2(gl_FragCoord.xy), 0).r), 1);
}`,
			inputs: ["curr"],
			// final shader pass NEVER has any other outputs
			outputs: [],
			// custom uniforms for cell state colors
			uniforms: {
				alive: [V3, [1, 1, 1]],
				dead: [V3, [0, 0, 1]],
			},
		},
	],
});

// the returned multipass object allows access to all generated
// passes, textures, FBOs, uniforms...
// also includes a simple shadertoy-like animation control
// see: https://docs.thi.ng/umbrella/webgl/interfaces/Multipass.html
gameOfLife.start();
