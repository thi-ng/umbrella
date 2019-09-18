import { IObjectOf } from "@thi.ng/api";
import {
    assocObj,
    map,
    range,
    some,
    transduce
} from "@thi.ng/transducers";
import {
    compileModel,
    draw,
    ExtensionBehaviors,
    fbo,
    isFloatTexture,
    isGL2Context,
    ITexture,
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
    passes: ShaderPipelinePassOpts[];
    bufferWidth: number;
    bufferHeight: number;
}

export interface ShaderPipelinePassOpts {
    fn: ShaderFn;
    inputs: string[];
    outputs: string[];
    uniforms?: Partial<PipelinePassUniforms>;
    uniformVals?: UniformValues;
}

export interface PipelinePassUniforms {
    resolution: "vec2";
    time: "float";
    inputs: ["sampler2D[]", number, number[]];
    [id: string]: UniformDecl;
}

export const multipassToy = (opts: ShaderPipelineOpts) => {
    const gl = opts.gl;
    const isGL2 = isGL2Context(gl);
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

    const shaders = opts.passes.map((passOpts) => {
        const numIns = passOpts.inputs.length;
        const numOuts = passOpts.outputs.length;
        const ext: ExtensionBehaviors = {};
        const spec: ShaderSpec = {
            vs: PASSTHROUGH_VS,
            fs: passOpts.fn,
            attribs: {
                position: "vec2"
            },
            uniforms: <ShaderUniformSpecs>{
                ...passOpts.uniforms,
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
        const floatIn = some(
            (id) => isFloatTexture(textures[id]),
            passOpts.inputs
        );
        const floatOut = some(
            (id) => isFloatTexture(textures[id]),
            passOpts.outputs
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
    });

    const fbos = opts.passes
        .slice(0, opts.passes.length - 1)
        .map((passOpts) =>
            fbo(gl, { tex: passOpts.outputs.map((id) => textures[id]) })
        );

    const model = quad(false);
    compileModel(gl, model);

    const drawPass = (i: number, time: number) => {
        const shader = shaders[i];
        const pass = opts.passes[i];
        const size = pass.outputs.length
            ? textures[pass.outputs[0]].size
            : [gl.drawingBufferWidth, gl.drawingBufferHeight];
        model.uniforms = {
            ...pass.uniformVals
        };
        shader.uniforms.resolution && (model.uniforms!.resolution = size);
        shader.uniforms.time && (model.uniforms!.time = time);
        model.shader = shader;
        model.textures = pass.inputs.map((id) => textures[id]);
        gl.viewport(0, 0, size[0], size[1]);
        draw(model);
    };

    const update = (time: number) => {
        for (let i = 0; i < fbos.length; i++) {
            fbos[i].bind();
            drawPass(i, time);
            fbos[i].unbind();
        }
        drawPass(shaders.length - 1, time);
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
