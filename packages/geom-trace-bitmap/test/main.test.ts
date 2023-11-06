import { GRAY8, intBuffer } from "@thi.ng/pixel";
import { group } from "@thi.ng/testament";
import type { ReadonlyVec } from "@thi.ng/vectors";
import * as assert from "assert";
import {
	extractSegmentsX,
	extractSegmentsY,
	traceBitmap,
} from "../src/index.js";

const PTS: ReadonlyVec[] = [
	[0, 10],
	[0, 12],
	[0, 16],
	[0, 18],
	[2, 12],
	[2, 16],
	[2, 30],
	[3, 18],
	[4, 10],
	[5, 12],
	[8, 12],
	[14, 12],
];

group("geom-trace-bitmap", {
	basic: () => {
		// prettier-ignore
		const pixels = new Uint8Array([
			0, 1, 1, 1, 1,
			0, 1, 0, 0, 0,
			0, 1, 0, 0, 1,
			0, 0, 0, 1, 0,
			1, 0, 1, 0, 1,
		]);
		const { lines, points } = traceBitmap({
			img: intBuffer(5, 5, GRAY8, pixels),
			select: (x) => x > 0,
			last: false,
			mat: [1, 0, 0, 1, 10, 20],
		});
		assert.deepStrictEqual(lines, [
			[
				[11, 20],
				[14, 20],
			],
			[
				[11, 21],
				[11, 22],
			],
			[
				[14, 22],
				[12, 24],
			],
		]);
		assert.deepStrictEqual(points, [
			[10, 24],
			[14, 24],
		]);
	},

	"no wraparound": () => {
		// prettier-ignore
		const pixels = new Uint8Array([
			0, 0, 1,
			1, 1, 0,
			0, 1, 1,
		]);
		const { lines, points } = traceBitmap({
			img: intBuffer(3, 3, GRAY8, pixels),
			select: (x) => x > 0,
			last: true,
		});
		assert.deepStrictEqual(lines, [
			[
				[0, 1],
				[2, 1],
			],
			[
				[1, 2],
				[2, 2],
			],
		]);
		assert.deepStrictEqual(points, [[2, 0]]);
	},

	extractX: () => {
		assert.deepStrictEqual(extractSegmentsX(PTS, 5), {
			segments: [
				[
					[0, 10],
					[4, 10],
				],
				[
					[0, 12],
					[8, 12],
				],
				[
					[0, 16],
					[2, 16],
				],
				[
					[0, 18],
					[3, 18],
				],
			],
			points: [[14, 12]],
		});
	},
	extractY: () => {
		assert.deepStrictEqual(extractSegmentsY(PTS, 5), {
			segments: [
				[
					[0, 10],
					[0, 18],
				],
				[
					[2, 12],
					[2, 16],
				],
			],
			points: [
				[2, 30],
				[3, 18],
				[4, 10],
				[5, 12],
				[8, 12],
			],
		});
	},
});
