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
		});
		assert.deepStrictEqual(lines, [
			[
				[1, 0],
				[4, 0],
			],
			[
				[1, 1],
				[1, 3],
			],
			[
				[4, 2],
				[2, 4],
			],
		]);
		assert.deepStrictEqual(points, [
			[0, 4],
			[4, 4],
		]);
	},
});
