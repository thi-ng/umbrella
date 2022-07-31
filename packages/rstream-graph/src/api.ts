import type { Fn, IObjectOf, NumOrString, Path } from "@thi.ng/api";
import type { ResolveFn } from "@thi.ng/resolve-map";
import type { ISubscription } from "@thi.ng/rstream";
import type { Transducer } from "@thi.ng/transducers";

/**
 * A function which constructs and returns an
 * {@link @thi.ng/rstream#ISubscribable} using given object of inputs
 * and node ID. See `node()` and `node1()`.
 */
export type NodeFactory<T> = (
	src: NodeInputs,
	id: string
) => ISubscription<T, any>;

export type NodeResolver = Fn<ResolveFn, Node>;
export type NodeInputs = IObjectOf<ISubscription<any, any>>;
export type NodeOutputs = IObjectOf<ISubscription<any, any>>;
export type Graph = IObjectOf<Node>;

export interface Node {
	ins: NodeInputs;
	outs: NodeOutputs;
	node: ISubscription<any, any>;
}

/**
 * A dataflow graph spec is simply an object where keys are node names
 * and their values are {@link NodeSpec}s, defining a node's inputs, outputs
 * and the operation to be applied to produce one or more result
 * streams.
 */
export type GraphSpec = IObjectOf<NodeSpec | Node | NodeResolver>;

/**
 * Specification for a single "node" in the dataflow graph. Nodes here
 * are actually just wrappers of streams / subscriptions (or generally
 * any form of {@link @thi.ng/rstream#ISubscribable}), usually with an
 * associated transducer to transform / combine the inputs and produce
 * values for the node's result stream.
 *
 * The `fn` function is responsible to produce such a stream transformer
 * construct. The keys used to specify inputs in the `ins` object are
 * dictated by the actual node `fn` used. Most node functions with
 * multiple inputs will be implemented as
 * {@link @thi.ng/rstream#StreamSync} instances and the
 * input IDs are used to locally rename input streams within the
 * {@link @thi.ng/rstream#StreamSync} container.
 *
 * Alo see {@link initGraph} and {@link nodeFromSpec} (in /src/nodes.ts) for more
 * details how these specs are compiled into stream constructs.
 */
export interface NodeSpec {
	fn: NodeFactory<any>;
	ins: IObjectOf<NodeInputSpec>;
	outs?: IObjectOf<NodeOutputSpec>;
}

/**
 * Specification for a single input, which can be given in different
 * ways:
 *
 * 1) Create a stream for given path in state atom (passed to
 *    {@link initGraph}):
 *
 * ```
 * { path: "nested.src.path" }
 * { path: ["nested", "src", "path"] }
 * ```
 *
 * 2) Reference path to another node's output in the GraphSpec object.
 *    See {@link @thi.ng/resolve-map# | @thi.ng/resolve-map} for details.
 *
 * ```
 * { stream: "/node-id/node" } // main node output
 * { stream: "/node-id/outs/foo" } // specific output
 * ```
 *
 * 3) Reference another node indirectly. The passed in `resolve`
 *    function can be used to lookup other nodes, with the same logic as
 *    above. E.g. the following spec looks up the main output of node
 *    "abc" and adds a transformed subscription, which is then used as
 *    input for current node.
 *
 * ```
 * { stream: (resolve) =>
 *     resolve("/abc/node").subscribe(map(x => x * 10)) }
 * ```
 *
 * 4) Provide an external input stream:
 *
 * ```
 * { stream: () => fromIterable([1,2,3], 500) }
 * ```
 *
 * 5) Single value input stream:
 *
 * ```
 * { const: 1 }
 * { const: () => 1 }
 * ```
 *
 * If the optional `xform` is given, a subscription with the given
 * transducer is added to the input and then used as input instead.
 */
export interface NodeInputSpec {
	id?: string;
	path?: Path;
	stream?: string | Fn<ResolveFn, ISubscription<any, any>>;
	const?: any | Fn<ResolveFn, any>;
	xform?: Transducer<any, any>;
}

export type NodeOutputSpec = Path | NodeOutputFn;

export type NodeOutputFn = (
	node: ISubscription<any, any>,
	id: NumOrString
) => ISubscription<any, any>;
