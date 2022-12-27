import { group } from "@thi.ng/testament";
import { intBuffer, GRAY8 } from "@thi.ng/pixel";
import * as assert from "assert";
import { traceBitmap } from "../src/index.js";

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
});
