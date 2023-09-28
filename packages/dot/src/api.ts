import type { IObjectOf } from "@thi.ng/api";

export type NodeShape =
	| "box"
	| "circle"
	| "diamond"
	| "doublecircle"
	| "doubleoctagon"
	| "egg"
	| "ellipse"
	| "hexagon"
	| "house"
	| "invhouse"
	| "invtrapezium"
	| "invtriangle"
	| "Mcircle"
	| "Mdiamond"
	| "Mrecord"
	| "Msquare"
	| "none"
	| "octagon"
	| "parallelogram"
	| "plaintext"
	| "point"
	| "polygon"
	| "record"
	| "trapezium"
	| "triangle"
	| "triple_octagon";

export type Color = string | number[];

export interface GraphAttribs {
	bgcolor: Color;
	clusterrank: "global" | "local" | "none";
	color: Color;
	compound: boolean;
	concentrate: boolean;
	dpi: number;
	edge: Partial<EdgeAttribs>;
	fillcolor: Color;
	fontcolor: Color;
	fontname: string;
	fontsize: number;
	label: string;
	labeljust: "l" | "r" | "c";
	labelloc: "t" | "b";
	landscape: boolean;
	margin: number;
	node: Partial<NodeAttribs>;
	nodesep: number;
	orientation: "portrait" | "landscape";
	rank: "same" | "min" | "max" | "source" | "sink";
	rankdir: "LR" | "RL" | "TB" | "BT";
	ranksep: number;
	ratio: string;
	[id: string]: any;
}

export interface Graph {
	attribs?: Partial<GraphAttribs>;
	directed?: boolean;
	edges: Edge[];
	id?: string;
	nodes: IObjectOf<Partial<Node>>;
	sub?: Graph[];
	include?: string;
}

export interface NodeAttribs {
	color: Color;
	fillcolor: Color;
	fontcolor: Color;
	fontname: string;
	fontsize: number;
	penwidth: number;
	peripheries: number;
	shape: NodeShape;
	sides: number;
	skew: number;
	style: string;
	[id: string]: any;
}

export interface Node extends NodeAttribs {
	ins: IObjectOf<string>;
	outs: IObjectOf<string>;
	label: string;
	tooltip: string;
	target: string;
	url: string;
}

export interface EdgeAttribs {
	color: Color;
	fontcolor: Color;
	fontname: string;
	fontsize: number;
	label: string;
	style: string;
	[id: string]: any;
}

export interface Edge extends Partial<EdgeAttribs> {
	src: PropertyKey;
	dest: PropertyKey;
	srcPort?: PropertyKey;
	destPort?: PropertyKey;
}
