import * as assert from "assert";
import { defn, float, isTerm, mul, ret, TRUE, vec2 } from "../src";

describe("shader-ast", () => {
    it("op2 type infer mulvv", () => {
        assert.deepEqual(mul(vec2(), vec2()), {
            tag: "op2",
            type: "vec2",
            info: undefined,
            op: "*",
            l: {
                tag: "lit",
                type: "vec2",
                info: "n",
                val: [{ tag: "lit", type: "float", info: undefined, val: 0 }],
            },
            r: {
                tag: "lit",
                type: "vec2",
                info: "n",
                val: [{ tag: "lit", type: "float", info: undefined, val: 0 }],
            },
        });
    });

    it("op2 type infer mulnv", () => {
        assert.deepEqual(mul(1, vec2()), {
            tag: "op2",
            type: "vec2",
            info: "nv",
            op: "*",
            l: { tag: "lit", type: "float", info: undefined, val: 1 },
            r: {
                tag: "lit",
                type: "vec2",
                info: "n",
                val: [{ tag: "lit", type: "float", info: undefined, val: 0 }],
            },
        });
    });

    it("op2 type infer mulvn", () => {
        assert.deepEqual(mul(vec2(), 1), {
            tag: "op2",
            type: "vec2",
            info: "vn",
            op: "*",
            l: {
                tag: "lit",
                type: "vec2",
                info: "n",
                val: [{ tag: "lit", type: "float", info: undefined, val: 0 }],
            },
            r: { tag: "lit", type: "float", info: undefined, val: 1 },
        });
    });

    it("isTerm", () => {
        assert.ok(isTerm({ tag: "lit", type: "float", val: 1 }));
        assert.ok(isTerm(float(1)));
        assert.ok(!isTerm(null));
        assert.ok(!isTerm(undefined));
        assert.ok(!isTerm({}));
        assert.ok(!isTerm(1));
    });

    it("defn deps", () => {
        const foo = defn("bool", "foo", [], () => [ret(TRUE)]);
        const bar = defn("float", "bar", [], () => [ret(float(foo()))]);
        assert.equal(bar.deps.length, 1);
        assert.equal(bar.deps[0].id, "foo");
    });
});
