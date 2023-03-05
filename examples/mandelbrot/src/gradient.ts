import { partial } from "@thi.ng/compose";
import { clamp01, TAU } from "@thi.ng/math";
import {
	comp,
	map,
	normRange,
	push,
	transduce,
	zip,
} from "@thi.ng/transducers";

// see https://github.com/thi-ng/umbrella/blob/develop/packages/color/README.md#cosine-gradients

const cosColor = (
	dc: number[],
	amp: number[],
	fmod: number[],
	phase: number[],
	t: number
) =>
	transduce(
		map<number[], number>(([a, b, c, d]) =>
			clamp01(a + b * Math.cos(TAU * (c * t + d)))
		),
		push(),
		zip(dc, amp, fmod, phase)
	);

export const cosineGradient = (n: number, spec: number[][]): number[] => {
	const [dc, amp, fmod, phase] = spec;
	return transduce(
		comp(
			map((t: number) => cosColor(dc, amp, fmod, phase, t)),
			map(
				([r, g, b]) =>
					((b * 255) << 16) |
					((g * 255) << 8) |
					(r * 255) |
					0xff000000
			)
		),
		push(),
		normRange(n - 1)
	);
};

export const GRADIENTS = [
	[
		[0.5, 0.5, 0.5],
		[0.5, 0.5, 0.5],
		[-1.0, -1.0, -1.0],
		[0.0, 0.1, 0.2],
	],
	[
		[0.5, 0.5, 0.5],
		[0.5, 0.5, 0.5],
		[0.5, 0.618, 0.5],
		[-1.0, 0.828, -0.152],
	],
	[
		[0.402, 0.654, 0.247],
		[0.835, 0.668, 0.42],
		[1.226, 1.553, 1.445],
		[2.684, 6.256, 4.065],
	],
	[
		[0.5, 0.5, 0.5],
		[0.5, 0.5, 0.5],
		[0.5, 0.5, 0.5],
		[0.5, 0.5, 0.5],
	],
	[
		[0.5, 0.5, 0.5],
		[1.0, 1.0, 1.0],
		[10.0, 10.0, 10.0],
		[0.0, 0.0, 0.0],
	],
].map(partial(cosineGradient, 256));
