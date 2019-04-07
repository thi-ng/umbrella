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
    v_col = ${colorAttrib(opts)};
    v_normal = surfaceNormal(a_normal, u_normalMat);
    gl_Position = mvp(${positionAttrib(opts)}, u_model, u_view, u_proj);
}`,
        [surfaceNormal, mvp]
    ),
    fs: defglslA(
        `void main(){
    float lam = lambert(normalize(v_normal), u_lightDir, u_bidir);
    o_fragColor = vec4(u_ambientCol + v_col * u_lightCol * lam, u_alpha);
}`,
        [lambert]
    ),
    attribs: {
        position: GLSL.vec3,
        normal: GLSL.vec3,
        ...(opts.color && !opts.instanceColor
            ? { [opts.color]: GLSL.vec3 }
            : null),
        ...(opts.instancePos ? { [opts.instancePos]: GLSL.vec3 } : null),
        ...(opts.instanceColor ? { [opts.instanceColor]: GLSL.vec3 } : null)
    },
    varying: {
        col: GLSL.vec3,
        normal: GLSL.vec3
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
        alpha: [GLSL.float, 1],
        bidir: [GLSL.bool, 0]
    },
    state: {
        depth: true,
        ...opts.state
    }
});
