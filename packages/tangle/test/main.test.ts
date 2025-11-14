// SPDX-License-Identifier: Apache-2.0
import { assert } from "@thi.ng/errors";
import { readText } from "@thi.ng/file-io";
import { expect, test } from "bun:test";
import { tangleFile, tangleString } from "../src/index.js";

test("md", () => {
	const ctx = tangleFile(import.meta.dir + "/fixtures/main.md", {
		opts: { comments: false },
	});
	const outs = Object.keys(ctx.outputs);
	expect(outs.length).toBe(3);
	for (let out of [
		"out/ex01/src/bar.ts",
		"out/ex01/src/index.ts",
		"out/main.md",
	]) {
		out = `${import.meta.dir}/fixtures/${out}`;
		assert(outs.includes(out), `missing output: ${out}`);
		expect(ctx.outputs[out]).toBe(readText(out));
	}
});

test("in-memory", () => {
	const ctx = tangleString(
		"a.org",
		{
			"a.org": readText(`${import.meta.dir}/fixtures/a.org`),
			"b.org": readText(`${import.meta.dir}/fixtures/b.org`),
		},
		{
			opts: { comments: false },
		}
	);
	expect(ctx.outputs).toEqual({
		"out/ex02/src/a.clj": "(def version 42)",
		"out/a.org": readText(`${import.meta.dir}/fixtures/out/a.org`),
	});
});
