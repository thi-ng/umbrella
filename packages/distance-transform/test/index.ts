import { GRAY8, intBuffer } from "@thi.ng/pixel";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { CHEBYSHEV, distanceTransform, MANHATTAN } from "../src/index.js";

group("distance-transform", {
	manhattan: () => {
		const buf = intBuffer(4, 4, GRAY8);
		buf.data[0] = 1;
		assert.deepStrictEqual(
			[...distanceTransform(buf, MANHATTAN, 0)],
			// prettier-ignore
			[
                0, 1, 2, 3,
                1, 2, 3, 4,
                2, 3, 4, 5,
                3, 4, 5, 6
            ]
		);
	},
	chebyshev: () => {
		const buf = intBuffer(4, 4, GRAY8);
		buf.data[0] = 1;
		assert.deepStrictEqual(
			[...distanceTransform(buf, CHEBYSHEV, 0)],
			// prettier-ignore
			[
                0, 1, 2, 3,
                1, 1, 2, 3,
                2, 2, 2, 3,
                3, 3, 3, 3
            ]
		);
	},
});
