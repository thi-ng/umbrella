import type { ISubscribable } from "@thi.ng/rstream";

export interface IToDot {
	toDot(opts?: Partial<DotOpts>): string;
}

export type NodeType =
	| "default"
	| "noid"
	| "stream"
	| "streammerge"
	| "streamsync";

export interface Node {
	id: number;
	label: string;
	type?: string;
	xform?: boolean;
	body?: string;
}

export interface TraversalState {
	subs: Map<ISubscribable<any>, Node>;
	rels: Node[][];
	id: number;
}

export interface DotOpts {
	values: boolean;
	dir: string;
	font: string;
	fontsize: string | number;
	text: string;
	color: Partial<Record<NodeType, string>>;
}
