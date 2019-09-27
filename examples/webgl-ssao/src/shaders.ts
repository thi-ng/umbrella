import { mergeDeepObj } from "@thi.ng/associative";
import {
    $x,
    $xyz,
    assign,
    defMain,
    mul,
    sub,
    texture,
    vec4
} from "@thi.ng/shader-ast";
import { clamp01 } from "@thi.ng/shader-ast-stdlib";
import {
    FX_SHADER_SPEC,
    FX_SHADER_SPEC_UV,
    ShaderFn,
    ShaderSpec
} from "@thi.ng/webgl";

export const LIGHT_SHADER: ShaderSpec = {
    vs: `void main() {
    v_position = model * vec4(position + offset, 1.0);
    v_normal = model * vec4(normal, 0.0);
    v_uv = uv;
    v_viewPos = view * v_position;
    v_viewNormal = view * v_normal;
    gl_Position = proj * v_viewPos;
}`,
    fs: `void main() {
    vec3 position = v_position.xyz;
    vec3 normal = normalize(v_normal.xyz);
    vec3 baseColor = texture(tex, v_uv).xyz;
    vec3 eyeDir = normalize(eyePos - position);
    vec3 lightDir = normalize(lightPos - position);
    vec3 reflectDir = reflect(-lightDir, normal);
    float diffuse = max(dot(lightDir, normal), 0.0);
    float spec = pow(max(dot(reflectDir, eyeDir), 0.0), shininess);
    o_color = vec4((ambient + diffuse + spec * specular) * baseColor, 1.0);
    o_viewPos = v_viewPos;
    o_viewNormal = v_viewNormal;
}`,
    attribs: {
        position: "vec3",
        normal: "vec3",
        offset: "vec3",
        uv: "vec2"
    },
    varying: {
        v_position: "vec4",
        v_normal: "vec4",
        v_uv: "vec2",
        v_viewPos: "vec4",
        v_viewNormal: "vec4"
    },
    uniforms: {
        model: "mat4",
        view: "mat4",
        proj: "mat4",
        eyePos: "vec3",
        lightPos: "vec3",
        shininess: ["float", 250],
        specular: "float",
        ambient: ["float", 0.15],
        tex: "sampler2D"
    },
    outputs: {
        o_color: ["vec4", 0],
        o_viewPos: ["vec4", 1],
        o_viewNormal: ["vec4", 2]
    },
    state: {
        depth: true,
        cull: true
    }
};

export const SSAO_SHADER: ShaderSpec = {
    ...FX_SHADER_SPEC,
    fs: `const vec2 kernel[4] = vec2[](
    vec2(-K, 0.0), vec2(K, 0.0),
    vec2(0.0, -K), vec2(0.0, K)
);

float occlusionAt(vec3 pos, vec3 normal, ivec2 ipos) {
    vec3 posVec = texelFetch(positionTex, ipos, 0).xyz - pos;
    float intensity = max(dot(normal, normalize(posVec)) - bias, 0.0);
    float attenuation = attenuate + attenuateDist * length(posVec);
    return intensity / attenuation;
}

void main() {
    ivec2 ipos = ivec2(gl_FragCoord.xy);
    vec3 pos = texelFetch(positionTex, ipos, 0).xyz;
    vec3 normal = texelFetch(normalTex, ipos, 0).xyz;
    vec2 noise = normalize(texelFetch(noiseTex, ipos, 0).xy);
    float depth = (length(pos) - depthRange.x) / (depthRange.y - depthRange.x);
    float rScale = sampleRadius * (1.0 - depth);

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
    pre: "#define K (0.707107)",
    uniforms: {
        positionTex: ["sampler2D", 0],
        normalTex: ["sampler2D", 1],
        noiseTex: ["sampler2D", 2],
        sampleRadius: ["float", 32],
        bias: ["float", 0.09],
        attenuate: ["float", 1],
        attenuateDist: ["float", 1],
        depthRange: ["vec2", [0.1, 10]]
    },
    outputs: {
        o_occlusion: "float"
    }
};

export const FINAL_SHADER: ShaderSpec = mergeDeepObj(FX_SHADER_SPEC_UV, {
    fs: <ShaderFn>(
        ((_, unis, ins, outs) => [
            defMain(() => [
                assign(
                    outs.fragColor,
                    vec4(
                        clamp01(
                            sub(
                                $xyz(texture(unis.tex, ins.v_uv)),
                                mul($x(texture(unis.tex2, ins.v_uv)), unis.amp)
                            )
                        ),
                        1
                    )
                )
            ])
        ])
    ),
    uniforms: {
        tex2: ["sampler2D", 1],
        amp: ["float", 1]
    }
});
