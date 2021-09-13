import type { Fn, IObjectOf } from "@thi.ng/api";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { fit } from "@thi.ng/math/fit";
import { memoize1 } from "@thi.ng/memoize/memoize1";
import type { NodeInputSpec, NodeSpec } from "@thi.ng/rstream-graph";
import { addNode, node } from "@thi.ng/rstream-graph/graph";
import { fromView } from "@thi.ng/rstream/from/view";
import type { ASTNode, Implementations, Str, Sym } from "@thi.ng/sexpr";
import { parse } from "@thi.ng/sexpr/parse";
import { runtime } from "@thi.ng/sexpr/runtime";
import { tokenize } from "@thi.ng/sexpr/tokenize";
import { Z2 } from "@thi.ng/strings/pad-left";
import { maybeParseFloat } from "@thi.ng/strings/parse";
import { charRange } from "@thi.ng/strings/range";
import {
    add,
    assocObj,
    comp,
    div,
    filter,
    map,
    mapcat,
    mapIndexed,
    max,
    mean,
    min,
    mul,
    permutations,
    range,
    Reducer,
    sub,
    transduce,
} from "@thi.ng/transducers";
import { RE_CELL_ID, RE_CELL_RANGE } from "./api";
import { DB, graph, removeCell } from "./state";

/**
 * Runtime env, stores ID of result cell and tree/nesting depth of
 * currently interpreted S-expression.
 */
interface Env {
    id: string;
    depth: number;
}

// dynamic-dispatch function to delegate to actual DSL formula operators
const builtins = defmulti<Sym, ASTNode[], Env, any>((x) => x.value);

// init S-expression interpreter. this results in another
// dynamic-dispatch function which delegates based on AST node type
const rt = runtime<Implementations<Env, any>, Env, any>({
    // As per Lisp convention, S-expressions are treated as function
    // calls with 1st child item used as function name and rest as
    // arguments. E.g. `(+ a1 b1 c1)` is a function call to the `+`
    // function, with `a1`, `b1`, `c1` being arguments.
    expr: (x, env) =>
        builtins(<Sym>x.children[0], x.children, {
            ...env,
            depth: env.depth + 1,
        }),
    // other symbols are interpreted as cell IDs
    sym: (x) =>
        RE_CELL_ID.test(x.value)
            ? cellInput(x.value)
            : illegalArgs("invalid cell ID"),
    // strings & number used verbatim
    str: (x) => ({ const: x.value }),
    num: (x) => ({ const: x.value }),
});

/**
 * S-expression evaluator. Parses and executes given s-expr and by doing
 * so creates/updates the spreadsheet's dataflow graph. The `cellID` is
 * used to store the result in the DB state atom.
 *
 * @param src
 * @param cellID
 */
export const $eval = (src: string, cellID: string) =>
    rt(parse(tokenize(src)).children[0], { id: cellID, depth: 0 });

/**
 * Takes a rstream-graph `NodeSpec` and array of AST nodes and an
 * environment. For if the graph node corresponds to the top-level
 * expression, the NodeSpec is configured to write the result of the
 * computation back into the DB state atom. For inner/nested
 * S-expressions we create an unique node ID to store the graph node in
 * the graph.
 *
 * Any previously existing node for the resulting ID is first removed
 * before the new one is created/added.
 *
 * @param spec
 * @param vals
 * @param env
 */
const defNode = (spec: NodeSpec, vals: ASTNode[], env: Env) => {
    let id: string;
    if (env.depth === 1) {
        id = env.id;
        spec.outs = {
            "*": [id, "value"],
        };
    } else {
        id = JSON.stringify(vals);
        if (graph[id]) {
            return { stream: () => graph[id].node };
        }
    }
    removeCell(id);
    const node = addNode(graph, DB, id, spec);
    return { stream: () => node.node };
};

