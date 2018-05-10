import * as assert from "assert";
import { DEFAULT, defmulti, defmultiN } from "../src/index";

describe("defmulti", () => {
    it("flatten", () => {
        const flatten = defmulti<any[]>((x) => Object.prototype.toString.call(x));
        assert(flatten.add("[object Array]", (x, acc: any[]) => (x.forEach((y) => flatten(y, acc)), acc)));
        assert(flatten.add("[object Object]", (x, acc: any[]) => { for (let k in x) flatten([k, x[k]], acc); return acc; }));
        assert(flatten.add("[object Null]", (_, acc) => acc));
        assert(flatten.add(DEFAULT, (x, acc: any[]) => (acc.push(x.toString()), acc)));

        assert.deepEqual(flatten([{ a: 1, b: ["foo", "bar", null, 42] }], []), ['a', '1', 'b', 'foo', 'bar', '42']);
        assert(flatten.remove(DEFAULT));
        assert(!flatten.remove(DEFAULT));
        assert.throws(() => flatten([{ a: 1, b: ["foo", "bar", null, 42] }], []));
    });

    it("sexpr", () => {
        const exec = defmulti<number>((x) => Array.isArray(x) ? x[0] : typeof x);
        assert(exec.add("+", ([_, ...args]) => args.reduce((acc, n) => acc + exec(n), 0)));
        assert(exec.add("*", ([_, ...args]) => args.reduce((acc, n) => acc * exec(n), 1)));
        assert(exec.add("number", (x) => x));
        assert(!exec.add("number", (x) => x));
        assert(exec.add(DEFAULT, (x) => { throw new Error(`invalid expr: ${x}`); }));

        assert.equal(exec(["+", ["*", 10, ["+", 1, 2, 3]], 6]), 66);
        assert.throws(() => exec(""));
    });

    it("apr", () => {
        const apr = defmulti(
            ({ type, balance }) => `${type}-${balance < 1e4 ? "low" : balance < 5e4 ? "med" : "high"}`
        );
        apr.add("current-low", ({ balance }) => balance * 0.005);
        apr.add("current-med", ({ balance }) => balance * 0.01);
        apr.add("current-high", ({ balance }) => balance * 0.01);
        apr.add("savings-low", ({ balance }) => balance * 0.01);
        apr.add("savings-med", ({ balance }) => balance * 0.025);
        apr.add("savings-high", ({ balance }) => balance * 0.035);
        apr.add(DEFAULT, (x) => { throw new Error(`invalid account type: ${x.type}`) });

        assert.equal(~~apr({ type: "current", balance: 5000 }), 25);
        assert.equal(~~apr({ type: "current", balance: 10000 }), 100);
        assert.equal(~~apr({ type: "current", balance: 50000 }), 500);
        assert.equal(~~apr({ type: "savings", balance: 5000 }), 50);
        assert.equal(~~apr({ type: "savings", balance: 10000 }), 250);
        assert.equal(~~apr({ type: "savings", balance: 100000 }), 3500);
        assert.throws(() => apr({ type: "isa", balance: 10000 }));
    });

    it("defmultiN", () => {
        const foo = defmultiN({
            0: () => "zero",
            1: (x) => `one: ${x}`,
            3: (x, y, z) => `three: ${x}, ${y}, ${z}`
        });

        assert.equal(foo(), "zero");
        assert.equal(foo(23), "one: 23");
        assert.equal(foo(1, 2, 3), "three: 1, 2, 3");
        assert.throws(() => foo(1, 2));
    });
});
