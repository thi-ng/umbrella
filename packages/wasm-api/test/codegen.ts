import { fileFixture, fixturePath, group, TestCtx } from "@thi.ng/testament";
import { writeText } from "@thi.ng/file-io";
import * as assert from "assert";
import {
	C11,
	CodeGenOpts,
	Enum,
	generateTypes,
	ICodeGen,
	Struct,
	TypeColl,
	TYPESCRIPT,
	ZIG,
} from "../src/index.js";

const stringTypes: TypeColl = {
	Bar: <Enum>{
		name: "Bar",
		type: "enum",
		values: ["a", { name: "b", value: 16 }, "c", { name: "d", value: 32 }],
	},
	Foo: <Struct>{
		name: "Foo",
		type: "struct",
		fields: [
			{ name: "single", type: "string" },
			{ name: "multi", type: "string", tag: "array", len: 2 },
			{ name: "singlePtr", type: "string", tag: "ptr" },
			{ name: "multiPtr", type: "string", tag: "ptr", len: 2 },
			{ name: "kind", type: "Bar" },
			{ name: "size", type: "usize" },
		],
	},
};

const checkFixture = (
	ctx: TestCtx,
	gen: ICodeGen,
	opts: Partial<CodeGenOpts>,
	fname: string,
	regenerate = false
) => {
	const src = generateTypes(stringTypes, gen, opts);
	regenerate && writeText(fixturePath(fname), src);
	assert.strictEqual(src, fileFixture(fname, ctx.logger));
};

group("codegen", {
	stringSlice: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "slice",
		};
		checkFixture(ctx, C11({ typePrefix: "WASM_" }), opts, "string-slice.c");
		checkFixture(ctx, TYPESCRIPT(), opts, "string-slice.ts");
		checkFixture(ctx, ZIG(), opts, "string-slice.zig");
		ctx.done();
	},

	stringPtr: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "ptr",
		};
		checkFixture(ctx, C11({ typePrefix: "WASM_" }), opts, "string-ptr.c");
		checkFixture(ctx, TYPESCRIPT(), opts, "string-ptr.ts");
		checkFixture(ctx, ZIG(), opts, "string-ptr.zig");
		ctx.done();
	},
});
