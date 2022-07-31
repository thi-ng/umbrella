import { partial } from "@thi.ng/compose/partial";
import { TAU } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { zip } from "@thi.ng/transducers/zip";

// see http://dev.thi.ng/gradients/

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
