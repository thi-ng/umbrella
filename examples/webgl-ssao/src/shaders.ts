import { mergeDeepObj } from "@thi.ng/associative";
import { FX_SHADER_SPEC, GLSL, ShaderSpec } from "@thi.ng/webgl";

export const LIGHT_SHADER: ShaderSpec = {
    vs: `void main() {
    v_position = u_model * vec4(a_position + a_offset, 1.0);
    v_normal = u_model * vec4(a_normal, 0.0);
    v_uv = a_uv;
    v_viewPos = u_view * v_position;
    v_viewNormal = u_view * v_normal;
    gl_Position = u_proj * v_viewPos;
}`,
    fs: `void main() {
    vec3 position = v_position.xyz;
    vec3 normal = normalize(v_normal.xyz);
    vec3 baseColor = texture(u_tex, v_uv).xyz;
    vec3 eyeDir = normalize(u_eyePos - position);
    vec3 lightDir = normalize(u_lightPos - position);
    vec3 reflectDir = reflect(-lightDir, normal);
    float diffuse = max(dot(lightDir, normal), 0.0);
    float specular = pow(max(dot(reflectDir, eyeDir), 0.0), u_shininess);
    o_color = vec4((u_ambient + diffuse + specular * u_specular) * baseColor, 1.0);
    o_viewPos = v_viewPos;
    o_viewNormal = v_viewNormal;
}`,
    attribs: {
        position: GLSL.vec3,
        normal: GLSL.vec3,
        offset: GLSL.vec3,
        uv: GLSL.vec2
    },
    varying: {
        position: GLSL.vec4,
        normal: GLSL.vec4,
        uv: GLSL.vec2,
        viewPos: GLSL.vec4,
        viewNormal: GLSL.vec4
    },
    uniforms: {
        model: GLSL.mat4,
        view: GLSL.mat4,
        proj: GLSL.mat4,
        eyePos: GLSL.vec3,
        lightPos: GLSL.vec3,
        shininess: [GLSL.float, 250],
        specular: GLSL.float,
        ambient: [GLSL.float, 0.15],
        tex: GLSL.sampler2D
    },
    outputs: {
        color: [GLSL.vec4, 0],
        viewPos: [GLSL.vec4, 1],
        viewNormal: [GLSL.vec4, 2]
    },
    state: {
        depth: true,
        cull: true
    }
};

export const SSAO_SHADER: ShaderSpec = mergeDeepObj(FX_SHADER_SPEC, {
    fs: `#define K (0.707107)

const vec2 kernel[4] = vec2[](
    vec2(-K, 0.0), vec2(K, 0.0),
    vec2(0.0, -K), vec2(0.0, K)
);

float occlusionAt(vec3 pos, vec3 normal, ivec2 ipos) {
    vec3 posVec = texelFetch(u_positionTex, ipos, 0).xyz - pos;
    float intensity = max(dot(normal, normalize(posVec)) - u_bias, 0.0);
    float attenuation = u_attenuate + u_attenuateDist * length(posVec);
    return intensity / attenuation;
}

void main() {
    vec2 foo = v_uv;
    ivec2 ipos = ivec2(gl_FragCoord.xy);
    vec3 pos = texelFetch(u_positionTex, ipos, 0).xyz;
    vec3 normal = texelFetch(u_normalTex, ipos, 0).xyz;
    vec2 noise = normalize(texelFetch(u_noiseTex, ipos, 0).xy);
    float depth = (length(pos) - u_depthRange.x) / (u_depthRange.y - u_depthRange.x);
    float rScale = u_sampleRadius * (1.0 - depth);

    float sum = 0.0;
    for (int i = 0; i < 4; i++) {
        vec2 k1 = reflect(kernel[i], noise) * rScale;
        vec2 k2 = vec2(k1.x - k1.y, k1.x + k1.y) * rScale;
        sum += occlusionAt(pos, normal, ipos + ivec2(k1));
        sum += occlusionAt(pos, normal, ipos + ivec2(k2 * 0.75));
        sum += occlusionAt(pos, normal, ipos + ivec2(k1 * 0.5));
        sum += occlusionAt(pos, normal, ipos + ivec2(k2 * 0.25));
    }

    o_occlusion = clamp(sum / 16.0, 0.0, 1.0);
}`,
    uniforms: {
        positionTex: [GLSL.sampler2D, 0],
        normalTex: [GLSL.sampler2D, 1],
        noiseTex: [GLSL.sampler2D, 2],
        sampleRadius: [GLSL.float, 32],
        bias: [GLSL.float, 0.09],
        attenuate: [GLSL.float, 1],
        attenuateDist: [GLSL.float, 1],
        depthRange: [GLSL.vec2, [0.1, 10]]
    },
    outputs: {
        occlusion: GLSL.float
    }
});

export const FINAL_SHADER: ShaderSpec = mergeDeepObj(FX_SHADER_SPEC, {
    fs: `void main() {
    vec3 col = clamp(texture(u_tex, v_uv).rgb - texture(u_tex2, v_uv).r * u_amp, 0.0, 1.0);
    o_fragColor = vec4(col, 1.0);
}`,
    uniforms: {
        tex2: [GLSL.sampler2D, 1],
        amp: [GLSL.float, 1]
    }
});
