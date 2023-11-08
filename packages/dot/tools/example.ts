import * as fs from "fs";
import * as dot from "../src/index.js";

// node type style presets
const terminal: Partial<dot.Node> = {
	color: "black",
	fontcolor: "white",
};

// operator nodes use "Mrecord" shape
// with input and output port declarations
const operator: Partial<dot.Node> = {
	fillcolor: "yellow",
	shape: "Mrecord",
	ins: { 0: "a", 1: "b" },
	outs: { out: "out" },
};

try {
	fs.mkdirSync("export");
} catch (e) {}

fs.writeFileSync(
	"export/dot-example.dot",
	dot.serializeGraph({
		directed: true, // default
		// graph attributes
		attribs: {
			rankdir: "LR",
			fontname: "Inconsolata",
			fontsize: 9,
			fontcolor: "gray",
			label: "Generated with @thi.ng/dot",
			labeljust: "l",
			labelloc: "b",
			// node defaults
			node: {
				style: "filled",
				fontname: "Inconsolata",
				fontsize: 11,
			},
			// edge defaults
			edge: {
				arrowsize: 0.75,
				fontname: "Inconsolata",
				fontsize: 9,
			},
		},
		// graph nodes (the keys are used as node IDs)
		// use spread operator to inject style presets
		nodes: {
			x: { ...terminal, label: "x (12)" },
			y: { ...terminal, label: "y (23)" },
			res: { ...terminal, label: "res (8050)", peripheries: 2 },
			op1: { ...operator, fillcolor: "green", label: "op1\n(+)" },
			op2: { ...operator, label: "op2\n(*)" },
		},
		// graph edges (w/ optional ports & extra attribs)
		edges: [
			{ src: "x", dest: "op1", destPort: 1 },
			{ src: "y", dest: "op1", destPort: 0 },
			{
				src: "y",
				dest: "op2",
				destPort: 0,
				label: "xform",
				color: "blue",
			},
			{ src: "op1", srcPort: "out", dest: "op2", destPort: 1 },
			{ src: "op2", srcPort: "out", dest: "res" },
		],
	})
);
