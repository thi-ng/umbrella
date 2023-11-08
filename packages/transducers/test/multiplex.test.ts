import { expect, test } from "bun:test";
import { iterator, map, mapcat, multiplex, step } from "../src/index.js";
import { identity } from "@thi.ng/api";

test("example", () => {
	expect([
		...iterator(
			multiplex(
				map((x) => x.charAt(0)),
				map((x) => x.toUpperCase()),
				map((x) => x.length)
			),
			["Alice", "Bob", "Charlie"]
		),
	]).toEqual([
		["A", "ALICE", 5],
		["B", "BOB", 3],
		["C", "CHARLIE", 7],
	]);
});

test("unwrap", () => {
	expect<any>([
		...iterator(multiplex(mapcat(identity), map(identity)), [[1, 2], [3]]),
	]).toEqual([
		[
			[1, 2],
			[1, 2],
		],
		[3, [3]],
	]);
	expect(step<number[], number>(mapcat((x) => x))([1, 2])).toEqual([1, 2]);
	expect(step<number[], number>(mapcat((x) => x))([3])).toEqual(3);
});

test("no unwrap", () => {
	expect<any>([
		...iterator(multiplex([mapcat(identity), false], map(identity)), [
			[1, 2],
			[3],
		]),
	]).toEqual([
		[
			[1, 2],
			[1, 2],
		],
		[[3], [3]],
	]);
	expect(
		step<number[], number>(
			mapcat((x) => x),
			false
		)([1, 2])
	).toEqual([1, 2]);
	expect(
		step<number[], number>(
			mapcat((x) => x),
			false
		)([3])
	).toEqual([3]);
});
