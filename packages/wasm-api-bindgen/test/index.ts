import { writeText } from "@thi.ng/file-io";
import { fileFixture, fixturePath, group, TestCtx } from "@thi.ng/testament";
import * as assert from "assert";
import {
	C11,
	CodeGenOpts,
	DEFAULT_CODEGEN_OPTS,
	Enum,
	FuncPointer,
	generateTypes,
	ICodeGen,
	prepareTypes,
	Struct,
	TypeColl,
	TYPESCRIPT,
	ZIG,
} from "../src/index.js";

const OPTS = { ...DEFAULT_CODEGEN_OPTS, header: false };

const stringTypes: TypeColl = {
	Foo: <Struct>{
		name: "Foo",
		type: "struct",
		fields: [
			{ name: "single", type: "string", const: false },
			{ name: "constSingle", type: "string" },
			{ name: "multi", type: "string", tag: "array", len: 2 },
			{ name: "singlePtr", type: "string", tag: "ptr" },
			{ name: "multiPtr", type: "string", tag: "ptr", len: 2 },
			{ name: "slice", type: "string", tag: "slice", const: false },
			{ name: "constSlice", type: "string", tag: "slice" },
		],
	},
};

const checkFixture = (
	ctx: TestCtx,
	coll: TypeColl,
	gen: ICodeGen,
	opts: Partial<CodeGenOpts>,
	fname: string,
	regenerate = false
) => {
	const src = generateTypes(coll, gen, opts);
	regenerate && writeText(fixturePath(fname), src);
	assert.strictEqual(src, fileFixture(fname, ctx.logger));
};

const checkAll = (
	ctx: TestCtx,
	coll: TypeColl,
	opts: Partial<CodeGenOpts>,
	baseName: string,
	regenerate = false
) => {
	// prettier-ignore
	checkFixture(ctx, coll, C11({ typePrefix: "WASM_" }), opts, `${baseName}.c`, regenerate);
	checkFixture(ctx, coll, TYPESCRIPT(), opts, `${baseName}.ts`, regenerate);
	checkFixture(ctx, coll, ZIG(), opts, `${baseName}.zig`, regenerate);
};

