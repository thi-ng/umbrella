import { ConsoleLogger } from "@thi.ng/logger";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    DEFAULT,
    defmulti,
    defmultiN,
    implementations,
    setLogger,
} from "../src";

// prettier-ignore
group("defmulti", {
    "flatten": () => {
        const flatten = defmulti<any[]>((x) => Object.prototype.toString.call(x));
        assert.ok(flatten.add("[object Array]", (x, acc: any[]) => (x.forEach((y: any) => flatten(y, acc)), acc)));
        assert.ok(flatten.add("[object Object]", (x, acc: any[]) => { for (let k in x) flatten([k, x[k]], acc); return acc; }));
        assert.ok(flatten.add("[object Null]", (_, acc) => acc));
        assert.ok(flatten.add(DEFAULT, (x, acc: any[]) => (acc.push(x.toString()), acc)));

        assert. deepStrictEqual(flatten([{ a: 1, b: ["foo", "bar", null, 42] }], []), ['a', '1', 'b', 'foo', 'bar', '42']);
        assert.ok(flatten.remove(DEFAULT));
        assert.ok(!flatten.remove(DEFAULT));
        assert.throws(() => flatten([{ a: 1, b: ["foo", "bar", null, 42] }], []));
    },

    "sexpr": () => {
        const exec = defmulti<number>((x) => Array.isArray(x) ? x[0] : typeof x);
        assert.ok(exec.add("+", ([_, ...args]) => args.reduce((acc: number, n: any) => acc + exec(n), 0)));
        assert.ok(exec.add("*", ([_, ...args]) => args.reduce((acc: number, n: any) => acc * exec(n), 1)));
        assert.ok(exec.add("number", (x) => x));
        assert.ok(exec.add(DEFAULT, (x) => { throw new Error(`invalid expr: ${x}`); }));

        assert.strictEqual(exec(["+", ["*", 10, ["+", 1, 2, 3]], 6]), 66);

        setLogger(new ConsoleLogger("defmulti"));
        assert.ok(exec.add("number", (x) => x * 2));
        assert.strictEqual(exec(["+", ["*", 10, ["+", 1, 2, 3]], 6]), ((1*2 + 2*2 + 3*2) * 10*2) + 6*2);

        assert.throws(() => exec(""));
    },

    "apr": () => {
        const apr = defmulti<any, number>(
            ({ type, balance }) => `${type}-${balance < 1e4 ? "low" : balance < 5e4 ? "med" : "high"}`
        );
        apr.add("current-low", ({ balance }) => balance * 0.005);
        apr.add("current-med", ({ balance }) => balance * 0.01);
        apr.add("current-high", ({ balance }) => balance * 0.01);
        apr.add("savings-low", ({ balance }) => balance * 0.01);
        apr.add("savings-med", ({ balance }) => balance * 0.025);
        apr.add("savings-high", ({ balance }) => balance * 0.035);
        apr.add(DEFAULT, (x) => { throw new Error(`invalid account type: ${x.type}`) });

        assert.strictEqual(~~apr({ type: "current", balance: 5000 }), 25);
        assert.strictEqual(~~apr({ type: "current", balance: 10000 }), 100);
        assert.strictEqual(~~apr({ type: "current", balance: 50000 }), 500);
        assert.strictEqual(~~apr({ type: "savings", balance: 5000 }), 50);
        assert.strictEqual(~~apr({ type: "savings", balance: 10000 }), 250);
        assert.strictEqual(~~apr({ type: "savings", balance: 100000 }), 3500);
        assert.throws(() => apr({ type: "isa", balance: 10000 }));
    },

    "defmultiN": () => {
        const foo = defmultiN({
            0: () => "zero",
            1: (x) => `one: ${x}`,
            3: (x, y, z) => `three: ${x}, ${y}, ${z}`
        });

        assert.strictEqual(foo(), "zero");
        assert.strictEqual(foo(23), "one: 23");
        assert.strictEqual(foo(1, 2, 3), "three: 1, 2, 3");
        assert.throws(() => foo(1, 2));
    },

    "isa": () => {
        const foo = defmulti((x) => x);
        foo.isa(23, "odd");
        foo.isa(42, "even");
        foo.isa("odd", "number");
        foo.isa("even", "number");
        foo.add("odd", () => "odd");
        foo.add("number", () => "number");
        assert. deepStrictEqual(foo.parents(23), new Set(["odd"]), "parents 23");
        assert. deepStrictEqual(foo.parents(42), new Set(["even"]), "parents 42");
        assert. deepStrictEqual(foo.ancestors(23), new Set(["odd", "number"]), "ancestors 23");
        assert. deepStrictEqual(foo.ancestors(42), new Set(["even", "number"]), "ancestors 42");
        assert. deepStrictEqual(foo.rels(), {
            23: new Set(["odd"]),
            42: new Set(["even"]),
            "odd": new Set(["number"]),
            "even": new Set(["number"]),
        }, "foo rels");
        assert.strictEqual(foo(23), "odd");
        assert.strictEqual(foo(42), "number");
        assert.ok(foo.callable(23));
        assert.ok(foo.callable(42));
        assert.ok(!foo.callable(66));
        assert.throws(() => foo(66), "no default");
        foo.add(DEFAULT, (x) => -x);
        assert.strictEqual(foo(66), -66);
        assert. deepStrictEqual(foo.impls(), new Set([DEFAULT, "odd", "even", "number", "23", "42"]));

        const bar = defmulti((x) => x, {
            23: ["odd"],
            42: ["even"],
            "odd": ["number"],
            "even": ["number"],
        });
        assert. deepStrictEqual(bar.rels(), {
            23: new Set(["odd"]),
            42: new Set(["even"]),
            "odd": new Set(["number"]),
            "even": new Set(["number"]),
        }, "bar rels");
    },

    "implementations": () => {
        const foo = defmulti((x) => x.id);
        const bar = defmulti((x) => x.id);

        implementations(
            "a",
            {},
            foo, (x) => `foo: ${x.val}`,
            bar, (x) => `bar: ${x.val.toUpperCase()}`
        )

        assert.strictEqual(foo({ id: "a", val: "alice" }), "foo: alice");
        assert.strictEqual(bar({ id: "a", val: "alice" }), "bar: ALICE");
    },

    "dependencies": () => {
        const a = defmulti((x) => x);
        assert.deepStrictEqual([...a.dependencies()], []);
        a.add("a", () => { });
        assert.deepStrictEqual([...a.dependencies()], [["a",undefined]]);
        a.add("d",()=>{});
        a.isa("b", "a");
        a.isa("c", "b");
        a.isa("e", "b");
        assert.deepStrictEqual(
            new Set([...a.dependencies()]),
            new Set([
                ["b", "a"],
                ["c", "b"],
                ["e", "b"],
                ["a", undefined],
                ["d", undefined]
            ])
        );
    },
});
