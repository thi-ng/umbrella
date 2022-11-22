import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { classifyField, Field, FieldClass } from "../src/index.js";

const checkAll = (
	specs: [
		Pick<Field, "type" | "tag" | "len" | "const">,
		{ classifier: FieldClass; isConst: boolean }
	][]
) => {
	for (let [f, res] of specs) {
		assert.deepStrictEqual(classifyField(f, {}), res);
	}
};

group("classifier", {
	string: () => {
		checkAll([
			[{ type: "string" }, { classifier: "str", isConst: true }],
			[
				{ type: "string", const: false },
				{ classifier: "str", isConst: false },
			],
			[
				{ type: "string", tag: "array", len: 1 },
				{ classifier: "strArray", isConst: true },
			],
			[
				{ type: "string", tag: "ptr" },
				{ classifier: "strPtr", isConst: true },
			],
			[
				{ type: "string", tag: "ptr", len: 2 },
				{ classifier: "strPtrFixed", isConst: true },
			],
			[
				{ type: "string", tag: "ptr", len: 0 },
				{ classifier: "strPtrMulti", isConst: true },
			],
			[
				{ type: "string", tag: "slice" },
				{ classifier: "strSlice", isConst: true },
			],
		]);
		assert.throws(() =>
			classifyField({ type: "string", tag: "array", len: 0 }, {})
		);
		assert.throws(() =>
			classifyField({ type: "string", tag: "vec", len: 2 }, {})
		);
	},

	opaque: () => {
		checkAll([
			[{ type: "opaque" }, { classifier: "opaque", isConst: false }],
			[
				{ type: "opaque", const: true },
				{ classifier: "opaque", isConst: true },
			],
			[
				{ type: "opaque", tag: "array", len: 1 },
				{ classifier: "opaqueArray", isConst: false },
			],
			[
				{ type: "opaque", tag: "ptr" },
				{ classifier: "opaquePtr", isConst: false },
			],
			[
				{ type: "opaque", tag: "ptr", len: 2 },
				{ classifier: "opaquePtrFixed", isConst: false },
			],
			[
				{ type: "opaque", tag: "ptr", len: 0 },
				{ classifier: "opaquePtrMulti", isConst: false },
			],
			[
				{ type: "opaque", tag: "slice" },
				{ classifier: "opaqueSlice", isConst: false },
			],
		]);
		assert.throws(() =>
			classifyField({ type: "opaque", tag: "array", len: 0 }, {})
		);
		assert.throws(() =>
			classifyField({ type: "opaque", tag: "vec", len: 2 }, {})
		);
	},

	prim: () => {
		checkAll([
			[{ type: "u8" }, { classifier: "single", isConst: false }],
			[
				{ type: "u8", const: true },
				{ classifier: "single", isConst: true },
			],
			[
				{ type: "u8", tag: "array", len: 1 },
				{ classifier: "array", isConst: false },
			],
			[
				{ type: "u8", tag: "ptr" },
				{ classifier: "ptr", isConst: false },
			],
			[
				{ type: "u8", tag: "ptr", len: 2 },
				{ classifier: "ptrFixed", isConst: false },
			],
			[
				{ type: "u8", tag: "ptr", len: 0 },
				{ classifier: "ptrMulti", isConst: false },
			],
			[
				{ type: "u8", tag: "slice" },
				{ classifier: "slice", isConst: false },
			],
			[
				{ type: "u8", tag: "vec", len: 2 },
				{ classifier: "vec", isConst: false },
			],
		]);
		assert.throws(() =>
			classifyField({ type: "u8", tag: "array", len: 0 }, {})
		);
		assert.throws(() =>
			classifyField({ type: "u8", tag: "array", len: 0 }, {})
		);
	},
});
