import type { Fn2, IObjectOf } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { Edge, GraphAttribs, serializeGraph } from "@thi.ng/dot";
import { slugify } from "@thi.ng/strings/slugify";
import type { Node, Nodes } from "./api";
import { isRef } from "./utils";

export interface GraphvizOpts {
    /**
     * Predicate function called for each property of each node. If the function
     * returns false, no edge will be created for that property.
     */
    filter: Fn2<string, Node, boolean>;
    attribs: Partial<GraphAttribs>;
}

export const toDot = (graph: Nodes, opts: Partial<GraphvizOpts>) => {
    const nodes: IObjectOf<Partial<Node>> = {};
    const edges: Edge[] = [];
    const filter = opts.filter || (() => true);

    const addEdge = (src: string, prop: string, val: any) => {
        if (isRef(val)) {
            edges.push({ src, dest: val.$ref, label: prop });
        } else if (val.$id) {
            edges.push({ src, dest: val.$id, label: prop });
        } else {
            // FIXME hash string
            const id = `lit-${slugify(String(val))}`;
            nodes[id] = { label: String(val).replace(/\n/g, "\\n") };
            edges.push({ src, dest: id, label: prop });
        }
    };

    Object.entries(graph).forEach(([id, node]) => {
        nodes[id] = { label: node.name || node.$id };
        Object.entries(node).forEach(([prop, val]) => {
            if (!filter(prop, node)) return;
            isArray(val)
                ? val.forEach((v) => addEdge(id, prop, v))
                : addEdge(id, prop, val);
        });
    });

    return serializeGraph({
        attribs: opts.attribs,
        nodes,
        edges,
    });
};
