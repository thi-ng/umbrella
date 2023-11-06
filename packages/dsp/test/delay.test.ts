import { expect, test } from "bun:test";
import { delay, feedbackDelay } from "../src/index.js";

test("delay", () => {
	const line = delay(3);
	expect(line.next(1)).toBe(0);
	expect(line.next(2)).toBe(0);
	expect(line.next(3)).toBe(1);
	expect(line.next(4)).toBe(2);
	expect(line.next(5)).toBe(3);
	expect(line.next(6)).toBe(4);
});

test("feedbackDelay", () => {
	const line = feedbackDelay(3, 0.33);
	expect(line.next(1)).toBe(0);
	expect(line.next(2)).toBe(0);
	expect(line.next(3)).toBe(1);
	expect(line.next(4)).toBe(2);
	expect(line.next(5)).toBe(3);
	expect(line.next(6)).toBe(4.33);
	expect(line.next(7)).toBe(5.66);
});
