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
import { execSync } from "child_process";

// load package.json of all packages and extract key info...
const packages = [
	...map((f: string) => {
		const pkg = readJSON(f);
		return {
			id: pkg.name,
			v: pkg.version,
			deps: pkg.dependencies ? Object.keys(pkg.dependencies) : [],
		};
	}, files("./packages/", "package.json", 2)),
];

// serialize to Graphviz DOT format
const dot = serializeGraph({
	attribs: {
		rankdir: "LR",
		node: {
			fontname: "Menlo",
			fontsize: 9,
			fontcolor: "white",
			color: "#555555",
			style: "filled",
		},
		edge: { arrowsize: 0.66, color: "#aaaaaa" },
	},
	nodes: transduce(
		map((p) => <[string, Node]>[p.id, <Node>{ label: `${p.id}\\n${p.v}` }]),
		assocObj(),
		packages
	),
	edges: [
		...mapcat((p) => p.deps.map((d) => ({ src: p.id, dest: d })), packages),
	],
});

// output and execute
writeText("assets/deps.dot", dot);
execSync("dot -Tsvg -o assets/deps.svg assets/deps.dot");

// alternative textual output from here onwards...

const g = defDGraph<string>(
	mapcat((p) => zip(repeat(p.id), p.deps.length ? p.deps : [null]), packages)
);

const sorted = g.sort();
console.log("topo order:", sorted.map((x) => x.substring(8)).join(" "), "\n\n");

const noprefix = (ids: Iterable<string>) =>
	[...ids].sort().map((x) => x.substring(8));

sorted.forEach((x) => {
	console.log(`${x}:`);
	console.log(`\t<-- ${noprefix(g.transitiveDependencies(x))}`);
	console.log(`\t--> ${noprefix(g.transitiveDependents(x))}\n\n`);
});

console.log(
	"leaves",
	packages.filter((p) => !p.deps.length).map((p) => p.id)
);
