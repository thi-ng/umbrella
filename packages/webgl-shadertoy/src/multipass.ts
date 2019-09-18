import { IObjectOf } from "@thi.ng/api";
import {
    assocObj,
    map,
    range,
    some,
    transduce
} from "@thi.ng/transducers";
import { AttribPool } from "@thi.ng/vector-pools";
import {
    compileModel,
    draw,
    ExtensionBehaviors,
    fbo,
    IndexBufferSpec,
    InstancingSpec,
    isFloatTexture,
    isGL2Context,
    ITexture,
    ModelAttributeSpecs,
    PASSTHROUGH_VS,
    quad,
    shader,
    ShaderFn,
    ShaderSpec,
    ShaderUniformSpecs,
    texture,
    TextureOpts,
    UniformDecl,
    UniformValues
} from "@thi.ng/webgl";
import { ShaderToy } from "./api";

export interface ShaderPipelineOpts {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    textures: IObjectOf<Partial<TextureOpts>>;
    passes: PipelinePassOpts[];
    bufferWidth: number;
    bufferHeight: number;
}

export interface PipelinePassOpts {
    vs?: string | ShaderFn;
    fs: string | ShaderFn;
    model?: PipelinePassModelSpec;
    inputs: string[];
    outputs: string[];
    uniforms?: Partial<PipelinePassUniforms>;
    uniformVals?: UniformValues;
}

export interface PipelinePassUniforms {
    inputs: ["sampler2D[]", number, number[]];
    resolution: "vec2";
    time: "float";
    [id: string]: UniformDecl;
}

export interface PipelinePassModelSpec {
    attribs: ModelAttributeSpecs;
    attribPool?: AttribPool;
    uniforms?: UniformValues;
    indices?: IndexBufferSpec;
    instances?: InstancingSpec;
    mode?: GLenum;
    num: number;
}

export const multipassToy = (opts: ShaderPipelineOpts) => {
    const gl = opts.gl;
    const isGL2 = isGL2Context(gl);

    const initShader = (pass: PipelinePassOpts) => {
        const numIns = pass.inputs.length;
        const numOuts = pass.outputs.length;
        const ext: ExtensionBehaviors = {};
        const spec: ShaderSpec = {
            vs: pass.vs || PASSTHROUGH_VS,
            fs: pass.fs,
            attribs: {
                position: "vec2"
            },
            uniforms: <ShaderUniformSpecs>{
                ...pass.uniforms,
                ...(numIns
                    ? {
                          inputs: ["sampler2D[]", numIns, [...range(numIns)]]
                      }
                    : null)
            },
            outputs: numOuts
                ? transduce(
                      map((i) => [`output${i}`, ["vec4", i]]),
                      assocObj(),
                      range(numOuts)
                  )
                : undefined,
            ext
        };
        const floatIn = some((id) => isFloatTexture(textures[id]), pass.inputs);
        const floatOut = some(
            (id) => isFloatTexture(textures[id]),
            pass.outputs
        );
        if (!isGL2 && floatIn) {
            ext.OES_texture_float = "require";
        }
        if (floatOut) {
            ext[isGL2 ? "EXT_color_buffer_float" : "WEBGL_color_buffer_float"] =
                "require";
        }
        if (numOuts > 1) {
            ext.WEBGL_draw_buffers = "require";
        }
        return shader(gl, spec);
    };

    const textures = Object.keys(opts.textures).reduce(
        (acc, id) => {
            acc[id] = texture(gl, {
                width: opts.bufferWidth,
                height: opts.bufferHeight,
                filter: gl.NEAREST,
                wrap: gl.CLAMP_TO_EDGE,
                image: null,
                ...opts.textures[id]
            });
            return acc;
        },
        <IObjectOf<ITexture>>{}
    );

    const model = compileModel(gl, quad(false));
    const models = opts.passes.map((pass) => {
        const m = pass.model ? compileModel(gl, <any>pass.model) : { ...model };
        m.shader = initShader(pass);
        m.uniforms = { ...pass.uniformVals };
        m.textures = pass.inputs.map((id) => textures[id]);
        return m;
    });

    const fbos = opts.passes
        .slice(0, opts.passes.length - 1)
        .map((passOpts) =>
            fbo(gl, { tex: passOpts.outputs.map((id) => textures[id]) })
        );

    const drawPass = (i: number, time: number) => {
        const pass = opts.passes[i];
        const model = models[i];
        const shader = model.shader;
        const size = pass.outputs.length
            ? textures[pass.outputs[0]].size
            : [gl.drawingBufferWidth, gl.drawingBufferHeight];
        shader.uniforms.resolution && (model.uniforms!.resolution = size);
        shader.uniforms.time && (model.uniforms!.time = time);
        gl.viewport(0, 0, size[0], size[1]);
        draw(model);
    };

    const update = (time: number) => {
        for (let i = 0; i < fbos.length; i++) {
            fbos[i].bind();
            drawPass(i, time);
            fbos[i].unbind();
        }
        drawPass(models.length - 1, time);
    };

    const updateRAF = () => {
        update((Date.now() - t0) * 1e-3);
        active && requestAnimationFrame(updateRAF);
    };

    let active: boolean;
    let t0 = Date.now();

    const instance: ShaderToy = {
        start() {
            t0 = Date.now();
            active = true;
            requestAnimationFrame(updateRAF);
        },
        stop() {
            active = false;
        },
        update(time: number) {
            update(time);
        },
        recompile() {},
        model
    };

    return instance;
};
