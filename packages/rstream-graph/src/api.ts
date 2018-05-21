import { IObjectOf } from "@thi.ng/api/api";
import { Path } from "@thi.ng/paths";
import { ISubscribable } from "@thi.ng/rstream/api";
import { Transducer } from "@thi.ng/transducers/api";

export type NodeFactory<T> = (src: IObjectOf<ISubscribable<any>>, id: string) => ISubscribable<T>;

/**
 * A dataflow graph spec is simply an object where keys are node names
 * and their values are either `ISubscribable`s or NodeSpec's, defining
 * inputs and the operation to be applied to produce a result stream.
 */
export type GraphSpec = IObjectOf<ISubscribable<any> | NodeSpec>;

/**
 * Specification for a single "node" in the dataflow graph. Nodes here
 * are actually streams (or just generally any form of @thi.ng/rstream
 * subscription), usually with an associated transducer to transform /
 * combine the inputs and produce values for the node's result stream.
 *
 * The `fn` function is responsible to produce such a stream construct.
 * The keys used to specify inputs in the `ins` object are dictated by
 * the actual node `fn` used. Most node functions with multiple inputs
 * are implemented as `StreamSync` instances and the input IDs are used
 * to locally rename input streams within the `StreamSync` container.
 *
 * See `initGraph` and `nodeFromSpec` for more details (in
 * /src/nodes.ts)
 */
export interface NodeSpec {
    fn: NodeFactory<any>;
    ins: IObjectOf<NodeInput>;
    out?: NodeOutput;
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
 * 2) Reference path to another node in the GraphSpec object. See
 *    `@thi.ng/resolve-map` for details.
 *
 * ```
 * { stream: "/path/to/node-id" } // absolute
 * { stream: "../../path/to/node-id" } // relative
 * { stream: "node-id" } // sibling
 * ```
 *
 * 3) Reference another node indirectly. The passed in `resolve`
 *    function can be used to lookup other nodes, e.g. the following
 *    spec looks up node "src" and adds a transformed subscription,
 *    which is then used as input for current node.
 *
 * ```
 * { stream: (resolve) => resolve("src").subscribe(map(x => x * 10)) }
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
 * If the optional `xform` is given, a subscription with the transducer
 * is added to the input and then used as input instead.
 */
export interface NodeInput {
    id?: string;
    path?: Path;
    stream?: string | ((resolve) => ISubscribable<any>);
    const?: any | ((resolve) => any);
    xform?: Transducer<any, any>;
}

export type NodeOutput = Path | ((node: ISubscribable<any>) => void);
