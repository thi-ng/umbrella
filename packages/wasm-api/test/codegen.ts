import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { readFileSync } from "fs";
import {
	CodeGenOpts,
	generateTypes,
	Struct,
	TypeColl,
	TYPESCRIPT,
	ZIG,
} from "../src/index.js";

const fixture = (fname: string) =>
	readFileSync("test/fixtures/" + fname, "utf-8");

const checkFixture = (src: string, fname: string) =>
	assert.strictEqual(src, fixture(fname));

const stringTypes: TypeColl = {
	Foo: <Struct>{
		name: "Foo",
		type: "struct",
		fields: [
			{ name: "single", type: "string" },
			{ name: "multi", type: "string", tag: "array", len: 2 },
			{ name: "singlePtr", type: "string", tag: "ptr" },
			{ name: "multiPtr", type: "string", tag: "ptr", len: 2 },
		],
	},
};

group("codegen", {
	stringSlice: () => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "slice",
		};
		const srcTS = generateTypes(stringTypes, TYPESCRIPT(), opts);
		const srcZig = generateTypes(stringTypes, ZIG(), opts);
		checkFixture(srcTS, "string-slice.ts");
		checkFixture(srcZig, "string-slice.zig");
	},

	stringPtr: () => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "ptr",
		};
		const srcTS = generateTypes(stringTypes, TYPESCRIPT(), opts);
		const srcZig = generateTypes(stringTypes, ZIG(), opts);
		checkFixture(srcTS, "string-ptr.ts");
		checkFixture(srcZig, "string-ptr.zig");
	},
});
