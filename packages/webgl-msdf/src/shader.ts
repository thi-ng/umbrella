import { ONE4, ZERO4 } from "@thi.ng/vectors";
import {
    ALIAS_TEXTURE,
    DEFAULT_BLEND,
    defglsl,
    defglslA,
    GLSL,
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
    v_uv = a_uv;
    ${opts.color ? "v_color = a_color;" : ""}
    gl_Position = u_proj * u_modelview * vec4(a_position, 1.);
}`,
    fs: defglslA(
        `void main() {
    vec2 w = msdfSample(u_tex, v_uv);
    o_fragColor = mix(u_bg, ${opts.color ? "v_color" : "u_fg"}, w.y);
    if (w.x < u_thresh) {
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
        position: GLSL.vec3,
        uv: GLSL.vec2,
        ...(opts.color ? { color: GLSL.vec4 } : null)
    },
    varying: {
        uv: GLSL.vec2,
        ...(opts.color ? { color: GLSL.vec4 } : null)
    },
    uniforms: {
        modelview: GLSL.mat4,
        proj: GLSL.mat4,
        tex: GLSL.sampler2D,
        thresh: [GLSL.float, 1e-3],
        bg: [GLSL.vec4, <GLVec4>ZERO4],
        ...(!opts.color ? { fg: [GLSL.vec4, <GLVec4>ONE4] } : null)
    },
    state: {
        blend: true,
        blendFn: DEFAULT_BLEND
    }
});
