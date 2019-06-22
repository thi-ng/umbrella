import * as assert from "assert";
import {
    $,
    FALSE,
    float,
    int,
    IVec,
    sym,
    targetGLSL,
    Term,
    TRUE,
    uint,
    Vec,
    vec2,
    vec3,
    vec4
} from "../src";
// import * as sa from "../src/index";

const gl = targetGLSL();

const V2 = sym("vec2", "v");
const V3 = sym("vec3", "v");
const V4 = sym("vec4", "v");

describe("shader-ast (glsl)", () => {
    it("lit", () => {
        assert.equal(gl(TRUE), "true");
        assert.equal(gl(FALSE), "false");
        assert.equal(gl(float(0)), "0.0");
        assert.equal(gl(float(-1)), "-1.0");
        assert.equal(gl(float(3.1415)), "3.1415");
        assert.equal(gl(int(0)), "0");
        assert.equal(gl(int(-1)), "-1");
        assert.equal(gl(int(3.1415)), "3");
        assert.equal(gl(uint(0)), "0");
        assert.equal(gl(uint(-1)), "4294967295");
        assert.equal(gl(uint(3.1415)), "3");
    });

    it("vec2", () => {
        assert.equal(gl(vec2()), "vec2(0.0)");
        assert.equal(gl(vec2(1)), "vec2(1.0)");
        assert.equal(gl(vec2(1, -2)), "vec2(1.0, -2.0)");
    });

    it("vec3", () => {
        assert.equal(gl(vec3()), "vec3(0.0)");
        assert.equal(gl(vec3(1)), "vec3(1.0)");
        assert.equal(gl(vec3(1, -2, 3.14)), "vec3(1.0, -2.0, 3.14)");
        assert.equal(
            gl(vec3(vec2(1, -2), 3.14)),
            "vec3(vec2(1.0, -2.0), 3.14)"
        );
    });

    it("vec4", () => {
        assert.equal(gl(vec4()), "vec4(0.0)");
        assert.equal(gl(vec4(1)), "vec4(1.0)");
        assert.equal(gl(vec4(1, -2, 3.14, -4)), "vec4(1.0, -2.0, 3.14, -4.0)");
        assert.equal(
            gl(vec4(vec2(1, -2), vec2(3.14))),
            "vec4(vec2(1.0, -2.0), vec2(3.14))"
        );
        assert.equal(
            gl(vec4(vec3(1, -2, 0), 3.14)),
            "vec4(vec3(1.0, -2.0, 0.0), 3.14)"
        );
    });

    it("swizzle", () => {
        const check = (v: Term<Vec | IVec>, pat: string) => {
            const res = $(<any>v, <any>pat);
            assert.equal(
                res.type,
                pat.length > 1 ? "vec" + pat.length : "float",
                pat
            );
            assert.equal(gl(res), "v." + pat, pat);
        };
        check(V2, "y");
        check(V2, "yx");
        check(V2, "yxy");
        check(V2, "yxyx");
        check(V3, "z");
        check(V3, "zy");
        check(V3, "zyx");
        check(V3, "zyxz");
        check(V4, "w");
        check(V4, "wz");
        check(V4, "wzy");
        check(V4, "wzyx");
    });
});
