import { fileFixture, fixturePath, group } from "@thi.ng/testament";
import * as assert from "assert";
import { readFileSync } from "fs";
import { tangleFile, tangleString } from "../src/index.js";

group("tangle", {
	md: () => {
		const ctx = tangleFile(fixturePath("main.md"), {
			opts: { comments: false },
		});
		const outs = Object.keys(ctx.outputs);
		assert.strictEqual(outs.length, 3);
		for (let out of [
			"out/ex01/src/bar.ts",
			"out/ex01/src/index.ts",
			"out/main.md",
		]) {
			out = fixturePath(out, true);
			assert.ok(outs.includes(out), `missing output: ${out}`);
			assert.strictEqual(ctx.outputs[out], readFileSync(out, "utf-8"));
		}
	},

	"in-memory": () => {
		const ctx = tangleString(
			"a.org",
			{
				"a.org": fileFixture("a.org"),
				"b.org": fileFixture("b.org"),
			},
			{
				opts: { comments: false },
			}
		);
		assert.deepStrictEqual(ctx.outputs, {
			"out/ex02/src/a.clj": "(def version 42)",
			"out/a.org": fileFixture("out/a.org"),
		});
	},
});
