import { defDGraph } from "@thi.ng/dgraph";
import { serializeGraph, type Node } from "@thi.ng/dot";
import { files, readJSON, writeText } from "@thi.ng/file-io";
import {
	assocObj,
	map,
	mapcat,
	repeat,
	transduce,
	zip,
} from "@thi.ng/transducers";
import { execFileSync } from "node:child_process";

// load package.json of all packages in monorepo and extract key details...
const packages = [...map(readJSON, files("packages", "package.json", 2))];

// transform & serialize to Graphviz DOT format
const dot = serializeGraph({
	attribs: {
		rankdir: "LR",
		overlap: "scale",
		node: {
			style: "filled",
			color: "black",
			fontcolor: "white",
			fontsize: 9,
		},
	},
	nodes: transduce(
		map(
			({ name, version }) =>
				<[string, Node]>[name, { label: `${name}\\n${version}` }]
		),
		assocObj(),
		packages
	),
	edges: [
		...mapcat(
			(p) =>
				Object.keys(p.dependencies || {}).map((d) => ({
					src: p.name,
					dest: d,
				})),
			packages
		),
	],
});

// output and execute
writeText("assets/deps.dot", dot);
execFileSync("neato", ["-Tsvg", "-o", "assets/deps.svg", "assets/deps.dot"]);

// alternative textual output from here onwards...

const g = defDGraph<string>(
	mapcat(
		(p) =>
			zip(
				repeat(p.name),
				p.dependies ? Object.keys(p.dependencies) : [null]
			),
		packages
	)
);

const sorted = g.sort();
console.log("topo order:", sorted.map((x) => x.substring(8)).join(" "), "\n\n");

const noprefix = (names: Iterable<string>) =>
	[...names].sort().map((x) => x.substring(8));

sorted.forEach((x) => {
	console.log(`${x}:`);
	console.log(`\t<-- ${noprefix(g.transitiveDependencies(x))}`);
	console.log(`\t--> ${noprefix(g.transitiveDependents(x))}\n\n`);
});

console.log(
	"leaves",
	packages.filter((p) => !p.dependencies).map((p) => p.name)
);
