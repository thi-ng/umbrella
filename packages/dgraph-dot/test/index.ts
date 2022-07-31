import { defDGraph } from "@thi.ng/dgraph";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { toDot } from "../src/index.js";

group("dgraph-dot", {
	basic: () => {
		const g = defDGraph([
			["a", "b"],
			["a", "c"],
			["b", "d"],
			["c", "d"],
			["c", "e"],
		]);
		const dot = toDot(g, {
			id: (node) => node,
			attribs: {
				node: {
					style: "filled",
					fillcolor: "black",
					fontcolor: "white",
				},
				edge: {
					arrowsize: 0.75,
				},
			},
		});
		assert.strictEqual(
			dot,
			`digraph g {
node[style="filled", fillcolor="black", fontcolor="white"];
edge[arrowsize="0.75"];
"b"[label="b"];
"c"[label="c"];
"d"[label="d"];
"e"[label="e"];
"a"[label="a"];
"b" -> "d";
"c" -> "d";
"c" -> "e";
"a" -> "b";
"a" -> "c";
}`
		);
	},
});
