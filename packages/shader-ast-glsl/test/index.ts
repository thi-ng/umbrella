import {
    $,
    FALSE,
    float,
    input,
    int,
    IVec,
    output,
    scope,
    sym,
    Term,
    TRUE,
    uint,
    uniform,
    Vec,
    vec2,
    vec3,
    vec4,
} from "@thi.ng/shader-ast";
import * as assert from "assert";
import { GLSLVersion, targetGLSL } from "../src";

const vs100 = targetGLSL({
    type: "vs",
    version: GLSLVersion.GLES_100,
    versionPragma: false,
});
const fs100 = targetGLSL({
    type: "fs",
    version: GLSLVersion.GLES_100,
    versionPragma: false,
});
const vs300 = targetGLSL({ type: "vs", versionPragma: false });
const fs300 = targetGLSL({ type: "fs", versionPragma: false });

const V2 = sym("vec2", "v");
const V3 = sym("vec3", "v");
const V4 = sym("vec4", "v");

describe("shader-ast (glsl)", () => {
    it("lit", () => {
        assert.equal(fs300(TRUE), "true");
        assert.equal(fs300(FALSE), "false");
        assert.equal(fs300(float(0)), "0.0");
        assert.equal(fs300(float(-1)), "-1.0");
        assert.equal(fs300(float(3.1415)), "3.1415");
        assert.equal(fs300(int(0)), "0");
        assert.equal(fs300(int(-1)), "-1");
        assert.equal(fs300(int(3.1415)), "3");
        assert.equal(fs300(uint(0)), "0");
        assert.equal(fs300(uint(-1)), "4294967295");
        assert.equal(fs300(uint(3.1415)), "3");
    });

    it("vec2", () => {
        assert.equal(fs300(vec2()), "vec2(0.0)");
        assert.equal(fs300(vec2(1)), "vec2(1.0)");
        assert.equal(fs300(vec2(1, -2)), "vec2(1.0, -2.0)");
    });

    it("vec3", () => {
        assert.equal(fs300(vec3()), "vec3(0.0)");
        assert.equal(fs300(vec3(1)), "vec3(1.0)");
        assert.equal(fs300(vec3(1, -2, 3.14)), "vec3(1.0, -2.0, 3.14)");
        assert.equal(
            fs300(vec3(vec2(1, -2), 3.14)),
            "vec3(vec2(1.0, -2.0), 3.14)"
        );
    });

    it("vec4", () => {
        assert.equal(fs300(vec4()), "vec4(0.0)");
        assert.equal(fs300(vec4(1)), "vec4(1.0)");
        assert.equal(
            fs300(vec4(1, -2, 3.14, -4)),
            "vec4(1.0, -2.0, 3.14, -4.0)"
        );
        assert.equal(
            fs300(vec4(vec2(1, -2), vec2(3.14))),
            "vec4(vec2(1.0, -2.0), vec2(3.14))"
        );
        assert.equal(
            fs300(vec4(vec3(1, -2, 0), 3.14)),
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
            assert.equal(fs300(res), "v." + pat, pat);
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

    it("inputs", () => {
        [
            [
                input("vec3", "a"),
                "attribute vec3 a;",
                "in vec3 a;",
                "varying vec3 a;",
                "in vec3 a;",
            ],
            [
                input("vec3", "a", { loc: 1 }),
                "attribute vec3 a;",
                "layout(location=1) in vec3 a;",
                "varying vec3 a;",
                "layout(location=1) in vec3 a;",
            ],
            [
                input("vec3", "a", { loc: 1, num: 3 }),
                "attribute vec3 a[3];",
                "layout(location=1) in vec3 a[3];",
                "varying vec3 a[3];",
                "layout(location=1) in vec3 a[3];",
            ],
        ].forEach(([inp, v100, v300, f100, f300]: any) => {
            const spec = scope([inp], true);
            assert.equal(vs100(spec), v100, "vs100");
            assert.equal(vs300(spec), v300, "vs300");
            assert.equal(fs100(spec), f100, "fs100");
            assert.equal(fs300(spec), f300, "fs300");
        });
    });

    it("uniforms", () => {
        [
            [uniform("vec3", "a"), "uniform vec3 a;", "uniform vec3 a;"],
            [
                uniform("vec3", "a", { loc: 1 }),
                "uniform vec3 a;",
                "layout(location=1) uniform vec3 a;",
            ],
            [
                uniform("vec3", "a", { loc: 1, num: 3 }),
                "uniform vec3 a[3];",
                "layout(location=1) uniform vec3 a[3];",
            ],
        ].forEach(([uni, gl100, gl300]: any) => {
            const spec = scope([uni], true);
            assert.equal(vs100(spec), gl100, "vs100");
            assert.equal(vs300(spec), gl300, "vs300");
            assert.equal(fs100(spec), gl100, "fs100");
            assert.equal(fs300(spec), gl300, "fs300");
        });
    });

    it("outputs", () => {
        [
            [
                output("vec3", "a"),
                "varying vec3 a;",
                "out vec3 a;",
                "out vec3 a;",
            ],
            [
                output("vec3", "a", { loc: 1 }),
                "varying vec3 a;",
                "layout(location=1) out vec3 a;",
                "layout(location=1) out vec3 a;",
            ],
            [
                output("vec3", "a", { loc: 1, num: 3 }),
                "varying vec3 a[3];",
                "layout(location=1) out vec3 a[3];",
                "layout(location=1) out vec3 a[3];",
            ],
        ].forEach(([out, v100, v300, f300]: any) => {
            const spec = scope([out], true);
            assert.equal(vs100(spec), v100, "vs100");
            assert.equal(vs300(spec), v300, "vs300");
            assert.throws(() => fs100(spec), "fs100");
            assert.equal(fs300(spec), f300, "fs300");
        });
    });
});
