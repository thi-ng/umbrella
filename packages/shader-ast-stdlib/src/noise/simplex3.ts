import {
    $,
    $w,
    $x,
    $xy,
    $xyz,
    $y,
    $z,
    abs,
    add,
    assign,
    defn,
    dot,
    float,
    FLOAT0,
    FLOAT05,
    FLOAT1,
    FLOAT2,
    floor,
    max,
    min,
    mod,
    mul,
    neg,
    ret,
    step,
    sub,
    sym,
    vec3,
    Vec3Sym,
    vec4,
    Vec4Sym
} from "@thi.ng/shader-ast";
import { permute4 } from "./permute";

export const snoise3 = defn("float", "snoise3", ["vec3"], (v) => {
    let CX: Vec3Sym;
    let CY: Vec3Sym;
    let D: Vec4Sym;
    let g: Vec3Sym;
    let j: Vec4Sym;
    let l: Vec3Sym;
    let m: Vec4Sym;
    let ns: Vec3Sym;
    let p: Vec4Sym;
    let norm: Vec4Sym;
    let _x, x, y, h, sh, a0, a1, b0, b1, s0, s1: Vec4Sym;
    let x0, x1, x2, x3, p0, p1, p2, p3: Vec3Sym;
    let i, i1, i2: Vec3Sym;
    return [
        (CX = sym(vec3(1 / 6))),
        (CY = sym(vec3(1 / 3))),
        (D = sym(vec4(FLOAT0, FLOAT05, FLOAT1, FLOAT2))),
        (i = sym(floor(add(v, dot(v, CY))))),
        (x0 = sym(add(sub(v, i), dot(i, CX)))),
        (g = sym(step($(x0, "yzx"), $xyz(x0)))),
        (l = sym($(sub(FLOAT1, g), "zxy"))),
        (i1 = sym(min($xyz(g), l))),
        (i2 = sym(max($xyz(g), l))),
        (x1 = sym(add(sub(x0, i1), CX))),
        (x2 = sym(add(sub(x0, i2), CY))),
        (x3 = sym(sub(x0, $(D, "yyy")))),
        assign(i, mod(i, float(289))),
        (p = sym(
            permute4(
                add(
                    permute4(
                        add(
                            permute4(
                                add($z(i), vec4(FLOAT0, $z(i1), $z(i2), FLOAT1))
                            ),
                            add($y(i), vec4(FLOAT0, $y(i1), $y(i2), FLOAT1))
                        )
                    ),
                    add($x(i), vec4(FLOAT0, $x(i1), $x(i2), FLOAT1))
                )
            )
        )),
        (ns = sym(sub(mul(0.142857142857, $(D, "wyz")), $(D, "xzx")))),
        (j = sym(sub(p, mul(49, floor(mul(mul(p, $z(ns)), $z(ns))))))),
        (_x = sym(floor(mul(j, $z(ns))))),
        (x = sym(add(mul(_x, $x(ns)), $(ns, "yyyy")))),
        (y = sym(add(mul(floor(sub(j, mul(7, _x))), $x(ns)), $(ns, "yyyy")))),
        (h = sym(sub(sub(FLOAT1, abs(x)), abs(y)))),
        (b0 = sym(vec4($xy(x), $xy(y)))),
        (b1 = sym(vec4($(x, "zw"), $(y, "zw")))),
        (s0 = sym(add(mul(floor(b0), FLOAT2), FLOAT1))),
        (s1 = sym(add(mul(floor(b1), FLOAT2), FLOAT1))),
        (sh = sym(neg(step(h, vec4())))),
        (a0 = sym(add($(b0, "xzyw"), mul($(s0, "xzyw"), $(sh, "xxyy"))))),
        (a1 = sym(add($(b1, "xzyw"), mul($(s1, "xzyw"), $(sh, "zzww"))))),
        (p0 = sym(vec3($xy(a0), $x(h)))),
        (p1 = sym(vec3($(a0, "zw"), $y(h)))),
        (p2 = sym(vec3($xy(a1), $z(h)))),
        (p3 = sym(vec3($(a1, "zw"), $w(h)))),
        (norm = sym(
            sub(
                1.79284291400159,
                mul(
                    0.85373472095314,
                    vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3))
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
        )
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
        )
    ];
});
