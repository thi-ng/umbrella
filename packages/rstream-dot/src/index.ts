import { Subscription, StreamSync, StreamMerge, Stream } from "@thi.ng/rstream";

export type NodeType =
    "default" |
    "noid" |
    "stream" |
    "streammerge" |
    "streamsync";

export interface Node {
    id: number;
    label: string;
    type: string;
}

export interface WalkState {
    subs: Map<Subscription<any, any>, Node>;
    rels: Node[][];
    id: number;
}

export interface DotOpts {
    font: string;
    fontsize: string;
    text: string;
    color: Record<NodeType, string>;
}

const getNodeType = (sub: Subscription<any, any>) => {
    if (sub instanceof Stream) {
        return "Stream";
    }
    if (sub instanceof StreamSync) {
        return "StreamSync";
    }
    if (sub instanceof StreamMerge) {
        return "StreamMerge";
    }
}

const dotNode = (s: Node, opts: DotOpts) => {
    let res = `s${s.id}[label=`;
    if (s.type) {
        res += `"${s.label}\\n(${s.type})"`;
    } else {
        res += `"${s.label}"`;
    }
    res += ", color=";
    res += (s.type && opts.color[s.type.toLowerCase()]) ||
        (s.label === "<noid>" ?
            opts.color.noid :
            opts.color.default);
    return res + "];"
};

export const walk = (subs: Subscription<any, any>[], state?: WalkState) => {
    state || (state = { id: 0, subs: new Map(), rels: [] });
    for (let sub of subs) {
        if (state.subs.get(sub)) return state;
        const id = state.id;
        const desc = { id, label: sub.id || "<noid>", type: getNodeType(sub) };
        state.subs.set(sub, desc);
        state.id++;
        const children = (<any>sub).subs ||
            ((<any>sub).__owner ?
                [(<any>sub).__owner] :
                undefined);
        if (children) {
            for (let s of children) {
                walk([s], state);
                state.rels.push([desc, state.subs.get(s)]);
            }
        }
    }
    return state;
}

export const toDot = (state: WalkState, opts?: Partial<DotOpts>) => {
    opts = Object.assign({
        font: "Inconsolata",
        fontsize: 11,
        text: "white",
        color: {
            default: "black",
            noid: "gray",
            stream: "blue",
            streammerge: "red",
            streamsync: "red",
        }
    }, opts);
    return [
        "digraph g {",
        `node[fontname=${opts.font},fontsize=${opts.fontsize},style=filled,fontcolor=${opts.text}];`,
        ...[...state.subs.values()].map((n) => dotNode(n, <DotOpts>opts)),
        ...state.rels.map(([a, b]) => `s${a.id} -> s${b.id};`),
        "}"
    ].join("\n");
};