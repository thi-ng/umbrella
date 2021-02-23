import * as assert from "assert";
import {
    bvec2,
    defn,
    float,
    isTerm,
    ivec2,
    Lit,
    mul,
    ret,
    sym,
    texture,
    TRUE,
    vec2,
    vec3,
} from "../src";

describe("shader-ast", () => {
    it("op2 type infer mulvv", () => {
        assert.deepStrictEqual(mul(vec2(), vec2()), {
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
        assert.deepStrictEqual(mul(1, vec2()), {
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
        assert.deepStrictEqual(mul(vec2(), 1), {
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
        assert.strictEqual(bar.deps.length, 1);
        assert.strictEqual(bar.deps[0].id, "foo");
    });

    it("vec2 ctor", () => {
        assert.deepStrictEqual(vec2(), <Lit<"vec2">>{
            tag: "lit",
            type: "vec2",
            info: "n",
            val: [
                {
                    info: undefined,
                    tag: "lit",
                    type: "float",
                    val: 0,
                },
            ],
        });
        assert.deepStrictEqual(vec2(1), <Lit<"vec2">>{
            tag: "lit",
            type: "vec2",
            info: "n",
            val: [
                {
                    info: undefined,
                    tag: "lit",
                    type: "float",
                    val: 1,
                },
            ],
        });
        assert.deepStrictEqual(vec2(1, 2), <Lit<"vec2">>{
            tag: "lit",
            type: "vec2",
            info: undefined,
            val: [
                {
                    info: undefined,
                    tag: "lit",
                    type: "float",
                    val: 1,
                },
                {
                    info: undefined,
                    tag: "lit",
                    type: "float",
                    val: 2,
                },
            ],
        });
        assert.deepStrictEqual(vec2(bvec2(true)), <Lit<"vec2">>{
            tag: "lit",
            type: "vec2",
            info: "b",
            val: [
                {
                    info: "n",
                    tag: "lit",
                    type: "bvec2",
                    val: [
                        {
                            info: undefined,
                            tag: "lit",
                            type: "bool",
                            val: true,
                        },
                    ],
                },
            ],
        });
        assert.deepStrictEqual(vec2(ivec2(1)), <Lit<"vec2">>{
            tag: "lit",
            type: "vec2",
            info: "i",
            val: [
                {
                    info: "n",
                    tag: "lit",
                    type: "ivec2",
                    val: [
                        {
                            info: undefined,
                            tag: "lit",
                            type: "int",
                            val: 1,
                        },
                    ],
                },
            ],
        });
    });

    it("texture", () => {
        const s2d = sym("sampler2D", "tex");
        const s3d = sym("sampler3D", "tex");
        const args2d = [
            {
                id: "tex",
                init: undefined,
                opts: {},
                tag: "sym",
                type: "sampler2D",
            },
            {
                info: "n",
                tag: "lit",
                type: "vec2",
                val: [
                    {
                        info: undefined,
                        tag: "lit",
                        type: "float",
                        val: 0,
                    },
                ],
            },
        ];
        assert.deepStrictEqual(
            texture(s2d, vec2()),
            {
                args: args2d,
                id: "texture",
                tag: "call_i",
                type: "vec4",
            },
            "2d"
        );
        assert.deepStrictEqual(
            texture(s2d, vec2(), float(1)),
            {
                args: [
                    ...args2d,
                    {
                        info: undefined,
                        tag: "lit",
                        type: "float",
                        val: 1,
                    },
                ],
                id: "texture",
                tag: "call_i",
                type: "vec4",
            },
            "2d bias"
        );
        assert.deepStrictEqual(
            texture(s3d, vec3()),
            {
                args: [
                    {
                        id: "tex",
                        init: undefined,
                        opts: {},
                        tag: "sym",
                        type: "sampler3D",
                    },
                    {
                        info: "n",
                        tag: "lit",
                        type: "vec3",
                        val: [
                            {
                                info: undefined,
                                tag: "lit",
                                type: "float",
                                val: 0,
                            },
                        ],
                    },
                ],
                id: "texture",
                tag: "call_i",
                type: "vec4",
            },
            "3d"
        );
    });
});
