import {
    ISubscribable,
    Stream,
    StreamMerge,
    StreamSync,
} from "@thi.ng/rstream";
import type { DotOpts, Node, NodeType, WalkState } from "./api";

export * from "./api";

const getNodeType = (sub: ISubscribable<any>) => {
    if (sub instanceof Stream) {
        return "Stream";
    }
    if (sub instanceof StreamSync) {
        return "StreamSync";
    }
    if (sub instanceof StreamMerge) {
        return "StreamMerge";
    }
};

const dotNode = (s: Node, opts: DotOpts) => {
    let res = `s${s.id}[label="`;
    if (s.type) {
        res += `${s.label}\\n(${s.type})`;
    } else {
        res += `${s.label}`;
    }
    if (s.body !== undefined) {
        res += `\\n${s.body.replace(/"/g, `'`).replace(/\n/g, "\\n")}`;
    }
    res += `", color="`;
    res +=
        (s.type && opts.color[<NodeType>s.type.toLowerCase()]) ||
        (s.label === "<noid>" ? opts.color.noid : opts.color.default);
    return res + `"];`;
};

const dotEdge = (a: Node, b: Node, _: DotOpts) => {
    let res = `s${a.id} -> s${b.id}`;
    if (b.xform) {
        res += `[label="xform"]`;
    }
    return res + ";";
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
            body:
                opts.values && sub.deref
                    ? JSON.stringify(sub.deref())
                    : undefined,
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
    opts = Object.assign(
        {
            dir: "LR",
            font: "Inconsolata",
            fontsize: 11,
            text: "white",
            color: {
                default: "black",
                noid: "gray",
                stream: "blue",
                streammerge: "red",
                streamsync: "red",
            },
        },
        opts
    );
    return [
        "digraph g {",
        `rankdir=${opts.dir};`,
        `node[fontname=${opts.font},fontsize=${opts.fontsize},style=filled,fontcolor=${opts.text}];`,
        `edge[fontname=${opts.font},fontsize=${opts.fontsize}];`,
        ...[...state.subs.values()].map((n) => dotNode(n, <DotOpts>opts)),
        ...state.rels.map((r) => dotEdge(r[0], r[1], <DotOpts>opts)),
        "}",
    ].join("\n");
};
