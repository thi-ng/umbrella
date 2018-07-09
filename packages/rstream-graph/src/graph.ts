import { IObjectOf } from "@thi.ng/api/api";
import { IAtom } from "@thi.ng/atom/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { getIn } from "@thi.ng/paths";
import { absPath, resolve } from "@thi.ng/resolve-map";
import { ISubscribable } from "@thi.ng/rstream/api";
import { fromIterableSync } from "@thi.ng/rstream/from/iterable";
import { fromView } from "@thi.ng/rstream/from/view";
import { StreamSync, sync } from "@thi.ng/rstream/stream-sync";
import { Transducer } from "@thi.ng/transducers/api";
import { map } from "@thi.ng/transducers/xform/map";

import {
    Graph,
    GraphSpec,
    Node,
    NodeFactory,
    NodeInputs,
    NodeInputSpec,
    NodeOutputs,
    NodeOutputSpec,
    NodeSpec
} from "./api";

/**
 * Dataflow graph initialization function. Takes a state Atom (or `null`
 * if not needed) and an object of `NodeSpec` values or functions
 * returning `Node` objects. Calls `nodeFromSpec` for each spec and then
 * recursively resolves references via thi.ng/resolve-map `resolve`.
 * Returns new initialized graph object of `Node` objects and
 * `@thi.ng/rstream` stream constructs. Does NOT mutate original
 * `GraphSpec` object.
 *
 * @param state
 * @param spec
 */
export const initGraph = (state: IAtom<any>, spec: GraphSpec): Graph => {
    const res: Graph = {}
    for (let id in spec) {
        const n = spec[id];
        if (isNodeSpec(n)) {
            res[id] = <any>nodeFromSpec(state, <NodeSpec>spec[id], id);
        } else {
            res[id] = <any>n;
        }
    }
    return resolve(res);
};

const isNodeSpec = (x: any): x is NodeSpec =>
    isPlainObject(x) && isFunction((<any>x).fn);

/**
 * Transforms a single `NodeSpec` into a lookup function for `resolve`
 * (which is called from `initGraph`). When that function is called,
 * recursively resolves all specified input streams and calls this
 * spec's `fn` to produce a new stream from these inputs.
 *
 * If the spec includes the optional `outs` keys, it also creates the
 * subscriptions for each of the given output keys, which then can be
 * used as inputs by other nodes. Each value in the `outs` subspec can
 * be a function or state path (string/number/array, see thi.ng/paths).
 * Functions are called with this node's constructed stream/subscribable
 * and the output id and must return a new `ISubscribable`. For path
 * values a subscription is added to this node's result stream which
 * then updates the provided state atom at the path given.
 *
 * Non-function output specs subs assume the raw node output value is an
 * object from which the different output keys are being extracted. The
 * special `*` output key can be used to handle the entire node output
 * value. This is useful/required for non-object node result values.
 *
 * ```
 * out: {
 *   // fn output spec
 *   // creates new sub which uses `pick` transducer to
 *   // select key `a` from main node output (assumed to be object)
 *   a: (node, id) => node.subscribe({}, pick(id)),
 *
 *   // yields sub of `b` key's values extracted from main output
 *   // and also stores them at given path in state atom
 *   b: "foo.b"
 *
 *   // yields sub with same value as main node output and
 *   // stores vals in state atom at given path
 *   "*": "foo.main"
 * }
 * ```
 *
 * See `api.ts` for further details and possible spec variations.
 *
 * @param state
 * @param spec
 * @param id
 */
const nodeFromSpec = (state: IAtom<any>, spec: NodeSpec, id: string) =>
    (resolve) => {
        const ins = prepareNodeInputs(spec.ins, state, resolve);
        const node = spec.fn(ins, id);
        const outs = prepareNodeOutputs(spec.outs, node, state, id);
        return { ins, node, outs };
    };

const prepareNodeInputs = (ins: IObjectOf<NodeInputSpec>, state: IAtom<any>, resolve: (x: string) => any) => {
    const res: NodeInputs = {};
    if (!ins) return res;
    for (let id in ins) {
        let s;
        const i = ins[id];
        if (i.path) {
            s = fromView(state, i.path);
        }
        else if (i.stream) {
            s = isString(i.stream) ? resolve(i.stream) : i.stream(resolve);
        }
        else if (i.const) {
            s = fromIterableSync([isFunction(i.const) ? i.const(resolve) : i.const], false);
        }
        else {
            illegalArgs(`invalid node input: ${id}`);
        }
        if (i.xform) {
            s = s.subscribe(i.xform, id);
        }
        res[id] = s;
    }
    return res;
}

