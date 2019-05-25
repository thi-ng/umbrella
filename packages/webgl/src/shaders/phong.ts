import {
    GLSL,
    Material,
    ShaderOpts,
    ShaderSpec
} from "../api";
import { defglslA } from "../glsl/assemble";
import { surfaceNormal } from "../glsl/vertex";
import { defMaterial } from "../material";
import { autoNormalMatrix1 } from "../matrices";
import { colorAttrib, positionAttrib } from "../utils";

export type PhongOpts = ShaderOpts<
    Pick<Material, "ambientCol" | "diffuseCol" | "specularCol">
>;

export const PHONG = (opts: Partial<PhongOpts> = {}): ShaderSpec => ({
    vs: defglslA(
        `void main(){
    vec3 pos = ${positionAttrib(opts)};
    vec4 worldPos = u_model * vec4(pos, 1.0);
    v_normal = surfaceNormal(a_normal, u_normalMat);
    v_light = u_lightPos - worldPos.xyz;
    v_eye = u_eyePos - worldPos.xyz;
    v_col = ${colorAttrib(opts)};
    gl_Position = u_proj * u_view * worldPos;
}`,
        [surfaceNormal]
    ),
    fs: `void main() {
    vec3 N = normalize(v_normal);
    vec3 L = normalize(v_light);
    float directional = max(0.0, dot(N, L));
    float specular = directional > 0.0
        ? pow(dot(N, normalize(L + normalize(v_eye))), u_shininess)
        : 0.0;
    o_fragColor = u_ambientCol + v_col * directional * u_lightCol + u_specularCol * specular;
}`,
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
        normal: GLSL.vec3,
        eye: GLSL.vec3,
        light: GLSL.vec3,
        col: GLSL.vec3
    },
    uniforms: {
        model: GLSL.mat4,
        normalMat: [GLSL.mat4, autoNormalMatrix1()],
        view: GLSL.mat4,
        proj: GLSL.mat4,
        shininess: [GLSL.float, 32],
        eyePos: GLSL.vec3,
        lightPos: [GLSL.vec3, [0, 0, 2]],
        lightCol: [GLSL.vec3, [1, 1, 1]],
        ...defMaterial(opts.material)
    },
    state: { depth: true, ...opts.state }
});
