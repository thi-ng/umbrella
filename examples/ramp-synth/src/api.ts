import { map, range } from "@thi.ng/transducers";
import type { Vec } from "@thi.ng/vectors";

export const WIDTH = 600;
export const HEIGHT = 150;
export const PAD = 20;
export const CWIDTH = WIDTH - 2 * PAD;
export const CHEIGHT = HEIGHT - 2 * PAD;
export const SNAP = 5 / WIDTH;
export const BASE_FREQ = 60;

export const PRESETS: Vec[][] = [
	[
		[0, 0],
		[0.98, 1],
		[1, 0],
	],
	[
		[0.25, 0.5],
		[0.5, 1],
		[0.625, 0.1],
		[0.75, 0.5],
	],
	[...map((i) => [i / 20, i & 1 ? i / 20 : 0], range(21))],
	[...map((i) => [i / 12, i % 3 ? 1 : 0.25], range(13))],
];