/**
 * Higher order function to define a DSL operator graph node with given
 * transformation `fn`. Once added to the graph, that function is later
 * called with a single arg, an object of numbered inputs like: `{ "00":
 * 23, "01": 42 ... }` These inputs represent the resolved reactive
 * argument values given in the original S-exression. For example, `(+
 * a1:c1 10)` will cause an object like:
 *
 * ```
 * {
 *   "00": curr value of a1,
 *   "01": curr value of b1,
 *   "02": curr value of c1,
 *   "03": 10,
 * }
 * ```
 *
 * @param fn
 */
const defBuiltin =
    (fn: Fn<IObjectOf<number>, any>) =>
    (_: ASTNode, vals: ASTNode[], env: Env) =>
        defNode(
            {
                // wrapped transformation fn
                fn: node(map(fn)),
                // compile all s-expr arguments into a single object of input stream defs.
                // - cell ranges yield multiple inputs
                // - single cell IDs yield stream of cell's value
                // - numeric args yield a single-item stream def of the given number
                ins: transduce(
                    comp(
                        mapcat((i) => {
                            try {
                                return cellRangeInputs(i);
                            } catch (e) {
                                return <NodeInputSpec[]>[rt(i, env)];
                            }
                        }),
                        // form pairs of [numbered-arg, input]
                        mapIndexed(
                            (i, input) =>
                                <[string, NodeInputSpec]>[Z2(i), input]
                        )
                    ),
                    // build object
                    assocObj<NodeInputSpec>(),
                    // only process s-expr args
                    vals.slice(1)
                ),
            },
            vals,
            env
        );

/**
 * Similar to `defBuiltin()`, but for reducer-based computations. Takes
 * a no-arg function returning a reducer and an optional
 * pre-transformer. The resulting transformation function filters out
 * all empty cells.
 *
 * @param rfn
 * @param xf
 */
const defReducer = (
    rfn: () => Reducer<any, any>,
    xf: Fn<any, any> = (x) => x
) =>
    defBuiltin((ports: IObjectOf<number>) => {
        const keys = Object.keys(ports).sort();
        return transduce(
            comp(
                map((k) => ports[k]),
                filter((x) => x != null),
                map(xf)
            ),
            rfn(),
            xf(ports[keys.shift()!]),
            keys
        );
    });

/**
 * Returns a rstream-graph NodeInputSpec linked to the cell value given
 * by `id`, stored in the central DB state atom. The stream is
 * configured to attempt string-to-number conversion of its values.
 */
const cellInput = memoize1(
    (id: string): NodeInputSpec => ({
        stream: () =>
            fromView(DB, {
                path: <const>[id.toUpperCase(), "value"],
                tx: (x) => maybeParseFloat(<string>x, null),
            }),
    })
);

/**
 * Returns iterator of NodeInputSpecs for given cell range string.
 *
 * @param x
 */
const cellRangeInputs = (x: ASTNode) => {
    const [acol, arow, bcol, brow] = parseCellIDRange(x);
    return map<[string, number], NodeInputSpec>(
        ([c, r]) => cellInput(`${c}${r}`),
        permutations(
            charRange(acol.toUpperCase(), bcol.toUpperCase()),
            range(parseInt(arow), parseInt(brow) + 1)
        )
    );
};

/**
 * Parses cell range string, e.g. `a5:c10` => ["a",5,"c",10]
 *
 * @param x
 */
const parseCellIDRange = (x: ASTNode) => {
    const match = RE_CELL_RANGE.exec((<Str>x).value);
    if (!match) illegalArgs("invalid cell range");
    return match!.slice(1, 5);
};

/**
 * Register built-ins.
 */
builtins.addAll({
    "+": defReducer(add),
    "*": defReducer(mul),
    "-": defReducer(sub),
    "/": defReducer(() => div(1)),
    min: defReducer(min),
    max: defReducer(max),
    avg: defReducer(() => mean()),
    mag: defReducer(
        () => [() => 0, (acc) => Math.sqrt(acc), (acc, x) => acc + x],
        (x) => x * x
    ),
    abs: defBuiltin(({ "00": x }) => Math.abs(x)),
    fit: defBuiltin(({ "00": x, "01": a, "02": b, "03": c, "04": d }) =>
        fit(x, a, b, c, d)
    ),
});
