import { ONE4, ZERO4 } from "@thi.ng/vectors";
import {
    ALIAS_TEXTURE,
    DEFAULT_BLEND,
    defglsl,
    defglslA,
    GLVec4,
    ShaderSpec
} from "@thi.ng/webgl";

export interface MSDFShaderOpts {
    color: boolean;
}

export const median3 = defglsl(`float median3(vec3 x) {
    return max(min(x.r, x.g), min(max(x.r, x.g), x.b));
}`);

export const msdfSample = defglsl(
    `vec2 msdfSample(sampler2D tex, vec2 uv) {
    float sd = median3(texture(tex, uv).rgb) - 0.5;
    float w = clamp(sd / fwidth(sd) + 0.5, 0., 1.);
    return vec2(sd, w);
}`,
    [median3]
);

export const msdfShader = (opts: Partial<MSDFShaderOpts> = {}): ShaderSpec => ({
    vs: `void main() {
    vuv = uv;
    ${opts.color ? "vcolor = color;" : ""}
    gl_Position = proj * modelview * vec4(position, 1.);
}`,
    fs: defglslA(
        `void main() {
    vec2 w = msdfSample(tex, vuv);
    fragColor = mix(bg, ${opts.color ? "vcolor" : "fg"}, w.y);
    if (w.x < thresh) {
        discard;
    }
}`,
        [msdfSample]
    ),
    pre: ALIAS_TEXTURE,
    ext: {
        OES_standard_derivatives: true
    },
    attribs: {
        position: "vec3",
        uv: "vec2",
        ...(opts.color ? { color: "vec4" } : null)
    },
    varying: {
        vuv: "vec2",
        ...(opts.color ? { vcolor: "vec4" } : null)
    },
    uniforms: {
        modelview: "mat4",
        proj: "mat4",
        tex: "sampler2D",
        thresh: ["float", 1e-3],
        bg: ["vec4", <GLVec4>ZERO4],
        ...(!opts.color ? { fg: ["vec4", <GLVec4>ONE4] } : null)
    },
    state: {
        blend: true,
        blendFn: DEFAULT_BLEND
    }
});
