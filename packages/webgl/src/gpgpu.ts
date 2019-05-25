import { assert, IRelease } from "@thi.ng/api";
import { mergeDeepObj } from "@thi.ng/associative";
import { ceilPow2 } from "@thi.ng/binary";
import { isNumber, isTypedArray } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import {
    assocObj,
    map,
    range,
    transduce
} from "@thi.ng/transducers";
import {
    GL_RGBA,
    GL_RGBA32F,
    GLSL,
    GPGPUJobConfig,
    GPGPUJobExecOpts,
    GPGPUOpts,
    GPGPUTextureConfig,
    ITexture,
    ModelSpec,
    ShaderSpec
} from "./api";
import { compileModel } from "./buffer";
import { getExtensions, glCanvas } from "./canvas";
import { draw } from "./draw";
import { FBO } from "./fbo";
import { quad } from "./geo/quad";
import { FX_SHADER_SPEC } from "./pipeline";
import { shader } from "./shader";
import { floatTexture, texture } from "./texture";
import { isGL2Context } from "./utils";

export const gpgpu = (opts: GPGPUOpts) => new GPGPU(opts);

interface GPGPUIO {
    tex: ITexture;
    opts: GPGPUTextureConfig;
}

export class GPGPU implements IRelease {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    fbo: FBO;
    inputs: GPGPUIO[];
    outputs: GPGPUIO[];
    spec: ModelSpec;
    opts: GPGPUOpts;
    width: number;
    size: number;

    constructor(opts: GPGPUOpts) {
        opts = { version: 1, inputs: 1, outputs: 1, ...opts };
        const width = ceilPow2(Math.ceil(Math.sqrt(opts.size / 4)));
        let gl;
        if (opts.gl) {
            gl = opts.gl;
            opts.version = isGL2Context(gl) ? 2 : 1;
        } else {
            const res = glCanvas({
                opts: { antialias: false, alpha: false, depth: false },
                width: 1,
                height: 1,
                autoScale: false,
                version: opts.version
            });
            this.canvas = res.canvas;
            gl = res.gl;
        }
        getExtensions(
            gl,
            opts.version === 1
                ? ["WEBGL_color_buffer_float", "OES_texture_float"]
                : ["EXT_color_buffer_float"]
        );
        this.gl = gl;
        this.opts = opts;
        this.width = width;
        this.size = width * width;
        // let tmp = new Float32Array(this.size);
        this.inputs = this.initTextures(opts.inputs);
        this.outputs = this.initTextures(opts.outputs);
        // tmp = null;
        this.fbo = new FBO(gl);
        this.spec = compileModel(gl, <ModelSpec>{
            ...quad(),
            textures: this.inputs.map((t) => t.tex)
        });
    }

    inputSize(id: number) {
        return this.inputs[id].opts.stride * this.size;
    }

    outputSize(id: number) {
        return this.outputs[id].opts.stride * this.size;
    }

    newJob(opts: Partial<GPGPUJobConfig>) {
        return new GPGPUJob(this, opts);
    }

    release() {
        this.fbo.release();
        for (let t of this.inputs) {
            t.tex.release();
        }
        for (let t of this.outputs) {
            t.tex.release();
        }
        delete this.inputs;
        delete this.outputs;
        delete this.spec;
        delete this.canvas;
        delete this.gl;
        delete this.fbo;
        delete this.opts;
        return true;
    }

    protected initTextures(specs: number | GPGPUTextureConfig[]) {
        const gl = this.gl;
        const width = this.width;
        if (isNumber(specs)) {
            return [
                ...map(
                    () =>
                        <GPGPUIO>{
                            tex: floatTexture(gl, null, width, width),
                            opts: { stride: 4 }
                        },
                    range(specs)
                )
            ];
        } else {
            return specs.map(
                (opts) =>
                    <GPGPUIO>{
                        tex: texture(gl, {
                            width: width,
                            height: width,
                            filter: gl.NEAREST,
                            wrap: gl.CLAMP_TO_EDGE,
                            ...opts
                        }),
                        opts
                    }
            );
        }
    }
}

export class GPGPUJob implements IRelease {
    ctx: GPGPU;
    spec: ModelSpec;
    opts: GPGPUJobConfig;

