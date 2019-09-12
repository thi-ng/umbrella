import { IObjectOf } from "@thi.ng/api";
import { defmulti } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import { memoize1 } from "@thi.ng/memoize";
import { fromView } from "@thi.ng/rstream";
import {
    add,
    addNode,
    div,
    mul,
    node,
    NodeFactory,
    NodeInputSpec,
    NodeSpec,
    sub
} from "@thi.ng/rstream-graph";
import {
    Node,
    parse,
    runtime,
    StringNode,
    Sym,
    tokenize
} from "@thi.ng/sexpr";
import { maybeParseFloat } from "@thi.ng/strings";
import { charRange } from "@thi.ng/strings";
import {
    assocObj,
    comp,
    map,
    permutations,
    range,
    transduce,
    zip
} from "@thi.ng/transducers";
import { DB, graph, removeCell } from "./state";

interface Env {
    id: string;
    depth: number;
}

const builtins = defmulti<Node, Node[], Env, any>((x) => (<Sym>x).value);

const rt = runtime<Env, any>({
    expr: (x, env) =>
        builtins(x.children[0], x.children, { ...env, depth: env.depth + 1 }),
    sym: (x) => cellInput(x.value),
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

const defOp = (op: NodeFactory<any>) => (_: Node, vals: Node[], env: Env) =>
    defNode(
        {
            fn: op,
            ins: cellInputs(vals.slice(1), env)
        },
        vals,
        env
    );

const defSum = (_: Node, vals: Node[], env: Env) =>
    defNode(
        {
            fn: node(
                map((ports: IObjectOf<number>) => {
                    let acc = 0;
                    let v;
                    for (let p in ports) {
                        if ((v = ports[p]) == null) continue;
                        acc += v;
                    }
                    return acc;
                })
            ),
            ins: cellRangeInputs(vals[1])
        },
        vals,
        env
    );

const cellInput = memoize1(
    (id: string): NodeInputSpec => ({
        stream: () =>
            fromView(DB, [id.toUpperCase(), "value"], (x) =>
                maybeParseFloat(x, 0)
            )
    })
);

const cellInputs = (vals: Node[], env: Env) =>
    transduce(
        map(([k, v]) => [k, rt(v, env)]),
        assocObj<NodeInputSpec>(),
        zip(charRange("a", "z"), vals)
    );

const cellRangeInputs = (x: Node) => {
    const [acol, arow, bcol, brow] = parseCellIDRange(x);
    return transduce(
        comp(map(([c, r]) => `${c}${r}`), map((id) => [id, cellInput(id)])),
        assocObj<NodeInputSpec>(),
        permutations(
            charRange(acol.toUpperCase(), bcol.toUpperCase()),
            range(parseInt(arow), parseInt(brow) + 1)
        )
    );
};

builtins.addAll({
    "+": defOp(add),
    "*": defOp(mul),
    "-": defOp(sub),
    "/": defOp(div),
    sum: defSum
});

const parseCellIDRange = (x: Node) => {
    const match = /^([A-Z])(\d+):([A-Z])(\d+)$/i.exec((<StringNode>x).value);
    if (!match) illegalArgs("invalid cell range");
    return match!.slice(1, 5);
};

export const $eval = (src: string, cellID: string) =>
    rt(parse(tokenize(src)).children[0], { id: cellID, depth: 0 });
