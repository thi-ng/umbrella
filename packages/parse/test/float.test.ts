import { expect, test } from "bun:test";
import { FLOAT, defContext } from "../src/index.js";

test("float", () => {
	[
		"1",
		"-1",
		"+1",
		"1.",
		"1.01",
		".1",
		"-.1",
		"1.2e3",
		"-1.2e-3",
		".1e+3",
		"-1-",
	].forEach((x) => {
		const ctx = defContext(x);
		expect(FLOAT(ctx)).toBeTrue();
		expect(ctx.scope.children![0].result).toBe(parseFloat(x));
	});
});
