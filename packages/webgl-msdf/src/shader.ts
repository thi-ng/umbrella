import {
    $x,
    $xyz,
    $y,
    $z,
    add,
    assign,
    clamp,
    defMain,
    defn,
    discard,
    div,
    FLOAT0,
    FLOAT05,
    FLOAT1,
    FloatSym,
    fwidth,
    ifThen,
    lt,
    max,
    min,
    mix,
    mul,
    ret,
    sub,
    sym,
    texture,
    vec2,
    Vec2Sym,
    vec4,
} from "@thi.ng/shader-ast";
import { ONE4, ZERO4 } from "@thi.ng/vectors/api";
import type { GLVec4, ShaderSpec } from "@thi.ng/webgl";
import { BLEND_NORMAL } from "@thi.ng/webgl/api/blend";

export interface MSDFShaderOpts {
    color: boolean;
}

export const median3 = defn("float", "median3", ["vec3"], (v) => [
    ret(max(min($x(v), $y(v)), min(max($x(v), $y(v)), $z(v)))),
]);

export const msdfSample = defn(
    "vec2",
    "msdfSample",
    ["sampler2D", "vec2"],
    (tex, uv) => {
        let sd: FloatSym;
        let w: FloatSym;
        return [
            (sd = sym(sub(median3($xyz(texture(tex, uv))), FLOAT05))),
            (w = sym(clamp(add(div(sd, fwidth(sd)), FLOAT05), FLOAT0, FLOAT1))),
            ret(vec2(sd, w)),
        ];
    }
);

export const msdfShader = (opts: Partial<MSDFShaderOpts> = {}): ShaderSpec => ({
    vs: (gl, unis, ins, outs) => [
        defMain(() => [
            assign(outs.vuv, ins.uv),
            opts.color ? assign(outs.vcolor, ins.color) : null,
            assign(
                gl.gl_Position,
                mul(mul(unis.proj, unis.modelview), vec4(ins.position, 1))
            ),
        ]),
    ],
    fs: (_, unis, ins, outs) => [
        defMain(() => {
            let w: Vec2Sym;
            return [
                (w = sym(msdfSample(unis.tex, ins.vuv))),
                assign(
                    outs.fragColor,
                    mix(unis.bg, opts.color ? ins.vcolor : unis.fg, $y(w))
                ),
                ifThen(lt($x(w), unis.thresh), [discard]),
            ];
        }),
    ],
    ext: {
        OES_standard_derivatives: true,
    },
    attribs: {
        position: "vec3",
        uv: "vec2",
        ...(opts.color ? { color: "vec4" } : null),
    },
    varying: {
        vuv: "vec2",
        ...(opts.color ? { vcolor: "vec4" } : null),
    },
    uniforms: {
        modelview: "mat4",
        proj: "mat4",
        tex: "sampler2D",
        thresh: ["float", 1e-3],
        bg: ["vec4", <GLVec4>ZERO4],
        ...(!opts.color ? { fg: ["vec4", <GLVec4>ONE4] } : null),
    },
    state: {
        blend: true,
        blendFn: BLEND_NORMAL,
    },
});
