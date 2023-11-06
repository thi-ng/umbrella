import { expect, test } from "bun:test";
import { DGraph } from "../src/index.js";

let g: DGraph<any>;

const init = () => {
	g = new DGraph();
	g.addDependency([1, 2], [10, 20]);
	g.addDependency([3, 4], [30, 40]);
	g.addDependency([1, 2], [3, 4]);
};

test("depends", () => {
	init();
	expect(g.depends([1, 2], [10, 20])).toBeTrue();
	expect(g.depends([10, 20], [1, 2])).toBeFalse();
});

test("dependent", () => {
	init();
	expect(g.dependent([10, 20], [1, 2])).toBeTrue();
	expect(g.dependent([1, 2], [10, 20])).toBeFalse();
});

test("isLeaf", () => {
	init();
	expect(g.isLeaf([1, 2])).toBeTrue();
	expect(g.isLeaf([10, 20])).toBeFalse();
	expect(g.isLeaf([3, 4])).toBeFalse();
});

test("isRoot", () => {
	init();
	expect(g.isRoot([10, 20])).toBeTrue();
	expect(g.isRoot([30, 40])).toBeTrue();
	expect(g.isRoot([3, 4])).toBeFalse();
});

test("cyclic", () => {
	init();
	expect(() => g.addDependency([10, 20], [1, 2])).toThrow();
	expect(() => g.addDependency([1, 2], [1, 2])).toThrow();
});

test("sort", () => {
	init();
	expect(g.sort()).toEqual([
		[30, 40],
		[3, 4],
		[10, 20],
		[1, 2],
	]);
	g.addDependency([30, 40], [50, 60]);
	expect(g.sort()).toEqual([
		[50, 60],
		[30, 40],
		[3, 4],
		[10, 20],
		[1, 2],
	]);
});

test("iterator", () => {
	init();
	expect([...g]).toEqual([
		[30, 40],
		[3, 4],
		[10, 20],
		[1, 2],
	]);
	expect([...g]).toEqual([
		[30, 40],
		[3, 4],
		[10, 20],
		[1, 2],
	]);
});

test("separate nodes", () => {
	init();
	g = new DGraph();
	g.addNode([1, 2]);
	g.addNode([3, 4]);
	g.addNode([3, 4]);
	expect(g.sort()).toEqual([
		[3, 4],
		[1, 2],
	]);
});
