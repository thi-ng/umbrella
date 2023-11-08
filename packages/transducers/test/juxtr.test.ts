import { expect, test } from "bun:test";
import * as tx from "../src/index.js";

const src = [1, 2, 3, 4];

const early = tx.reducer<number, number>(
	() => 0,
	(acc, x) => (acc + x < 6 ? acc + x : tx.reduced(acc))
);

test("arity-1", () => {
	expect(tx.reduce(tx.juxtR(tx.str("-")), src)).toEqual(["1-2-3-4"]);
	expect(tx.reduce(tx.juxtR(early), src)).toEqual([3]);
	expect(tx.transduce(tx.take(2), tx.juxtR(tx.str("-")), src)).toEqual([
		"1-2",
	]);
});

test("arity-2", () => {
	expect(tx.reduce(tx.juxtR(tx.push(), tx.str("-")), src)).toEqual([
		[1, 2, 3, 4],
		"1-2-3-4",
	]);
	expect(tx.reduce(tx.juxtR(tx.push(), early), src)).toEqual([[1, 2, 3], 3]);
	expect(tx.transduce(tx.take(2), tx.juxtR(early, tx.str("-")), src)).toEqual(
		[3, "1-2"]
	);
});

test("arity-3", () => {
	expect(
		tx.reduce(tx.juxtR(tx.add(), tx.reductions(tx.add()), tx.str("-")), src)
	).toEqual([10, [0, 1, 3, 6, 10], "1-2-3-4"]);
	expect(
		tx.reduce(tx.juxtR(tx.add(), tx.reductions(tx.add()), early), src)
	).toEqual([6, [0, 1, 3, 6], 3]);
	expect(
		tx.transduce(tx.take(2), tx.juxtR(early, tx.push(), tx.str("-")), src)
	).toEqual([3, [1, 2], "1-2"]);
});

test("arity-4", () => {
	expect(
		tx.reduce(
			tx.juxtR(tx.add(), tx.reductions(tx.add()), tx.push(), tx.str("-")),
			src
		)
	).toEqual([10, [0, 1, 3, 6, 10], [1, 2, 3, 4], "1-2-3-4"]);
	expect(
		tx.reduce(
			tx.juxtR(tx.add(), tx.reductions(tx.add()), tx.str("-"), early),
			src
		)
	).toEqual([6, [0, 1, 3, 6], "1-2-3", 3]);
	expect(
		tx.transduce(
			tx.take(2),
			tx.juxtR(early, tx.add(), tx.push(), tx.str("-")),
			src
		)
	).toEqual([3, 3, [1, 2], "1-2"]);
});
