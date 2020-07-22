import type { IObjectOf } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { Edge, GraphAttribs, Node, serializeGraph } from "@thi.ng/dot";
import type { Nodes } from "./api";
import { isRef } from "./utils";
import { slugify } from "@thi.ng/strings";

export interface GraphvizOpts {
    onlyRefs: boolean;
    ignore: Iterable<string>;
    attribs: Partial<GraphAttribs>;
}

export const toDot = (graph: Nodes, opts: Partial<GraphvizOpts>) => {
    opts = { onlyRefs: true, ...opts };
    const nodes: IObjectOf<Partial<Node>> = {};
    const edges: Edge[] = [];
    const ignore = new Set(opts.ignore);

    const addEdge = (src: string, prop: string, val: any) => {
        if (isRef(val)) {
            edges.push({ src, dest: val.$ref, label: prop });
        } else if (val.$id) {
            edges.push({ src, dest: val.$id, label: prop });
        } else if (!opts.onlyRefs) {
            const id = `lit-${slugify(String(val))}`;
            nodes[id] = { label: String(val).replace(/\n/g, "\\n") };
            edges.push({ src, dest: id, label: prop });
        }
    };

    Object.entries(graph).forEach(([id, node]) => {
        nodes[id] = { label: node.name || node.$id };
        Object.entries(node).forEach(([prop, val]) => {
            if (ignore.has(prop)) return;
            if (isArray(val)) {
                val.forEach((v) => addEdge(id, prop, v));
            } else {
                addEdge(id, prop, val);
            }
        });
    });

    return serializeGraph({
        attribs: opts.attribs,
        nodes,
        edges,
    });
};
