import { expect, test } from "bun:test";
import {
	donchian,
	momentum,
	movingMaximum,
	movingMinimum,
	roc,
	sma,
} from "../src/index.js";

test("movingMaxium", () => {
	expect([...movingMaximum(3, [1, 3, 1, 1, 4, 1, 1, 2, 5, 6])]).toEqual([
		3, 3, 4, 4, 4, 2, 5, 6,
	]);
});

test("movingMinium", () => {
	expect([...movingMinimum(3, [1, 3, 1, 1, 4, 1, 1, 2, 5, 6])]).toEqual([
		1, 1, 1, 1, 1, 1, 1, 2,
	]);
});

test("donchian", () => {
	expect([...donchian(3, [1, 3, 1, 1, 4, 1, 1, 2, 5, 6])]).toEqual([
		[1, 3],
		[1, 3],
		[1, 4],
		[1, 4],
		[1, 4],
		[1, 2],
		[1, 5],
		[2, 6],
	]);
});

test("momentum", () => {
	expect(() => momentum(0)).toThrow();
	expect([...momentum(4, [1, 2, 3, 4, 5, 6, 7, 8, 9])]).toEqual([
		4, 4, 4, 4, 4,
	]);
});

test("roc", () => {
	expect(() => roc(0)).toThrow();
	expect([...roc(4, [1, 2, 3, 4, 5, 6, 7, 8, 9])]).toEqual([
		4 / 1,
		4 / 2,
		4 / 3,
		4 / 4,
		4 / 5,
	]);
});

test("sma", () => {
	expect(() => sma(0)).toThrow();
	expect([...sma(4, [1, 2, 3, 4, 5, 6, 7, 8, 9])]).toEqual([
		(1 + 2 + 3 + 4) / 4,
		(2 + 3 + 4 + 5) / 4,
		(3 + 4 + 5 + 6) / 4,
		(4 + 5 + 6 + 7) / 4,
		(5 + 6 + 7 + 8) / 4,
		(6 + 7 + 8 + 9) / 4,
	]);
});
