import { Path } from "@thi.ng/api";
import { mergeDeepObj } from "@thi.ng/associative";
import { sin } from "@thi.ng/dsp";
import { start } from "@thi.ng/hdom";
import { canvasWebGL2 } from "@thi.ng/hdom-components";
import { lookAt, perspective, transform44 } from "@thi.ng/matrices";
import { getter, mutator } from "@thi.ng/paths";
import { repeatedly } from "@thi.ng/transducers";
import { rotateY } from "@thi.ng/vectors";
import {
    checkerboard,
    compileModel,
    cube,
    draw,
    error,
    fbo,
    FBO,
    FX_SHADER_SPEC,
    GLMat4,
    GLSL,
    GLVec3,
    ModelSpec,
    quad,
    rbo,
    shader,
    ShaderSpec,
    texture,
    TextureOpts
} from "@thi.ng/webgl";

const W = 1024;
const H = 512;

const LIGHT_SHADER: ShaderSpec = {
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

const SSAO_SHADER: ShaderSpec = mergeDeepObj(FX_SHADER_SPEC, {
    fs: `#define K (0.707107)

    const vec2 kernel[4] = vec2[](
        vec2(-K, 0.0), vec2(K, 0.0),
        vec2(0.0, -K), vec2(0.0, K)
    );

    float occlusionAt(vec3 pos, vec3 normal, ivec2 ipos) {
        vec3 posVec = texelFetch(u_positionTex, ipos, 0).xyz - pos;
        float intensity = max(dot(normal, normalize(posVec)) - u_bias, 0.0);
        float attenuation = u_attenuation.x + u_attenuation.y * length(posVec);
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
        bias: [GLSL.float, 0.1],
        attenuation: [GLSL.vec2, [1.2, 2]],
        depthRange: [GLSL.vec2, [0.1, 10]]
    },
    outputs: {
        occlusion: GLSL.float
    }
});

const FINAL_SHADER: ShaderSpec = mergeDeepObj(FX_SHADER_SPEC, {
    fs: `void main() {
        vec3 col = clamp(texture(u_tex, v_uv).rgb - texture(u_tex2, v_uv).r * u_amp, 0.0, 1.0);
        o_fragColor = vec4(col, 1.0);
    }`,
    uniforms: {
        tex2: [GLSL.sampler2D, 1],
        amp: [GLSL.float, 1]
    }
});

const NOISE = new Float32Array([
    ...repeatedly(() => Math.random() * 2 - 1, W * H * 2)
]);

const LIGHT_POS = [-5, 1.5, -1];

const instancePositions = (o: number) =>
    // prettier-ignore
    new Float32Array([
    -o, 0, 0, o, 0, 0,
    0, -2 * o, 0, 0, 2 * o, 0,
    0, 0, -2 * o, 0, 0, 2 * o
]);

const app = () => {
    let model: ModelSpec;
    let ssaoQuad: ModelSpec;
    let finalQuad: ModelSpec;
    let fboGeo: FBO;
    let fboSSAO: FBO;
    let ctrls;
    const params = { lightTheta: 1.33 };
    const canvas = canvasWebGL2({
        init(_, gl: WebGL2RenderingContext) {
            if (!gl.getExtension("EXT_color_buffer_float")) {
                error("EXT_color_buffer_float not available");
            }
            const [colorTex, posTex, normTex, noiseTex, ssaoTex] = [
                {},
                { internalFormat: gl.RGBA16F, type: gl.FLOAT },
                { internalFormat: gl.RGBA16F, type: gl.FLOAT },
                {
                    image: NOISE,
                    internalFormat: gl.RG16F,
                    format: gl.RG,
                    type: gl.FLOAT
                },
                {}
            ].map((opts: Partial<TextureOpts>) =>
                texture(gl, {
                    width: W,
                    height: H,
                    image: null,
                    filter: gl.NEAREST,
                    wrap: gl.CLAMP_TO_EDGE,
                    ...opts
                })
            );
            fboGeo = fbo(gl, {
                tex: [colorTex, posTex, normTex],
                depth: rbo(gl, { width: W, height: H })
            });
            fboSSAO = fbo(gl, {
                tex: [ssaoTex]
            });
            model = compileModel(gl, {
                ...cube({ uv: true }),
                shader: shader(gl, LIGHT_SHADER),
                instances: {
                    attribs: {
                        offset: {
                            data: instancePositions(1.05)
                        }
                    },
                    num: 6
                },
                uniforms: {
                    lightPos: LIGHT_POS,
                    specular: 0.25
                },
                textures: [
                    texture(gl, {
                        image: checkerboard({
                            size: 16,
                            col1: 0xffc0c0c0,
                            col2: 0xffe0e0e0,
                            corners: true
                        }),
                        filter: gl.NEAREST,
                        wrap: gl.CLAMP_TO_EDGE
                    })
                ]
            });
            ssaoQuad = compileModel(gl, {
                ...quad(false),
                shader: shader(gl, SSAO_SHADER),
                textures: [posTex, normTex, noiseTex],
                uniforms: {
                    sampleRadius: 32,
                    bias: 0.09,
                    attenuation: [1, 1.2],
                    depthRange: [0.1, 10]
                }
            });
            finalQuad = compileModel(gl, {
                ...quad(),
                shader: shader(gl, FINAL_SHADER),
                textures: [colorTex, ssaoTex],
                uniforms: {
                    amp: 1
                }
            });

            ctrls = [
                slider(
                    lens(ssaoQuad, "uniforms.sampleRadius"),
                    { min: 2, max: 64, step: 1 },
                    "radius"
                ),
                slider(
                    lens(ssaoQuad, "uniforms.bias"),
                    { min: -0.2, max: 0.2, step: 0.01 },
                    "bias"
                ),
                slider(
                    lens(ssaoQuad, "uniforms.attenuation.0"),
                    { min: 0.1, max: 2, step: 0.01 },
                    "base attenuation"
                ),
                slider(
                    lens(ssaoQuad, "uniforms.attenuation.1"),
                    { min: 0.1, max: 2, step: 0.01 },
                    "dist attenuation"
                ),
                slider(
                    lens(finalQuad, "uniforms.amp"),
                    { min: 0, max: 1, step: 0.01 },
                    "amplitude"
                ),
                slider(
                    lens(params, "lightTheta"),
                    { min: 0, max: 3.14, step: 0.01 },
                    "light rotation"
                ),
                slider(
                    lens(model, "uniforms.specular"),
                    { min: 0, max: 1, step: 0.01 },
                    "specular"
                )
            ];
        },
        update(_, gl, __, time) {
            const bg = 0.1;
            const eye = [0, 0, 5];
            const p = perspective([], 45, W / H, 0.1, 10);
            const v = lookAt([], eye, [0, 0, 0], [0, 1, 0]);
            const m = transform44(
                [],
                [0, 0, 0],
                [sin(time, 0.00005, 1, 0), time * 0.0003, 0],
                1
            );
            model.instances.attribs.offset.buffer.set(
                instancePositions(sin(time, 0.0004, 0.14, 1.15))
            );
            model.uniforms.model = <GLMat4>m;
            model.uniforms.view = <GLMat4>v;
            model.uniforms.proj = <GLMat4>p;
            model.uniforms.eyePos = <GLVec3>eye;
            model.uniforms.lightPos = <GLVec3>(
                rotateY([], LIGHT_POS, params.lightTheta)
            );
            gl.viewport(0, 0, W, H);
            fboGeo.bind();
            gl.clearColor(bg, bg, bg, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            draw(model);
            fboSSAO.bind();
            draw(ssaoQuad);
            fboSSAO.unbind();
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            draw(finalQuad);
        }
    });
    return () => [
        "div.sans-serif.ma3",
        [canvas, { width: W, height: H }],
        ctrls ? ["div.mt3", ...ctrls] : null
    ];
};

const lens = (obj: any, path: Path) => {
    const _get = getter(path);
    const _set = mutator(path);
    return {
        deref() {
            return _get(obj);
        },
        set(x) {
            _set(obj, x);
        }
    };
};

const slider = (lens, attribs, label) => () => [
    "div.mb2",
    ["span.dib.w4", label],
    [
        "input.w5",
        {
            type: "range",
            value: lens.deref(),
            oninput: (e) => lens.set(parseFloat(e.target.value)),
            ...attribs
        }
    ],
    ["span.ml3", lens.deref()]
];

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
