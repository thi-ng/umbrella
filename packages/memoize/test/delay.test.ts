import { expect, test } from "bun:test";
import { delay } from "../src/index.js";

test("only executes once", () => {
	let num = 0;
	const a = delay(() => ++num);
	expect(a.isRealized()).toBeFalse();
	expect(a.deref()).toBe(1);
	expect(a.deref()).toBe(1);
	expect(a.isRealized()).toBeTrue();
});
