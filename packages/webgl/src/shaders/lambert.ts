import { normalize } from "@thi.ng/vectors";
import {
    GLSL,
    GLVec3,
    Material,
    ShaderOpts,
    ShaderSpec
} from "../api";
import { defglslA } from "../glsl/assemble";
import { lambert } from "../glsl/lighting";
import { ALIAS_TEXTURE } from "../glsl/syntax";
import { mvp, surfaceNormal } from "../glsl/vertex";
import { defMaterial } from "../material";
import { autoNormalMatrix2 } from "../normal-mat";
import { colorAttrib, positionAttrib } from "../utils";

export type LambertOpts = ShaderOpts<
    Pick<Material, "ambientCol" | "diffuseCol">
>;

export const LAMBERT = (opts: Partial<LambertOpts> = {}): ShaderSpec => ({
    vs: defglslA(
        `void main(){
    ${opts.uv ? `v_uv = a_${opts.uv};` : ""}
    v_col = ${colorAttrib(opts)};
    v_normal = surfaceNormal(a_normal, u_normalMat);
    gl_Position = mvp(${positionAttrib(opts)}, u_model, u_view, u_proj);
}`,
        [surfaceNormal, mvp]
    ),
    fs: defglslA(
        `void main(){
    float lam = lambert(normalize(v_normal), u_lightDir, u_bidir);
    vec3 col = ${opts.uv ? `texture(u_tex, v_uv).xyz * v_col` : "v_col"};
    o_fragColor = vec4(u_ambientCol + col * u_lightCol * lam, u_alpha);
}`,
        [lambert]
    ),
    pre: ALIAS_TEXTURE,
    attribs: {
        position: GLSL.vec3,
        normal: GLSL.vec3,
        ...(opts.uv ? { [opts.uv]: GLSL.vec2 } : null),
        ...(opts.color && !opts.instanceColor
            ? { [opts.color]: GLSL.vec3 }
            : null),
        ...(opts.instancePos ? { [opts.instancePos]: GLSL.vec3 } : null),
        ...(opts.instanceColor ? { [opts.instanceColor]: GLSL.vec3 } : null)
    },
    varying: {
        col: GLSL.vec3,
        normal: GLSL.vec3,
        ...(opts.uv ? { uv: GLSL.vec2 } : null)
    },
    uniforms: {
        model: GLSL.mat4,
        view: GLSL.mat4,
        proj: GLSL.mat4,
        normalMat: [GLSL.mat4, autoNormalMatrix2()],
        lightDir: [GLSL.vec3, <GLVec3>normalize(null, [-1, 1, 1])],
        lightCol: [GLSL.vec3, [1, 1, 1]],
        ...defMaterial(
            { diffuseCol: [1, 1, 1], ...opts.material },
            { specularCol: false }
        ),
        ...(opts.uv ? { tex: GLSL.sampler2D } : null),
        alpha: [GLSL.float, 1],
        bidir: [GLSL.bool, 0]
    },
    state: {
        depth: true,
        ...opts.state
    }
});
