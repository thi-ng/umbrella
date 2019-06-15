import * as assert from "assert";
import {
    F,
    float,
    int,
    IVec,
    swizzle,
    sym,
    T,
    targetGLSL,
    Term,
    uint,
    Vec,
    vec2,
    vec3,
    vec4
} from "../src";
// import * as sa from "../src/index";

const $ = targetGLSL();

const V2 = sym("vec2", "v");
const V3 = sym("vec3", "v");
const V4 = sym("vec4", "v");

describe("shader-ast (glsl)", () => {
    it("lit", () => {
        assert.equal($(T), "true");
        assert.equal($(F), "false");
        assert.equal($(float(0)), "0.0");
        assert.equal($(float(-1)), "-1.0");
        assert.equal($(float(3.1415)), "3.1415");
        assert.equal($(int(0)), "0");
        assert.equal($(int(-1)), "-1");
        assert.equal($(int(3.1415)), "3");
        assert.equal($(uint(0)), "0");
        assert.equal($(uint(-1)), "4294967295");
        assert.equal($(uint(3.1415)), "3");
    });

    it("vec2", () => {
        assert.equal($(vec2()), "vec2(0.0)");
        assert.equal($(vec2(1)), "vec2(1.0)");
        assert.equal($(vec2(1, -2)), "vec2(1.0, -2.0)");
    });

    it("vec3", () => {
        assert.equal($(vec3()), "vec3(0.0)");
        assert.equal($(vec3(1)), "vec3(1.0)");
        assert.equal($(vec3(1, -2, 3.14)), "vec3(1.0, -2.0, 3.14)");
        assert.equal($(vec3(vec2(1, -2), 3.14)), "vec3(vec2(1.0, -2.0), 3.14)");
    });

    it("vec4", () => {
        assert.equal($(vec4()), "vec4(0.0)");
        assert.equal($(vec4(1)), "vec4(1.0)");
        assert.equal($(vec4(1, -2, 3.14, -4)), "vec4(1.0, -2.0, 3.14, -4.0)");
        assert.equal(
            $(vec4(vec2(1, -2), vec2(3.14))),
            "vec4(vec2(1.0, -2.0), vec2(3.14))"
        );
        assert.equal(
            $(vec4(vec3(1, -2, 0), 3.14)),
            "vec4(vec3(1.0, -2.0, 0.0), 3.14)"
        );
    });

    it("swizzle", () => {
        const $$ = (v: Term<Vec | IVec>, pat: string) => {
            const res = swizzle(<any>v, <any>pat);
            assert.equal(
                res.type,
                pat.length > 1 ? "vec" + pat.length : "f32",
                pat
            );
            assert.equal($(res), "v." + pat, pat);
        };
        $$(V2, "y");
        $$(V2, "yx");
        $$(V2, "yxy");
        $$(V2, "yxyx");
        $$(V3, "z");
        $$(V3, "zy");
        $$(V3, "zyx");
        $$(V3, "zyxz");
        $$(V4, "w");
        $$(V4, "wz");
        $$(V4, "wzy");
        $$(V4, "wzyx");
    });
});
