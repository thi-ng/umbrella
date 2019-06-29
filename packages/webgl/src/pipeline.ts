import { ShaderSpec } from "./api";
import { ALIAS_TEXTURE } from "./glsl/syntax";

export const PASSTHROUGH_VS =
    "void main(){v_uv=a_uv;gl_Position=vec4(a_position,0.0,1.0);}";

export const PASSTHROUGH_FS = "void main(){o_fragColor=texture(u_tex,v_uv);}";

export const FX_SHADER_SPEC: ShaderSpec = {
    vs: PASSTHROUGH_VS,
    fs: PASSTHROUGH_FS,
    pre: ALIAS_TEXTURE,
    attribs: { position: "vec2", uv: "vec2" },
    varying: { uv: "vec2" },
    uniforms: { tex: "sampler2D" },
    state: { depth: false },
    ext: {}
};
