import type { IObjectOf, Path, Tuple } from "@thi.ng/api";
import type { IAtom } from "@thi.ng/atom";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { getInUnsafe } from "@thi.ng/paths/get-in";
import { absPath, resolve, ResolveFn } from "@thi.ng/resolve-map";
import { CloseMode, ISubscription } from "@thi.ng/rstream/api";
import { fromIterableSync } from "@thi.ng/rstream/iterable";
import { StreamSync, sync } from "@thi.ng/rstream/sync";
import { fromViewUnsafe } from "@thi.ng/rstream/view";
import type { Transducer } from "@thi.ng/transducers";
import { map } from "@thi.ng/transducers/map";
import type {
	Graph,
	GraphSpec,
	Node,
	NodeFactory,
	NodeInputs,
	NodeInputSpec,
	NodeOutputs,
	NodeOutputSpec,
	NodeResolver,
	NodeSpec,
} from "./api.js";

/**
 * Dataflow graph initialization function. Takes a state Atom (or `null` if not
 * needed) and an object of {@link NodeSpec} values or functions returning
 * {@link Node} objects. Calls `nodeFromSpec()` for each spec and then
 * recursively resolves references via
 * [`resolve()`](https://docs.thi.ng/umbrella/resolve-map/functions/resolve.html).
 * Returns new initialized graph object of {@link Node} objects and
 * [`thi.ng/rstream`](https://thi.ng/rstream) stream constructs. Does NOT mutate
 * original {@link GraphSpec} object.
 *
 * @param state -
 * @param spec -
 */
export const initGraph = (state: IAtom<any>, spec: GraphSpec): Graph => {
	const res: IObjectOf<Node | NodeResolver> = {};
	for (let id in spec) {
		const n = spec[id];
		res[id] = isNodeSpec(n) ? nodeFromSpec(state, n, id) : n;
	}
	return resolve(res);
};

/** @internal */
const isNodeSpec = (x: any): x is NodeSpec =>
	isPlainObject(x) && isFunction(x.fn);

/**
 * Transforms a single {@link NodeSpec} into a lookup function for
 * {@link resolve} (which is called from {@link initGraph}). When that function
 * is called, recursively resolves all specified input streams and calls this
 * spec's `fn` to produce a new stream from these inputs.
 *
 * If the spec includes the optional `outs` keys, it also creates the
 * subscriptions for each of the given output keys, which then can be used as
 * inputs by other nodes. Each value in the `outs` subspec can be a function or
 * state path (string/number/array, see [`thi.ng/paths`](https://thi.ng/paths)).
 * Functions are called with this node's constructed stream/subscribable and the
 * output id and must return a new
 * [`ISubscribable`](https://docs.thi.ng/umbrella/rstream/interfaces/ISubscribable.html).
 * For path values a subscription is added to this node's result stream which
 * then updates the provided state atom at the path given.
 *
 * Non-function output specs subs assume the raw node output value is an object
 * from which the different output keys are being extracted. The special `*`
 * output key can be used to handle the entire node output value. This is
 * useful/required for non-object node result values.
 *
 * @example
 * ```ts
 * out: {
 *   // fn output spec
 *   // creates new sub which uses {@link pick} transducer to
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
 * @param state -
 * @param spec -
 * @param id -
 */
const nodeFromSpec =
	(state: IAtom<any>, spec: NodeSpec, id: string) =>
	(resolve: ResolveFn): Node => {
		const ins = prepareNodeInputs(spec.ins, state, resolve);
		const node = spec.fn(ins, id);
		const outs = prepareNodeOutputs(spec.outs, node, state, id);
		return { ins, node, outs };
	};

const prepareNodeInputs = (
	ins: IObjectOf<NodeInputSpec>,
	state: IAtom<any>,
	resolve: ResolveFn
) => {
	const res: NodeInputs = {};
	if (!ins) return res;
	for (let id in ins) {
		const i = ins[id];
		const src = getNodeInput(i, id, state, resolve);
		res[id] = i.xform ? src.transform(i.xform, { id }) : src;
	}
	return res;
};

const getNodeInput = (
	i: NodeInputSpec,
	id: string,
	state: IAtom<any>,
	resolve: ResolveFn
): ISubscription<any, any> =>
	i.path
		? fromViewUnsafe(state, { path: i.path })
		: i.stream
		? isString(i.stream)
			? resolve(i.stream)
			: i.stream(resolve)
		: i.const !== undefined
		? fromIterableSync([isFunction(i.const) ? i.const(resolve) : i.const], {
				closeIn: CloseMode.NEVER,
		  })
		: illegalArgs(`invalid node input: ${id}`);