const prepareNodeOutputs = (outs: IObjectOf<NodeOutputSpec>, node: ISubscribable<any>, state: IAtom<any>, nodeID: string) => {
    const res: NodeOutputs = {};
    if (!outs) return res;
    for (let id in outs) {
        const o = outs[id];
        if (isFunction(o)) {
            res[id] = o(node, id);
        } else if (id == "*") {
            res[id] = ((path) => node.subscribe({
                next: (x) => state.resetIn(path, x)
            }, `out-${nodeID}`))(o);
        } else {
            res[id] = ((path, id) => node.subscribe(
                {
                    next: (x) => state.resetIn(path, x)
                },
                map((x) => x != null ? x[id] : x),
                `out-${nodeID}-${id}`)
            )(o, id);
        }
    }
    return res;
};

/**
 * Compiles given `NodeSpec` and adds it to graph. Returns compiled
 * `Node` object for the given spec. Throws error if the graph already
 * contains a node with given `id`.
 *
 * @param graph
 * @param state
 * @param id
 * @param spec
 */
export const addNode = (graph: Graph, state: IAtom<any>, id: string, spec: NodeSpec): Node => {
    if (graph[id]) {
        illegalArgs(`graph already contains a node with ID: ${id}`);
    }
    return graph[id] = nodeFromSpec(state, spec, id)(
        (path) => getIn(graph, absPath([id], path))
    );
};

/**
 * Calls `.unsubscribe()` on given node and all of its outputs, then
 * removes it from graph. Returns `false` if no node exists for given
 * `id`.
 *
 * @param graph
 * @param id
 */
export const removeNode = (graph: Graph, id: string) => {
    const node = graph[id];
    if (node) {
        node.node.unsubscribe();
        for (let id in node.outs) {
            node.outs[id].unsubscribe();
        }
        delete graph[id];
        return true;
    }
    return false;
};

/**
 * Calls `.unsubscribe()` on all nodes in the graph, causing all related
 * streams & subscriptions to terminate.
 *
 * @param graph
 */
export const stop = (graph: Graph) => {
    for (let id in graph) {
        graph[id].node.unsubscribe();
    }
};

/**
 * Higher order node / stream creator. Takes a transducer and (optional)
 * required input stream IDs. The returned function takes an object of
 * input streams and returns a new `StreamSync` instance. The returned
 * function will throw an error if `inputIDs` is given and the object of
 * inputs does not contain all of them.
 *
 * @param xform
 * @param inputIDs
 */
export const node = (xform: Transducer<IObjectOf<any>, any>, inputIDs?: string[]): NodeFactory<any> =>
    (src: IObjectOf<ISubscribable<any>>, id: string): StreamSync<any, any> => {
        ensureInputs(src, inputIDs, id);
        return sync({ src, xform, reset: false, id });
    };

/**
 * Similar to `node()`, but optimized for nodes using only a single
 * input. Uses "src" as default input ID.
 *
 * @param xform
 * @param inputID
 */
export const node1 = (xform?: Transducer<any, any>, inputID = "src"): NodeFactory<any> =>
    (src: IObjectOf<ISubscribable<any>>, id: string): ISubscribable<any> => {
        ensureInputs(src, [inputID], id);
        return xform ?
            src[inputID].subscribe(xform, id) :
            src[inputID].subscribe(null, id);
    };

/**
 * Helper function to verify given object of inputs has required input IDs.
 * Throws error if validation fails.
 *
 * @param src
 * @param inputIDs
 * @param nodeID
 */
export const ensureInputs = (src: IObjectOf<ISubscribable<any>>, inputIDs: string[], nodeID: string) => {
    if (inputIDs !== undefined) {
        const missing: string[] = [];
        for (let i of inputIDs) {
            !src[i] && missing.push(i);
        }
        if (missing.length) {
            illegalArgs(`node "${nodeID}": missing input(s): ${missing.join(", ")}`);
        }
    }
};
