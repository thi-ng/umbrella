import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { topoSort } from "../src/index.js";

const graph: Record<string, { deps?: string[] }> = {
	a: { deps: ["c", "b"] },
	b: {},
	c: { deps: ["d"] },
	d: { deps: ["b"] },
};

group("topoSort", {
	dag: () => {
		assert.deepStrictEqual(
			topoSort(graph, (x) => x.deps),
			["b", "d", "c", "a"]
		);
	},
	"cycle detection": () => {
		assert.throws(() =>
			topoSort({ ...graph, d: { deps: ["b", "a"] } }, (x) => x.deps)
		);
	},
});
