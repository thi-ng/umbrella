import type { Fn, IObjectOf } from "@thi.ng/api";
import type { DGraph } from "@thi.ng/dgraph";
import { Edge, Graph, GraphAttribs, Node, serializeGraph } from "@thi.ng/dot";

export interface DGraphDotOpts<T> {
	/**
	 * Graph visualization attributes. See
	 * [`GraphAttribs`](https://docs.thi.ng/umbrella/dot/interfaces/GraphAttribs.html)
	 * for details.
	 */
	attribs?: Partial<GraphAttribs>;
	/**
	 * Required mapping function applied to each node in the dependency
	 * graph. Must return a unique ID per node.
	 */
	id: Fn<T, string>;
	/**
	 * Optional label function applied to each node to provide a
	 * potentially more human readable string than that of `id`.
	 * Not used if `spec` option is given.
	 */
	label?: Fn<T, string>;
	/**
	 * Optional function applied to each node to provide an object of
	 * visualization options. See
	 * [`Node`](https://docs.thi.ng/umbrella/dot/interfaces/Node.html) for
	 * details.
	 */
	spec?: Fn<T, Partial<Node>>;
}

/**
 * Takes a [`DGraph`](https://docs.thi.ng/umbrella/dgraph/classes/DGraph.html)
 * and object of visualization & serialization options. Returns Graphviz DOT
 * format serialization of given graph.
 *
 * @param src -
 * @param opts -
 */
export const toDot = <T>(src: DGraph<T>, opts: DGraphDotOpts<T>) => {
	const nodes: IObjectOf<Partial<Node>> = {};
	const edges: Edge[] = [];
	const label = opts.label || opts.id;
	const spec = opts.spec;
	for (let n of src.nodes()) {
		const id = opts.id(n);
		nodes[id] = spec ? spec(n) : { label: label(n) };
		for (let d of src.immediateDependencies(n)) {
			edges.push({ src: id, dest: opts.id(d) });
		}
	}
	const graph: Graph = {
		attribs: opts.attribs,
		directed: true,
		edges,
		nodes,
	};
	return serializeGraph(graph);
};
