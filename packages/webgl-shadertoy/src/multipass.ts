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
    uniforms?: ShaderUniformSpecs;
    uniformVals?: UniformValues;
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

    const fbos = opts.passes
        .slice(0, opts.passes.length - 1)
        .map((passOpts) =>
            fbo(gl, { tex: passOpts.outputs.map((id) => textures[id]) })
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
            uniforms: {
                ...passOpts.uniforms,
                ...(numIns ? { inputs: ["sampler2D[]", numIns] } : null)
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

    const model = quad(false);
    compileModel(gl, model);

    let active: boolean;
    let t0: number;

    const drawPass = (i: number, res: number[], time: number) => {
        model.uniforms = {
            ...opts.passes[i].uniformVals
        };
        const shader = shaders[i];
        shader.uniforms.time && (model.uniforms!.time = time);
        shader.uniforms.resolution && (model.uniforms!.resolution = res);
        model.shader = shader;
        model.textures = opts.passes[i].inputs.map((id) => textures[id]);
        draw(model);
    };

    const update = () => {
        const w = gl.drawingBufferWidth;
        const h = gl.drawingBufferHeight;
        const time = (Date.now() - t0) * 1e-3;
        const res = [w, h];

        gl.viewport(0, 0, w, h);
        for (let i = 0; i < fbos.length; i++) {
            fbos[i].bind();
            drawPass(i, res, time);
            fbos[i].unbind();
        }
        drawPass(shaders.length - 1, res, time);

        if (active) {
            requestAnimationFrame(update);
        }
    };

    const instance: ShaderToy = {
        start() {
            t0 = Date.now();
            active = true;
            requestAnimationFrame(update);
        },
        stop() {
            active = false;
        },
        recompile() {},
        model
    };

    return instance;
};