const prepareNodeOutputs = (
	outs: IObjectOf<NodeOutputSpec> | undefined,
	node: ISubscription<any, any>,
	state: IAtom<any>,
	nodeID: string
) => {
	const res: NodeOutputs = {};
	if (!outs) return res;
	for (let id in outs) {
		const out = outs[id];
		res[id] = isFunction(out)
			? out(node, id)
			: id == "*"
			? nodeOutAll(node, state, nodeID, out)
			: nodeOutID(node, state, nodeID, out, id);
	}
	return res;
};

const nodeOutAll = (
	node: ISubscription<any, any>,
	state: IAtom<any>,
	nodeID: string,
	path: Path
) =>
	node.subscribe(
		{
			next: (x) => state.resetIn(<any>path, x),
		},
		{ id: `out-${nodeID}` }
	);

const nodeOutID = (
	node: ISubscription<any, any>,
	state: IAtom<any>,
	nodeID: string,
	path: Path,
	id: string
) =>
	node.subscribe(
		{
			next: (x) => state.resetIn(<any>path, x),
		},
		{
			xform: map((x: any) => (x != null ? x[id] : x)),
			id: `out-${nodeID}-${id}`,
		}
	);

/**
 * Compiles given {@link NodeSpec} and adds it to graph. Returns compiled
 * {@link Node} object for the given spec. Throws error if the graph already
 * contains a node with given `id`.
 *
 * @param graph -
 * @param state -
 * @param id -
 * @param spec -
 */
export const addNode = (
	graph: Graph,
	state: IAtom<any>,
	id: string,
	spec: NodeSpec
): Node => {
	graph[id] && illegalArgs(`graph already contains a node with ID: ${id}`);
	return (graph[id] = nodeFromSpec(
		state,
		spec,
		id
	)((path) => getInUnsafe(graph, absPath([id], path))));
};

/**
 * Calls `.unsubscribe()` on given node and all of its outputs, then
 * removes it from graph. Returns `false` if no node exists for given
 * `id`.
 *
 * @param graph -
 * @param id -
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
 * @param graph -
 */
export const stop = (graph: Graph) => {
	for (let id in graph) {
		graph[id].node.unsubscribe();
	}
};

/**
 * Higher order node / stream creator. Takes a transducer and (optional)
 * required input stream IDs. The returned function takes an object of input
 * streams and returns a new
 * [`StreamSync`](https://docs.thi.ng/umbrella/rstream/classes/StreamSync.html)
 * instance. The returned function will throw an error if `inputIDs` is given
 * and the object of inputs does not contain all of them.
 *
 * If `reset` is true (default: false), the `xform` will only re-run when all
 * inputs have produced new values. See
 * [`StreamSync`](https://docs.thi.ng/umbrella/rstream/classes/StreamSync.html)
 * for further reference.
 *
 * // TODO add close behavior opts
 *
 * @param xform -
 * @param inputIDs -
 * @param reset -
 */
export const node =
	(
		xform: Transducer<IObjectOf<any>, any>,
		inputIDs?: string[],
		reset = false
	): NodeFactory<any> =>
	(
		src: IObjectOf<ISubscription<any, any>>,
		id: string
	): StreamSync<any, any> => {
		ensureInputs(src, inputIDs, id);
		return sync({ src, xform, id, reset });
	};

/**
 * Similar to {@link node}, but optimized for nodes using only a single
 * input. Uses "src" as default input ID.
 *
 * // TODO add close behavior opts
 *
 * @param xform -
 * @param inputID -
 */
export const node1 =
	(xform?: Transducer<any, any>, inputID = "src"): NodeFactory<any> =>
	(
		src: IObjectOf<ISubscription<any, any>>,
		id: string
	): ISubscription<any, any> => {
		ensureInputs(src, [inputID], id);
		return src[inputID].subscribe({}, { xform, id });
	};

/**
 * Syntax sugar for `node()`, intended for nodes w/ 2 inputs, by default
 * named `a` & `b` (but can be overridden).
 *
 * @param xform -
 * @param inputIDs -
 * @param reset -
 */
export const node2 = (
	xform: Transducer<IObjectOf<any>, any>,
	inputIDs: Tuple<string, 2> = ["a", "b"],
	reset = false
) => node(xform, inputIDs, reset);

/**
 * Helper function to verify given object of inputs has required input IDs.
 * Throws error if validation fails.
 *
 * @param src -
 * @param inputIDs -
 * @param nodeID -
 */
export const ensureInputs = (
	src: IObjectOf<ISubscription<any, any>>,
	inputIDs: string[] | undefined,
	nodeID: string
) => {
	if (inputIDs) {
		const missing: string[] = [];
		for (let i of inputIDs) {
			!src[i] && missing.push(i);
		}
		missing.length &&
			illegalArgs(
				`node "${nodeID}": missing input(s): ${missing.join(", ")}`
			);
	}
};
