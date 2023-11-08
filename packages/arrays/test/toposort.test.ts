import { expect, test } from "bun:test";
import { topoSort } from "../src/index.js";

const graph: Record<string, { deps?: string[] }> = {
	a: { deps: ["c", "b"] },
	b: {},
	c: { deps: ["d"] },
	d: { deps: ["b"] },
};

test("topoSort dag", () =>
	expect(topoSort(graph, (x) => x.deps)).toEqual(["b", "d", "c", "a"]));

test("topoSort cycle detection", () =>
	expect(() =>
		topoSort({ ...graph, d: { deps: ["b", "a"] } }, (x) => x.deps)
	).toThrow());
