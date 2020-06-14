import * as assert from "assert";
import { mul, vec2 } from "../src";

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
});
