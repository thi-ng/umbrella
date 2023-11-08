import { beforeEach, expect, test } from "bun:test";
import { arrayZipper, Location } from "../src/index.js";

let src: any[];
let a: Location<number | number[] | (number | number[])[]>;

beforeEach(() => {
	src = [1, [2, [3], 4], 5];
	a = arrayZipper(src);
});

test("isBranch", () => {
	expect(a.isBranch).toBeTrue();
	expect(a.next!.isBranch).toBeFalse();
	expect(a.next!.next!.isBranch).toBeTrue();
});

test("isFirst", () => {
	expect(a.isFirst).toBeTrue();
	expect(a.next!.isFirst).toBeTrue();
	expect(a.next!.next!.isFirst).toBeFalse();
	expect(a.next!.next!.next!.isFirst).toBeTrue();
});

test("isLast", () => {
	expect(a.isLast).toBeTrue();
	expect(a.down!.rightmost.isLast).toBeTrue();
	expect(a.next!.isLast).toBeFalse();
	expect(a.next!.next!.isLast).toBeFalse();
	expect(a.next!.next!.next!.rightmost!.isLast).toBeTrue();
});

test("down", () => {
	expect<any>(a.down!.node).toEqual(1);
	expect<any>(a.down!.down).toEqual(undefined);
	expect<any>(a.down!.right!.down!.right!.down!.node).toEqual(3);
});

test("up", () => {
	expect<any>(a.up).toEqual(undefined);
	expect<any>(a.down!.up).toEqual(a);
	expect<any>(a.down!.next!.down!.up!.up).toEqual(a);
	expect<any>(a.down!.next!.down!.up!.node).toEqual([2, [3], 4]);
});

test("right", () => {
	expect<any>(a.right!).toEqual(undefined);
	expect<any>(a.down!.right!.node).toEqual([2, [3], 4]);
	expect<any>(a.down!.right!.right!.node).toEqual(5);
	expect<any>(a.down!.right!.right!.right).toEqual(undefined);
});

test("left", () => {
	expect<any>(a.left!).toEqual(undefined);
	expect<any>(a.down!.left!).toEqual(undefined);
	expect<any>(a.down!.right!.left!.node).toEqual(1);
	expect<any>(a.down!.right!.right!.left!.node).toEqual([2, [3], 4]);
});

test("next", () => {
	expect<any>(a.next!.node).toEqual(1);
	expect<any>(a.next!.next!.node).toEqual([2, [3], 4]);
	expect<any>(a.next!.next!.next!.node).toEqual(2);
	expect<any>(a.next!.next!.next!.next!.node).toEqual([3]);
	expect<any>(a.next!.next!.next!.next!.next!.node).toEqual(3);
	expect<any>(a.next!.next!.next!.next!.next!.next!.node).toEqual(4);
	expect<any>(a.next!.next!.next!.next!.next!.next!.next!.node).toEqual(5);
	expect<any>(a.next!.next!.next!.next!.next!.next!.next!.next).toEqual(
		undefined
	);
});

test("prev", () => {
	expect<any>(a.prev).toEqual(undefined);
	expect<any>(a.next!.prev!.node).toEqual(src);
	expect<any>(a.next!.next!.prev!.node).toEqual(1);
	expect<any>(a.next!.next!.next!.prev!.node).toEqual([2, [3], 4]);
});

test("rightmost", () => {
	expect<any>(a.rightmost).toEqual(a);
	expect<any>(a.rightmost.node).toEqual(src);
	expect<any>(a.rightmost.next!.node).toEqual(1);
	expect<any>(a.next!.rightmost.node).toEqual(5);
	expect<any>(a.next!.rightmost.next!).toEqual(undefined);
	expect<any>(a.next!.next!.rightmost.node).toEqual(5);
	expect<any>(a.next!.next!.next!.rightmost.node).toEqual(4);
	expect<any>(a.next!.next!.next!.next!.next!.rightmost.node).toEqual(3);
});

test("leftmost", () => {
	expect<any>(a.leftmost).toEqual(a);
	expect<any>(a.leftmost.node).toEqual(src);
	expect<any>(a.leftmost.next!.node).toEqual(1);
	expect<any>(a.next!.rightmost.leftmost.node).toEqual(1);
	expect<any>(a.next!.leftmost.node).toEqual(1);
	expect<any>(a.next!.leftmost.next!.node).toEqual([2, [3], 4]);
	expect<any>(a.next!.next!.leftmost.next!.node).toEqual([2, [3], 4]);
	expect<any>(a.next!.next!.next!.leftmost.next!.node).toEqual([3]);
	expect<any>(a.next!.next!.next!.rightmost.leftmost.node).toEqual(2);
});

