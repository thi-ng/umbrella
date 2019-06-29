import { normalize } from "@thi.ng/vectors";
import {
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
import { autoNormalMatrix2 } from "../matrices";
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
        position: "vec3",
        normal: "vec3",
        ...(opts.uv ? { [opts.uv]: "vec2" } : null),
        ...(opts.color && !opts.instanceColor
            ? { [opts.color]: "vec3" }
            : null),
        ...(opts.instancePos ? { [opts.instancePos]: "vec3" } : null),
        ...(opts.instanceColor ? { [opts.instanceColor]: "vec3" } : null)
    },
    varying: {
        col: "vec3",
        normal: "vec3",
        ...(opts.uv ? { uv: "vec2" } : null)
    },
    uniforms: {
        model: "mat4",
        view: "mat4",
        proj: "mat4",
        normalMat: ["mat4", autoNormalMatrix2()],
        lightDir: ["vec3", <GLVec3>normalize(null, [-1, 1, 1])],
        lightCol: ["vec3", [1, 1, 1]],
        ...defMaterial(
            { diffuseCol: [1, 1, 1], ...opts.material },
            { specularCol: false }
        ),
        ...(opts.uv ? { tex: "sampler2D" } : null),
        alpha: ["float", 1],
        bidir: ["bool", 0]
    },
    state: {
        depth: true,
        ...opts.state
    }
});
