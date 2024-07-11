import type { FnU2 } from "@thi.ng/api";
import { benchmark, benchResult } from "@thi.ng/bench";
import { isPow2 } from "@thi.ng/binary";
import { assert } from "@thi.ng/errors";
import {
	$xy,
	add,
	assign,
	defMain,
	int,
	ivec2,
	lshift,
	sym,
	texelFetchOffset,
	type IVec2Sym,
	type Vec4Term,
} from "@thi.ng/shader-ast";
import {
	assocObj,
	comp,
	iterate,
	mapIndexed,
	push,
	range,
	takeWhile,
	transduce,
} from "@thi.ng/transducers";
import {
	defMultiPass,
	glCanvas,
	readPixels,
	TextureFormat,
	TextureType,
	type PassOpts,
	type ShaderFn,
	type TextureOpts,
} from "@thi.ng/webgl";

const { gl } = glCanvas({ width: 1, height: 1 });

// higher-order thi.ng/shader-ast function performing a single reduction pass,
// each fragment reducing 2x2 input vec4 values using given operation
const reduceStep =
	(op: FnU2<Vec4Term>): ShaderFn =>
	(gl, unis, _, outs) =>
		[
			defMain(() => {
				let uv: IVec2Sym;
				const sample = (x: number, y: number) =>
					texelFetchOffset(unis.input0, uv, int(0), ivec2(x, y));
				return [
					(uv = sym(lshift(ivec2($xy(gl.gl_FragCoord)), int(1)))),
					assign(
						outs.output0,
						op(
							op(sample(0, 0), sample(1, 0)),
							op(sample(0, 1), sample(1, 1))
						)
					),
				];
			}),
		];

// build declarative multi-pass shader pipeline for performing GPU-side reductions
const defReduction = (op: FnU2<Vec4Term>, size: number, data: Float32Array) => {
	assert(size > 0 && isPow2(size), "size must be a power of 2");
	assert(
		data.length == size * size * 4,
		`expected data size=${size * size * 4}`
	);
	// build texture specs for all compute passes
	// the 1st texture will be of configured start size, then each successive
	// texture will be half the size of its predecessor
	const textures = transduce(
		comp(
			takeWhile((x) => x > 0),
			mapIndexed<number, [number, Partial<TextureOpts>]>((i, x) => [
				i,
				{ format: TextureFormat.RGBA32F, width: x, height: x },
			])
		),
		assocObj<Partial<TextureOpts>>(),
		iterate((x) => x >> 1, size)
	);
	// assign input data to first texture
	textures[0].image = data;

	// pre-compile single reduction shader pass using given `op`, we will re-use
	// this same shader for all passes...
	const shader = reduceStep(op);
	// build list of shader passes, each one reading from one of the defined
	// textures and then writing to its successor texture
	// the last pass will write to the 1x1 texture
	const passes = transduce(
		comp(
			takeWhile((x) => x > 1),
			mapIndexed<number, PassOpts>((i) => ({
				fs: shader,
				inputs: [String(i)],
				outputs: [String(i + 1)],
			}))
		),
		push<PassOpts>(),
		iterate((x) => x >> 1, size)
	);
	// build & return multipass shader pipeline
	return defMultiPass({
		gl: gl,
		width: 1,
		height: 1,
		textures,
		passes,
	});
};

const W = 512;
const DATA = new Float32Array(range(W * W * 4));

const reduce = defReduction(add, W, DATA);

// actually perfom & benchmark the reduction
// (see output in browser console)
benchmark(() => reduce.update(), { title: "GPU", warmup: 100, iter: 1000 });

// CPU comparison
const reduceCPU = (data: Float32Array) => {
	let sum = 0;
	for (let i = 0, n = data.length; i < n; i++) sum += data[i];
	return sum;
};

benchmark(() => reduceCPU(DATA), { title: "CPU", warmup: 100, iter: 1000 });

// obtain & display results of the various GPU compute passes.
// THIS IS FOR DEBUGGING ONLY! for actual usage only the last pass needs to be
// processed (here always a 1x1 texture = 4 result values)
let gpuResult = 0;
for (let i = 0; i < reduce.fbos.length; i++) {
	const [w, h] = reduce.textures[i + 1].size;
	// result array for current pass
	const res = new Float32Array(w * h * 4);
	// benchmark texture reads (1000 iterations)
	const [_, t] = benchResult(() => {
		// bind the FBO/texture of the current pass
		reduce.fbos[i].bind();
		// read values
		readPixels(gl, 0, 0, w, h, TextureFormat.RGBA, TextureType.FLOAT, res);
		reduce.fbos[i].unbind();
	}, 1000);
	// since the GPU result always consists multiple values (since vec4 based),
	// we still need to perform one final reduction...
	gpuResult = reduceCPU(res);
	// show stats
	console.log(
		"pass",
		i,
		"size",
		w,
		"result",
		res,
		gpuResult,
		"read pixels:",
		t / 1000,
		"ms"
	);
}

assert(gpuResult === reduceCPU(DATA), "results don't match 😭");
