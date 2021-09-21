import type { Vec3Sym, Vec4Sym } from "@thi.ng/shader-ast";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import {
    float,
    FLOAT0,
    FLOAT05,
    FLOAT1,
    FLOAT2,
    vec3,
    vec4,
} from "@thi.ng/shader-ast/ast/lit";
import { add, mul, neg, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $w, $x, $xy, $y, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import {
    abs,
    dot,
    floor,
    max,
    min,
    mod,
    step,
} from "@thi.ng/shader-ast/builtin/math";
import { permute4 } from "./permute";

export const snoise3 = defn("float", "snoise3", ["vec3"], (v) => {
    let g: Vec3Sym;
    let j: Vec4Sym;
    let l: Vec3Sym;
    let m: Vec4Sym;
    let p: Vec4Sym;
    let norm: Vec4Sym;
    let _x: Vec4Sym;
    let x: Vec4Sym;
    let y: Vec4Sym;
    let h: Vec4Sym;
    let sh: Vec4Sym;
    let a0: Vec4Sym;
    let a1: Vec4Sym;
    let b0: Vec4Sym;
    let b1: Vec4Sym;
    let x0: Vec3Sym;
    let x1: Vec3Sym;
    let x2: Vec3Sym;
    let x3: Vec3Sym;
    let p0: Vec3Sym;
    let p1: Vec3Sym;
    let p2: Vec3Sym;
    let p3: Vec3Sym;
    let i: Vec3Sym;
    let i1: Vec3Sym;
    let i2: Vec3Sym;
    const NS = 1 / 7;
    const NSX = NS * 2;
    const NSY = NS * 0.5 - 1;
    return [
        (i = sym(floor(add(v, dot(v, vec3(1 / 3)))))),
        (x0 = sym(add(sub(v, i), dot(i, vec3(1 / 6))))),
        (g = sym(step($(x0, "yzx"), x0))),
        (l = sym($(sub(FLOAT1, g), "zxy"))),
        (i1 = sym(min(g, l))),
        (i2 = sym(max(g, l))),
        (x1 = sym(add(sub(x0, i1), 1 / 6))),
        (x2 = sym(add(sub(x0, i2), 1 / 3))),
        (x3 = sym(sub(x0, FLOAT05))),
        assign(i, mod(i, float(289))),
        (p = sym(
            permute4(
                add(
                    permute4(
                        add(
                            permute4(
                                add(vec4(FLOAT0, $z(i1), $z(i2), FLOAT1), $z(i))
                            ),
                            add(vec4(FLOAT0, $y(i1), $y(i2), FLOAT1), $y(i))
                        )
                    ),
                    add(vec4(FLOAT0, $x(i1), $x(i2), FLOAT1), $x(i))
                )
            )
        )),
        (j = sym(sub(p, mul(floor(mul(p, NS * NS)), 49)))),
        (_x = sym(floor(mul(j, NS)))),
        (x = sym(add(mul(_x, NSX), NSY))),
        (y = sym(add(mul(floor(sub(j, mul(_x, 7))), NSX), NSY))),
        (h = sym(sub(sub(FLOAT1, abs(x)), abs(y)))),
        (sh = sym(neg(step(h, vec4())))),
        (b0 = sym(vec4($xy(x), $xy(y)))),
        (b1 = sym(vec4($(x, "zw"), $(y, "zw")))),
        (a0 = sym(
            add(
                $(b0, "xzyw"),
                mul(
                    $(add(mul(floor(b0), FLOAT2), FLOAT1), "xzyw"),
                    $(sh, "xxyy")
                )
            )
        )),
        (a1 = sym(
            add(
                $(b1, "xzyw"),
                mul(
                    $(add(mul(floor(b1), FLOAT2), FLOAT1), "xzyw"),
                    $(sh, "zzww")
                )
            )
        )),
        (p0 = sym(vec3($xy(a0), $x(h)))),
        (p1 = sym(vec3($(a0, "zw"), $y(h)))),
        (p2 = sym(vec3($xy(a1), $z(h)))),
        (p3 = sym(vec3($(a1, "zw"), $w(h)))),
        (norm = sym(
            sub(
                1.79284291400159,
                mul(
                    vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)),
                    0.85373472095314
                )
            )
        )),
        assign(p0, mul(p0, $x(norm))),
        assign(p1, mul(p1, $y(norm))),
        assign(p2, mul(p2, $z(norm))),
        assign(p3, mul(p3, $w(norm))),
        (m = sym(
            max(
                vec4(),
                sub(
                    0.6,
                    vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3))
                )
            )
        )),
        assign(m, mul(m, m)),
        ret(
            mul(
                42,
                dot(
                    mul(m, m),
                    vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
                )
            )
        ),
    ];
});

export const snoiseVec3 = defn("vec3", "snoiseVec3", ["vec3"], (p) => {
    return [
        ret(
            vec3(
                snoise3(p),
                snoise3(
                    vec3(sub($y(p), 19.1), add($z(p), 33.4), add($x(p), 47.2))
                ),
                snoise3(
                    vec3(add($z(p), 74.2), sub($x(p), 124.5), add($y(p), 99.4))
                )
            )
        ),
    ];
});
