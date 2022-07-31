import type { ISubscribable } from "@thi.ng/rstream";
import { StreamMerge } from "@thi.ng/rstream/merge";
import { Stream } from "@thi.ng/rstream/stream";
import { StreamSync } from "@thi.ng/rstream/sync";
import { truncate } from "@thi.ng/strings/truncate";
import { map } from "@thi.ng/transducers/map";
import type { DotOpts, Node, NodeType, WalkState } from "./api.js";

export * from "./api.js";

const getNodeType = (sub: ISubscribable<any>) =>
	sub instanceof Stream
		? "Stream"
		: sub instanceof StreamSync
		? "StreamSync"
		: sub instanceof StreamMerge
		? "StreamMerge"
		: undefined;

const dotNode = (s: Node, opts: DotOpts) => {
	let res = `s${s.id}[label="`;
	res += s.type ? `${s.label}\\n(${s.type})` : `${s.label}`;
	if (s.body !== undefined) {
		res += `\\n${s.body.replace(/"/g, `'`).replace(/\n/g, "\\n")}`;
	}
	res += `", color="`;
	res +=
		(s.type && opts.color[<NodeType>s.type.toLowerCase()]) ||
		(s.label === "<noid>" ? opts.color.noid : opts.color.default);
	return res + `"];`;
};

const dotEdge = (a: Node, b: Node, _: DotOpts) =>
	`s${a.id} -> s${b.id}${b.xform ? `[label="xform"]` : ""};`;

const subValue = (sub: ISubscribable<any>) => {
	const res = JSON.stringify(sub.deref ? sub.deref() : undefined);
	return res ? truncate(64, "...")(res) : res;
};

export const walk = (
	subs: ISubscribable<any>[],
	opts?: Partial<DotOpts>,
	state?: WalkState
) => {
	opts || (opts = {});
	state || (state = { id: 0, subs: new Map(), rels: [] });
	for (let sub of subs) {
		if (state.subs.get(sub)) return state;
		const id = state.id;
		const desc: Node = {
			id,
			label: sub.id || "<noid>",
			type: getNodeType(sub),
			xform: !!(<any>sub).xform,
			body: opts.values ? subValue(sub) : undefined,
		};
		state.subs.set(sub, desc);
		state.id++;
		const children =
			(<any>sub).subs ||
			((<any>sub).__owner ? [(<any>sub).__owner] : undefined);
		if (children) {
			walk(children, opts, state);
			for (let c of children) {
				const childNode = state.subs.get(c);
				childNode && state.rels.push([desc, childNode]);
			}
		}
	}
	return state;
};

export const toDot = (state: WalkState, opts?: Partial<DotOpts>) => {
	opts = {
		dir: "TB",
		font: "sans-serif",
		fontsize: 10,
		text: "white",
		...opts,
	};
	opts.color = {
		default: "black",
		noid: "gray",
		stream: "blue",
		streammerge: "red",
		streamsync: "red",
		...(opts.color || {}),
	};
	return [
		"digraph g {",
		`rankdir=${opts.dir};`,
		`node[fontname="${opts.font}",fontsize=${opts.fontsize},style=filled,fontcolor=${opts.text}];`,
		`edge[fontname="${opts.font}",fontsize=${opts.fontsize}];`,
		...map((n) => dotNode(n, <DotOpts>opts), state.subs.values()),
		...map((r) => dotEdge(r[0], r[1], <DotOpts>opts), state.rels),
		"}",
	].join("\n");
};
