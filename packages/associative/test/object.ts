import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { renameTransformedKeys } from "../src/index.js";

group("object ops", {
	renameTransformedKeys: () => {
		assert.deepStrictEqual(
			renameTransformedKeys(
				{ a: 1, b: 2, c: null },
				{
					a: "aa",
					b: ["bb", (x, src) => x * 10 + src.a],
					c: "cc",
				}
			),
			{ aa: 1, bb: 21 }
		);
		assert.deepStrictEqual(renameTransformedKeys(null, { a: "aa" }), {});
	},
});