test("replace (next)", () => {
	expect<any>(a.replace(10).root).toEqual(10);
	expect<any>(a.next!.replace(10).root).toEqual([10, [2, [3], 4], 5]);
	expect<any>(a.next!.next!.replace(10).root).toEqual([1, 10, 5]);

	expect<any>(a.next!.next!.next!.replace(10).root).toEqual([
		1,
		[10, [3], 4],
		5,
	]);
	expect<any>(a.next!.next!.next!.next!.replace(10).root).toEqual([
		1,
		[2, 10, 4],
		5,
	]);
	expect<any>(a.next!.next!.next!.next!.next!.replace(10).root).toEqual([
		1,
		[2, [10], 4],
		5,
	]);
	expect<any>(a.next!.next!.next!.next!.next!.next!.replace(10).root).toEqual(
		[1, [2, [3], 10], 5]
	);
	expect<any>(
		a.next!.next!.next!.next!.next!.next!.next!.replace(10).root
	).toEqual([1, [2, [3], 4], 10]);
	expect(
		() => a.next!.next!.next!.next!.next!.next!.next!.next!.replace(10).root
	).toThrow();
});

test("insertLeft", () => {
	expect(() => a.insertLeft(10)).toThrow();
	expect<any>(a.next!.insertLeft(10).root).toEqual([10, 1, [2, [3], 4], 5]);
	expect<any>(a.next!.next!.insertLeft(10).root).toEqual([
		1,
		10,
		[2, [3], 4],
		5,
	]);
	expect<any>(a.next!.next!.next!.insertLeft(10).root).toEqual([
		1,
		[10, 2, [3], 4],
		5,
	]);
	expect<any>(a.next!.next!.next!.next!.insertLeft(10).root).toEqual([
		1,
		[2, 10, [3], 4],
		5,
	]);
	expect<any>(a.next!.next!.next!.next!.next!.insertLeft(10).root).toEqual([
		1,
		[2, [10, 3], 4],
		5,
	]);
	expect<any>(
		a.next!.next!.next!.next!.next!.next!.insertLeft(10).root
	).toEqual([1, [2, [3], 10, 4], 5]);
	expect<any>(
		a.next!.next!.next!.next!.next!.next!.next!.insertLeft(10).root
	).toEqual([1, [2, [3], 4], 10, 5]);
});

test("insertRight", () => {
	expect(() => a.insertRight(10)).toThrow();
	expect<any>(a.next!.insertRight(10).root).toEqual([1, 10, [2, [3], 4], 5]);

	expect<any>(a.next!.next!.insertRight(10).root).toEqual([
		1,
		[2, [3], 4],
		10,
		5,
	]);

	expect<any>(a.next!.next!.next!.insertRight(10).root).toEqual([
		1,
		[2, 10, [3], 4],
		5,
	]);

	expect<any>(a.next!.next!.next!.next!.insertRight(10).root).toEqual([
		1,
		[2, [3], 10, 4],
		5,
	]);

	expect<any>(a.next!.next!.next!.next!.next!.insertRight(10).root).toEqual([
		1,
		[2, [3, 10], 4],
		5,
	]);

	expect<any>(
		a.next!.next!.next!.next!.next!.next!.insertRight(10).root
	).toEqual([1, [2, [3], 4, 10], 5]);

	expect<any>(
		a.next!.next!.next!.next!.next!.next!.next!.insertRight(10).root
	).toEqual([1, [2, [3], 4], 5, 10]);
});

test("insertChild", () => {
	expect<any>(a.insertChild(10).root).toEqual([10, 1, [2, [3], 4], 5]);
	expect(() => a.next!.insertChild(10)).toThrow();

	expect<any>(a.next!.next!.insertChild(10).root).toEqual([
		1,
		[10, 2, [3], 4],
		5,
	]);
	expect(() => a.next!.next!.next!.insertChild(10)).toThrow();

	expect<any>(a.next!.next!.next!.next!.insertChild(10).root).toEqual([
		1,
		[2, [10, 3], 4],
		5,
	]);
});

test("appendChild", () => {
	expect<any>(a.appendChild(10).root).toEqual([1, [2, [3], 4], 5, 10]);
	expect(() => a.next!.appendChild(10)).toThrow();

	expect<any>(a.next!.next!.appendChild(10).root).toEqual([
		1,
		[2, [3], 4, 10],
		5,
	]);
	expect(() => a.next!.next!.next!.appendChild(10)).toThrow();

	expect<any>(a.next!.next!.next!.next!.appendChild(10).root).toEqual([
		1,
		[2, [3, 10], 4],
		5,
	]);
});

test("update", () => {
	expect<any>(
		a.next!.next!.next!.update((x, n: number) => <number>x * n, 10).root
	).toEqual([1, [20, [3], 4], 5]);
});
