import { IObjectOf } from "@thi.ng/api/api";
import { Path } from "@thi.ng/paths";
import { ISubscribable } from "@thi.ng/rstream/api";
import { Transducer } from "@thi.ng/transducers/api";

/**
 * A function which constructs and returns an `ISubscribable` using
 * given object of inputs and node ID. See `node()` and `node1()`.
 */
export type NodeFactory<T> = (src: NodeInputs, id: string) => ISubscribable<T>;

export type NodeInputs = IObjectOf<ISubscribable<any>>;
export type NodeOutputs = IObjectOf<ISubscribable<any>>;
export type Graph = IObjectOf<Node>;

export interface Node {
    ins: NodeInputs;
    outs: NodeOutputs;
    node: ISubscribable<any>;
}

/**
 * A dataflow graph spec is simply an object where keys are node names
 * and their values are `NodeSpec`s, defining a node's inputs, outputs
 * and the operation to be applied to produce one or more result
 * streams.
 */
export type GraphSpec = IObjectOf<
    NodeSpec |
    Node |
    ((resolve: (path: string) => any) => Node)>;

/**
 * Specification for a single "node" in the dataflow graph. Nodes here
 * are actually just wrappers of streams / subscriptions (or generally
 * any form of thi.ng/rstream `ISubscribable`), usually with an
 * associated transducer to transform / combine the inputs and produce
 * values for the node's result stream.
 *
 * The `fn` function is responsible to produce such a stream transformer
 * construct. The keys used to specify inputs in the `ins` object are
 * dictated by the actual node `fn` used. Most node functions with
 * multiple inputs will be implemented as `StreamSync` instances and the
 * input IDs are used to locally rename input streams within the
 * `StreamSync` container.
 *
 * Alo see `initGraph` and `nodeFromSpec` (in /src/nodes.ts) for more
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
 *    `initGraph`):
 *
 * ```
 * { path: "nested.src.path" }
 * { path: ["nested", "src", "path"] }
 * ```
 *
 * 2) Reference path to another node's output in the GraphSpec object.
 *    See `@thi.ng/resolve-map` for details.
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
    stream?: string | ((resolve) => ISubscribable<any>);
    const?: any | ((resolve) => any);
    xform?: Transducer<any, any>;
}

export type NodeOutputSpec = Path | NodeOutputFn;

export type NodeOutputFn = (node: ISubscribable<any>, id: PropertyKey) => ISubscribable<any>;