group("wasm-api-bindgen", {
	stringSlice: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			...OPTS,
			debug: true,
			stringType: "slice",
		};
		checkAll(ctx, stringTypes, opts, "string-slice");
		ctx.done();
	},

	stringPtr: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			...OPTS,
			debug: true,
			stringType: "ptr",
		};
		checkAll(ctx, stringTypes, opts, "string-ptr");
		ctx.done();
	},

	union: (ctx) => {
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
		assert.deepStrictEqual(prepareTypes(types, OPTS), {
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
		checkAll(ctx, types, OPTS, "union");
		ctx.done();
	},

	opaque: (ctx) => {
		const coll = {
			A: <Struct>{
				name: "A",
				type: "struct",
				fields: [
					{ name: "a", type: "opaque" },
					{ name: "ptr", type: "opaque", tag: "ptr" },
					{ name: "ptr2", type: "opaque", tag: "ptr", len: 2 },
					{
						name: "constPtr",
						type: "opaque",
						tag: "ptr",
						const: true,
					},
					{
						name: "slice",
						type: "opaque",
						tag: "slice",
					},
					{
						name: "constSlice",
						type: "opaque",
						tag: "slice",
						const: true,
					},
					{ name: "array", type: "opaque", tag: "array", len: 3 },
					{
						name: "constArray",
						type: "opaque",
						tag: "array",
						len: 3,
						const: true,
					},
				],
			},
		};
		prepareTypes(coll, OPTS);
		assert.deepStrictEqual(coll, {
			A: {
				name: "A",
				type: "struct",
				fields: [
					{
						name: "a",
						type: "opaque",
						__align: 4,
						__offset: 0,
						__size: 4,
					},
					{
						name: "ptr",
						type: "opaque",
						tag: "ptr",
						__align: 4,
						__offset: 4,
						__size: 4,
					},
					{
						name: "ptr2",
						type: "opaque",
						tag: "ptr",
						len: 2,
						__align: 4,
						__offset: 8,
						__size: 4,
					},
					{
						name: "constPtr",
						type: "opaque",
						tag: "ptr",
						const: true,
						__align: 4,
						__offset: 12,
						__size: 4,
					},
					{
						name: "slice",
						type: "opaque",
						tag: "slice",
						__align: 4,
						__offset: 16,
						__size: 8,
					},
					{
						name: "constSlice",
						type: "opaque",
						tag: "slice",
						const: true,
						__align: 4,
						__offset: 24,
						__size: 8,
					},
					{
						name: "array",
						type: "opaque",
						tag: "array",
						len: 3,
						__align: 4,
						__offset: 32,
						__size: 12,
					},
					{
						name: "constArray",
						type: "opaque",
						tag: "array",
						len: 3,
						const: true,
						__align: 4,
						__offset: 44,
						__size: 12,
					},
				],
				__align: 4,
				__size: 56,
			},
		});
		checkAll(ctx, coll, OPTS, "opaque");
		ctx.done();
	},

	enum: (ctx) => {
		const coll = {
			A: <Enum>{
				name: "A",
				type: "enum",
				values: ["foo", { name: "bar" }, { name: "baz", value: 10 }],
			},
			B: <Struct>{
				name: "B",
				type: "struct",
				fields: [
					{ name: "single", type: "A" },
					{ name: "array", type: "A", tag: "array", len: 2 },
					{ name: "slice", type: "A", tag: "slice" },
					{ name: "ptr", type: "A", tag: "ptr" },
					{ name: "ptr2", type: "A", tag: "ptr", len: 2 },
				],
			},
		};
		checkAll(ctx, coll, OPTS, "enum");
		ctx.done();
	},

	funcptr: (ctx) => {
		const coll = {
			A: <FuncPointer>{
				name: "A",
				type: "funcptr",
				rtype: "void",
				args: [
					{ name: "x", type: "usize", tag: "ptr" },
					{
						name: "y",
						type: "string",
						const: true,
					},
				],
			},
			B: <Struct>{
				name: "B",
				type: "struct",
				fields: [
					{ name: "a", type: "A" },
					{ name: "ptr", type: "A", tag: "ptr" },
					{ name: "ptr2", type: "A", tag: "ptr", len: 2 },
					{ name: "array", type: "A", tag: "array", len: 2 },
					{ name: "slice", type: "A", tag: "slice" },
				],
			},
		};
		prepareTypes(coll, OPTS);
		assert.deepStrictEqual(coll, {
			A: {
				name: "A",
				type: "funcptr",
				rtype: "void",
				args: [
					{ name: "x", type: "u32", tag: "ptr", __align: 4 },
					{ name: "y", type: "string", const: true, __align: 4 },
				],
				__align: 4,
				__size: 4,
			},
			B: {
				name: "B",
				type: "struct",
				fields: [
					{
						name: "a",
						type: "A",
						__align: 4,
						__offset: 0,
						__size: 4,
					},
					{
						name: "ptr",
						type: "A",
						tag: "ptr",
						__align: 4,
						__offset: 4,
						__size: 4,
					},
					{
						name: "ptr2",
						type: "A",
						tag: "ptr",
						len: 2,
						__align: 4,
						__offset: 8,
						__size: 4,
					},
					{
						name: "array",
						type: "A",
						tag: "array",
						len: 2,
						__align: 4,
						__offset: 12,
						__size: 8,
					},
					{
						name: "slice",
						type: "A",
						tag: "slice",
						__align: 4,
						__offset: 20,
						__size: 8,
					},
				],
				__align: 4,
				__size: 28,
			},
		});
		checkAll(ctx, coll, OPTS, "funcptr");
		ctx.done();
	},

	slices: (ctx) => {
		const coll = {
			A: <Struct>{
				name: "A",
				type: "struct",
				fields: [{ name: "a", type: "u16" }],
			},
			B: <Struct>{
				name: "B",
				type: "struct",
				fields: [
					{ name: "slice", type: "u8", tag: "slice" },
					{
						name: "constSlice",
						type: "u8",
						tag: "slice",
						const: true,
					},
					{ name: "ptr", type: "u8", tag: "ptr" },
					{ name: "constPtr", type: "u8", tag: "ptr", const: true },
					{ name: "ptr2", type: "u8", tag: "ptr", len: 2 },
					{
						name: "ptr2sentinel",
						type: "u8",
						tag: "ptr",
						len: 2,
						sentinel: 0,
					},
					{
						name: "constPtr2",
						type: "u8",
						tag: "ptr",
						len: 2,
						const: true,
					},
					{
						name: "constPtr2sentinel",
						type: "u8",
						tag: "ptr",
						len: 2,
						const: true,
						sentinel: 0,
					},
					{ name: "ptrMulti", type: "u8", tag: "ptr", len: 0 },
					{
						name: "ptrMultiSentinel",
						type: "u8",
						tag: "ptr",
						len: 0,
						sentinel: 255,
					},
					{
						name: "constPtrMulti",
						type: "u8",
						tag: "ptr",
						len: 0,
						const: true,
					},
					{
						name: "constPtrMultiSentinel",
						type: "u8",
						tag: "ptr",
						len: 0,
						const: true,
						sentinel: 255,
					},

					{ name: "array", type: "i32", tag: "array", len: 2 },
					{
						name: "arraySentinel",
						type: "i32",
						tag: "array",
						len: 2,
						sentinel: 0,
					},
					// { name: "vec", type: "u8", tag: "vec", len: 2 },
					{ name: "aSingle", type: "A" },
					{ name: "aSlice", type: "A", tag: "slice" },
					{
						name: "constASlice",
						type: "A",
						tag: "slice",
						const: true,
					},
					{ name: "aPtr", type: "A", tag: "ptr" },
					{ name: "aPtr2", type: "A", tag: "ptr", len: 2 },
					{
						name: "aPtrMulti",
						type: "A",
						tag: "ptr",
						len: 0,
						doc: "Multiple A's",
					},
				],
			},
		};
		checkAll(ctx, coll, { ...OPTS, debug: true }, "slices");
		ctx.done();
	},
});
