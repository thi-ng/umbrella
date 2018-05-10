import { IObjectOf } from "@thi.ng/api/api";
import { IAtom } from "@thi.ng/atom/api";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { resolveMap } from "@thi.ng/resolve-map";
import { ISubscribable } from "@thi.ng/rstream/api";
import { fromIterableSync } from "@thi.ng/rstream/from/iterable";
import { fromView } from "@thi.ng/rstream/from/view";
import { StreamSync, sync } from "@thi.ng/rstream/stream-sync";
import { Subscription } from "@thi.ng/rstream/subscription";
import { Transducer } from "@thi.ng/transducers/api";

import { NodeFactory, NodeSpec } from "./api";

/**
 * Dataflow graph initialization function. Takes an object of
 * NodeSpec's, calls `nodeFromSpec` for each and then recursively
 * resolves references via `@thi.ng/resolve-map/resolveMap`. Returns
 * updated graph object (mutates in-place, original specs are replaced
 * by stream constructs).
 *
 * @param state
 * @param nodes
 */
export const initGraph = (state: IAtom<any>, nodes: IObjectOf<NodeSpec>): IObjectOf<ISubscribable<any>> => {
    for (let id in nodes) {
        (<any>nodes)[id] = nodeFromSpec(state, nodes[id], id);
    }
    return resolveMap(nodes);
};

/**
 * Transforms a single NodeSpec into a lookup function for `resolveMap`
 * (which is called from `initGraph`). When that function is called,
 * recursively resolves all specified input streams and calls this
 * spec's `fn` to produce a new stream from these inputs. If the spec
 * includes the optional `out` key, it also executes the provided
 * function, or if the value is a string, adds a subscription to this
 * node's result stream which then updates the provide state atom at the
 * path defined by `out`. Returns an ISubscribable.
 *
 * See `api.ts` for further details and possible spec variations.
 *
 * @param spec
 */
const nodeFromSpec = (state: IAtom<any>, spec: NodeSpec, id: string) => (resolve) => {
    const src: IObjectOf<ISubscribable<any>> = {};
    for (let id in spec.ins) {
        let s;
        const i = spec.ins[id];
        if (i.path) {
            s = fromView(state, i.path);
        } else if (i.stream) {
            s = isString(i.stream) ?
                resolve(i.stream) :
                (<any>i).stream(resolve);
        } else if (i.const) {
            s = fromIterableSync([i.const]);
        } else {
            illegalArgs(`invalid node spec`);
        }
        if (i.xform) {
            s = s.subscribe(i.xform, id);
        }
        src[id] = s;
    }
    const node = spec.fn(src, id);
    if (spec.out) {
        if (isString(spec.out)) {
            ((path) => node.subscribe({ next: (x) => state.resetIn(path, x) }, `out-${id}`))(spec.out);
        } else {
            spec.out(node);
        }
    }
    return node;
};

export const addNode = (graph: IObjectOf<ISubscribable<any>>, state: IAtom<any>, id: string, spec: NodeSpec) =>
    graph[id] = nodeFromSpec(state, spec, id)((nodeID) => graph[nodeID]);

export const removeNode = (graph: IObjectOf<ISubscribable<any>>, id: string) => {
    if (graph[id]) {
        graph[id].unsubscribe();
        delete graph[id];
        return true;
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
export const node1 = (xform: Transducer<any, any>, inputID = "src"): NodeFactory<any> =>
    (src: IObjectOf<ISubscribable<any>>, id: string): Subscription<any, any> => {
        ensureInputs(src, [inputID], id);
        return src[inputID].subscribe(xform, id);
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
