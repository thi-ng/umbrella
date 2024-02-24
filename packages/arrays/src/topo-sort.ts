import type { Fn, Nullable, IObjectOf } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors";

/**
 * Takes an object describing a DAG of nodes of type T with keys being node IDs.
 * Also takes a function which will be applied to each node and either returns
 * an array of node IDs the given node depends on or null if the node has no
 * dependencies. Traverses all nodes in the graph (object) and returns an array
 * of node IDs in topological dependency order.
 *
 * @remarks
 * An error will be thrown if the graph contains cycles. In this case, the full
 * cycle will be part of the error message (see second example below).
 *
 * @example
 * ```ts
 * import { topoSort } from "@thi.ng/arrays";
 *
 * const graph = {
 *   a: { deps: ["c", "b"] },
 *   b: {},
 *   c: { deps: ["d"] },
 *   d: { deps: ["b"] }
 * };
 * topoSort(graph, (node) => node.deps);
 * // [ "b", "d", "c", "a" ]
 *
 * // An error will be thrown if the graph contains cycles...
 * graph.d.deps.push("a");
 *
 * topoSort(graph, (node) => node.deps);
 * // Uncaught Error: illegal state: dependency cycle: a -> c -> d -> a
 * ```
 *
 * @param nodes
 * @param deps
 * @returns
 */
export const topoSort = <T>(
	nodes: IObjectOf<T>,
	deps: Fn<T, Nullable<string[]>>
) => {
	const cycles: IObjectOf<boolean> = {};
	const topology: string[] = [];
	const sort = (id: string, path: string[]) => {
		if (cycles[id]) illegalState(`dependency cycle: ${path.join(" -> ")}`);
		cycles[id] = true;
		const nodeDeps = deps(nodes[id]);
		if (nodeDeps) {
			for (let d of nodeDeps) sort(d, [...path, d]);
		}
		cycles[id] = false;
		if (!topology.includes(id)) topology.push(id);
	};
	for (let id in nodes) sort(id, [id]);
	return topology;
};
