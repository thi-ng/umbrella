import { GLSL, ShaderSpec } from "./api";
import { VERSION_CHECK } from "./glsl/syntax";

export const PASSTHROUGH_VS =
    "void main(){v_uv=a_uv;gl_Position=vec4(a_position,0.0,1.0);}";

export const PASSTHROUGH_FS = "void main(){o_fragColor=texture(u_tex,v_uv);}";

export const FX_SHADER_SPEC: ShaderSpec = {
    vs: PASSTHROUGH_VS,
    fs: PASSTHROUGH_FS,
    pre: VERSION_CHECK(300, "", "#define texture texture2D"),
    attribs: { position: GLSL.vec2, uv: GLSL.vec2 },
    varying: { uv: GLSL.vec2 },
    uniforms: { tex: GLSL.sampler2D },
    state: { depth: false }
};