    constructor(ctx: GPGPU, opts: Partial<GPGPUJobConfig>) {
        opts = {
            inputs: 1,
            outputs: 1,
            ...opts
        };
        assert(
            opts.inputs <= ctx.opts.inputs,
            `context only supports max. ${ctx.opts.inputs} inputs`
        );
        assert(
            opts.outputs <= ctx.opts.outputs,
            `context only supports max. ${ctx.opts.outputs} outputs`
        );
        this.ctx = ctx;
        this.opts = <GPGPUJobConfig>opts;
        this.spec = this.buildSpec();
    }

    run(runOpts: GPGPUJobExecOpts) {
        const inputs = runOpts.inputs;
        const outputs = runOpts.outputs || [...range(this.opts.outputs)];
        assert(inputs.length <= this.opts.inputs, "too many inputs");
        assert(outputs.length <= this.opts.outputs, "too many outputs");
        const ctx = this.ctx;
        const gl = ctx.gl;
        const width = ctx.width;
        const internalFormat = ctx.opts.version === 2 ? GL_RGBA32F : GL_RGBA;
        const spec = this.spec;
        for (let i = 0; i < inputs.length; i++) {
            let tex = inputs[i];
            if (isTypedArray(tex)) {
                const expectedSize = ctx.inputSize(i);
                assert(
                    tex.length >= expectedSize,
                    `input #${i} too small (got ${
                        tex.length
                    }, expected ${expectedSize})`
                );
                const input = ctx.inputs[i];
                input.tex.configure({
                    image: tex,
                    type: input.opts.type || gl.FLOAT,
                    internalFormat: input.opts.internalFormat || internalFormat,
                    format: input.opts.format || GL_RGBA,
                    height: width,
                    width
                });
                tex = input.tex;
            }
            spec.textures[i] = <ITexture>tex;
        }
        spec.uniforms = { ...spec.uniforms, ...runOpts.uniforms };
        ctx.fbo.configure({ tex: outputs.map((i) => ctx.outputs[i].tex) });
        gl.viewport(0, 0, width, width);
        draw(spec);
        return this;
    }

    result(out?: Float32Array, id = 0) {
        const ctx = this.ctx;
        const width = ctx.width;
        const gl = ctx.gl;
        const output = ctx.outputs[id];
        const opts = output.opts;
        const fbo = new FBO(gl, { tex: [output.tex] });
        out = out || new Float32Array(ctx.outputSize(id));
        gl.readPixels(
            0,
            0,
            width,
            width,
            opts.format || gl.RGBA,
            opts.type || gl.FLOAT,
            out
        );
        fbo.release();
        return out;
    }

    release() {
        this.spec.shader.release();
        delete this.spec;
        delete this.ctx;
        return true;
    }

    protected buildSpec() {
        const opts = this.opts;
        const ctx = this.ctx;
        const spec: ModelSpec = mergeDeepObj({}, ctx.spec);
        let shaderSpec: ShaderSpec;
        if (opts.src) {
            shaderSpec = {
                ...FX_SHADER_SPEC,
                pre: `#define WIDTH (${ctx.width})\n#define SIZE (ivec2(${
                    ctx.width
                }))`,
                fs: opts.src,
                uniforms: { ...opts.uniforms },
                outputs: transduce(
                    map((i) => [`output${i}`, [GLSL.vec4, i]]),
                    assocObj(),
                    range(opts.outputs)
                )
            };
        } else if (opts.shader) {
            shaderSpec = opts.shader;
            shaderSpec.uniforms = shaderSpec.uniforms || {};
            shaderSpec.ext = shaderSpec.ext || {};
        } else {
            illegalArgs("require either `src` or `shader` option");
        }
        shaderSpec.uniforms.inputs = [GLSL.sampler2D_array, opts.inputs];
        if (ctx.opts.version === 1 && opts.outputs > 1) {
            shaderSpec.ext.EXT_draw_buffers = "require";
        }
        spec.uniforms.inputs = [...range(opts.inputs)];
        spec.textures = ctx.inputs.slice(0, opts.inputs).map((t) => t.tex);
        spec.shader = shader(ctx.gl, shaderSpec);
        return spec;
    }
}
