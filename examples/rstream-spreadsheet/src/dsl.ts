import { Fn, IObjectOf } from "@thi.ng/api";
import { defmulti } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import { fit } from "@thi.ng/math";
import { memoize1 } from "@thi.ng/memoize";
import { fromView } from "@thi.ng/rstream";
import {
    addNode,
    node,
    NodeInputSpec,
    NodeSpec
} from "@thi.ng/rstream-graph";
import {
    Node,
    parse,
    runtime,
    StringNode,
    Sym,
    tokenize
} from "@thi.ng/sexpr";
import { maybeParseFloat, Z2 } from "@thi.ng/strings";
import { charRange } from "@thi.ng/strings";
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
    transduce
} from "@thi.ng/transducers";
import { RE_CELL_ID, RE_CELL_RANGE } from "./api";
import { DB, graph, removeCell } from "./state";

interface Env {
    id: string;
    depth: number;
}

const builtins = defmulti<Node, Node[], Env, any>((x) => (<Sym>x).value);

const rt = runtime<Env, any>({
    expr: (x, env) =>
        builtins(x.children[0], x.children, { ...env, depth: env.depth + 1 }),
    sym: (x) =>
        RE_CELL_ID.test(x.value)
            ? cellInput(x.value)
            : illegalArgs("invalid cell ID"),
    str: (x) => ({ const: x.value }),
    num: (x) => ({ const: x.value })
});

const defNode = (spec: NodeSpec, vals: Node[], env: Env) => {
    let id: string;
    if (env.depth === 1) {
        id = env.id;
        spec.outs = {
            "*": [id, "value"]
        };
    } else {
        id = JSON.stringify(vals);
    }
    removeCell(id);
    const node = addNode(graph, DB, id, spec);
    return { stream: () => node.node };
};

const defBuiltin = (fn: Fn<IObjectOf<number>, any>) => (
    _: Node,
    vals: Node[],
    env: Env
) =>
    defNode(
        {
            fn: node(map(fn)),
            ins: transduce(
                comp(
                    mapcat((i) => {
                        try {
                            return cellRangeInputs(i);
                        } catch (e) {
                            return <NodeInputSpec[]>[rt(i, env)];
                        }
                    }),
                    mapIndexed((i, input) => [Z2(i), input])
                ),
                assocObj<NodeInputSpec>(),
                vals.slice(1)
            )
        },
        vals,
        env
    );

const defReducer = (
    rfn: () => Reducer<any, any>,
    xf: Fn<any, any> = (x) => x
) =>
    defBuiltin((ports: IObjectOf<number>) => {
        const keys = Object.keys(ports).sort();
        return transduce(
            comp(map((k) => ports[k]), filter((x) => x != null), map(xf)),
            rfn(),
            xf(ports[keys.shift()!]),
            keys
        );
    });

const cellInput = memoize1(
    (id: string): NodeInputSpec => ({
        stream: () =>
            fromView(DB, [id.toUpperCase(), "value"], (x) =>
                maybeParseFloat(x, null)
            )
    })
);

const cellRangeInputs = (x: Node) => {
    const [acol, arow, bcol, brow] = parseCellIDRange(x);
    return map<[string, number], NodeInputSpec>(
        ([c, r]) => cellInput(`${c}${r}`),
        permutations(
            charRange(acol.toUpperCase(), bcol.toUpperCase()),
            range(parseInt(arow), parseInt(brow) + 1)
        )
    );
};

const parseCellIDRange = (x: Node) => {
    const match = RE_CELL_RANGE.exec((<StringNode>x).value);
    if (!match) illegalArgs("invalid cell range");
    return match!.slice(1, 5);
};

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
    )
});

export const $eval = (src: string, cellID: string) =>
    rt(parse(tokenize(src)).children[0], { id: cellID, depth: 0 });
