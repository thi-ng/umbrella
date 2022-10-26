import { fileFixture, fixturePath, group, TestCtx } from "@thi.ng/testament";
import { writeText } from "@thi.ng/file-io";
import * as assert from "assert";
import {
	C11,
	CodeGenOpts,
	DEFAULT_CODEGEN_OPTS,
	Enum,
	generateTypes,
	ICodeGen,
	prepareTypes,
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
	types: TypeColl,
	gen: ICodeGen,
	opts: Partial<CodeGenOpts>,
	fname: string,
	regenerate = false
) => {
	const src = generateTypes(types, gen, opts);
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
		checkFixture(
			ctx,
			stringTypes,
			C11({ typePrefix: "WASM_" }),
			opts,
			"string-slice.c"
		);
		checkFixture(ctx, stringTypes, TYPESCRIPT(), opts, "string-slice.ts");
		checkFixture(ctx, stringTypes, ZIG(), opts, "string-slice.zig");
		ctx.done();
	},

	stringPtr: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "ptr",
		};
		checkFixture(
			ctx,
			stringTypes,
			C11({ typePrefix: "WASM_" }),
			opts,
			"string-ptr.c"
		);
		checkFixture(ctx, stringTypes, TYPESCRIPT(), opts, "string-ptr.ts");
		checkFixture(ctx, stringTypes, ZIG(), opts, "string-ptr.zig");
		ctx.done();
	},

	union: (ctx) => {
		const opts = { ...DEFAULT_CODEGEN_OPTS, header: false };
		const types = <TypeColl>{
			A: {
				name: "A",
				type: "struct",
				fields: [
					{ name: "a", type: "u8" },
					{ pad: 3 },
					{ name: "b", type: "u32" },
					{ name: "c", type: "u16", tag: "ptr", len: 3 },
					{ pad: 2 },
					{ name: "d", type: "f64" },
				],
			},
			B: {
				name: "B",
				type: "union",
				fields: [
					{ name: "a", type: "A", tag: "array", len: 3 },
					{ name: "b", type: "u64" },
				],
			},
		};
		assert.deepStrictEqual(prepareTypes(types, opts), {
			A: {
				name: "A",
				type: "struct",
				fields: [
					{
						name: "a",
						type: "u8",
						__align: 1,
						__offset: 0,
						__size: 1,
					},
					{
						pad: 3,
						__align: 1,
						__offset: 1,
						__size: 3,
					},
					{
						name: "b",
						type: "u32",
						__align: 4,
						__offset: 4,
						__size: 4,
					},
					{
						name: "c",
						type: "u16",
						tag: "ptr",
						len: 3,
						__align: 4,
						__offset: 8,
						__size: 4,
					},
					{
						pad: 2,
						__align: 1,
						__offset: 12,
						__size: 2,
					},
					{
						name: "d",
						type: "f64",
						__align: 8,
						__offset: 16,
						__size: 8,
					},
				],
				__align: 8,
				__size: 24,
			},
			B: {
				name: "B",
				type: "union",
				fields: [
					{
						name: "a",
						type: "A",
						tag: "array",
						len: 3,
						__align: 8,
						__offset: 0,
						__size: 72,
					},
					{
						name: "b",
						type: "u64",
						__align: 8,
						__offset: 0,
						__size: 8,
					},
				],
				__align: 8,
				__size: 72,
			},
		});
		checkFixture(ctx, types, C11({ typePrefix: "WASM_" }), opts, "union.c");
		checkFixture(ctx, types, TYPESCRIPT(), opts, "union.ts");
		checkFixture(ctx, types, ZIG(), opts, "union.zig");
		ctx.done();
	},
});
