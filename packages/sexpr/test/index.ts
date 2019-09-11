import { Fn2 } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import * as assert from "assert";
import {
    Node,
    parse,
    runtime,
    Sym,
    tokenize
} from "../src/index";

const ops = defmulti<Node, Node[], any, any>((x) => (<Sym>x).value);
const rt = runtime<any, any>({
    expr: (x, env) => ops(x.children[0], x.children, env),
    sym: (x, env) => env[x.value],
    str: (x) => x.value,
    num: (x) => x.value
});

const $eval = (src: string, env: any = {}) =>
    rt(parse(tokenize(src)).children[0], env);

const op = (fn: Fn2<number, number, number>) => (
    _: Node,
    vals: Node[],
    env: any
) => vals.slice(2).reduce((acc, x) => fn(acc, rt(x, env)), rt(vals[1], env));

ops.addAll({
    "+": op((acc, x) => acc + x),
    "*": op((acc, x) => acc * x),
    "-": op((acc, x) => acc - x),
    "/": op((acc, x) => acc / x),
    count: (_, [__, x]) => rt(x).length
});

ops.add(DEFAULT, (x, [_, ...args], env) => {
    const f = env[(<Sym>x).value];
    assert(!!f, "missing impl");
    return f.apply(null, args.map((a) => rt(a, env)));
});

describe("sexpr", () => {
    it("math", () => {
        assert.equal(
            $eval(
                `(/
                    (-
                        (* (count "abc") (+ 100 (* 3 4 5)))
                        foo)
                    100)`,
                { foo: -20 }
            ),
            (3 * (100 + 3 * 4 * 5) - -20) / 100
        );
    });

    it("fn in env", () => {
        assert.equal(
            $eval(`(join (+ 1 2) (+ 3 4))`, {
                join: (...xs: any[]) => xs.join(",")
            }),
            "3,7"
        );
    });

    it("missing fn in env", () => {
        assert.throws(() => $eval("(foo)"));
    });
});
