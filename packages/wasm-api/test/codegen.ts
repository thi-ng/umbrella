import { fileFixture, group, TestCtx } from "@thi.ng/testament";
import * as assert from "assert";
import {
	C11,
	CodeGenOpts,
	Enum,
	generateTypes,
	Struct,
	TypeColl,
	TYPESCRIPT,
	ZIG,
} from "../src/index.js";

const checkFixture = (ctx: TestCtx, src: string, fname: string) =>
	assert.strictEqual(src, fileFixture(fname, ctx.logger));

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
		],
	},
};

group("codegen", {
	stringSlice: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "slice",
		};
		const srcC11 = generateTypes(
			stringTypes,
			C11({ typePrefix: "WASM_" }),
			opts
		);
		const srcTS = generateTypes(stringTypes, TYPESCRIPT(), opts);
		const srcZig = generateTypes(stringTypes, ZIG(), opts);
		checkFixture(ctx, srcC11, "string-slice.c");
		checkFixture(ctx, srcTS, "string-slice.ts");
		checkFixture(ctx, srcZig, "string-slice.zig");
		ctx.done();
	},

	stringPtr: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "ptr",
		};
		const srcC11 = generateTypes(
			stringTypes,
			C11({ typePrefix: "WASM_" }),
			opts
		);
		const srcTS = generateTypes(stringTypes, TYPESCRIPT(), opts);
		const srcZig = generateTypes(stringTypes, ZIG(), opts);
		checkFixture(ctx, srcC11, "string-ptr.c");
		checkFixture(ctx, srcTS, "string-ptr.ts");
		checkFixture(ctx, srcZig, "string-ptr.zig");
		ctx.done();
	},
});
