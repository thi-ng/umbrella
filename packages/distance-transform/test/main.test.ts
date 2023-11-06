import { GRAY8, intBuffer } from "@thi.ng/pixel";
import { expect, test } from "bun:test";
import { CHEBYSHEV, MANHATTAN, distanceTransform } from "../src/index.js";

test("manhattan", () => {
	const buf = intBuffer(4, 4, GRAY8);
	buf.data[0] = 1;
	expect([...distanceTransform(buf, MANHATTAN, 0)]).toEqual(
		// prettier-ignore
		[
			0, 1, 2, 3,
			1, 2, 3, 4,
			2, 3, 4, 5,
			3, 4, 5, 6
		]
	);
});

test("chebyshev", () => {
	const buf = intBuffer(4, 4, GRAY8);
	buf.data[0] = 1;
	expect([...distanceTransform(buf, CHEBYSHEV, 0)]).toEqual(
		// prettier-ignore
		[
			0, 1, 2, 3,
			1, 1, 2, 3,
			2, 2, 2, 3,
			3, 3, 3, 3
		]
	);
});
