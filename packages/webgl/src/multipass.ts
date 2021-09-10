import type { IObjectOf } from "@thi.ng/api";
import { assert } from "@thi.ng/api/assert";
import {
    $xy,
    assign,
    defMain,
    INT0,
    ivec2,
    texelFetch,
} from "@thi.ng/shader-ast";
import { range } from "@thi.ng/transducers/iter/range";
import { assocObj } from "@thi.ng/transducers/rfn/assoc-obj";
import { some } from "@thi.ng/transducers/rfn/some";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import type { ExtensionBehaviors } from "./api/ext";
import type { Multipass, MultipassOpts, PassOpts } from "./api/multipass";
import type {
    ShaderOutputSpec,
    ShaderSpec,
    ShaderUniformSpecs,
    UniformDecl,
} from "./api/shader";
import type { ITexture } from "./api/texture";
import { compileModel } from "./buffer";
import { isFloatTexture, isGL2Context } from "./checks";
import { draw } from "./draw";
import { defFBO } from "./fbo";
import { defQuadModel } from "./geo/quad";
import { defShader } from "./shader";
import { PASSTHROUGH_VS } from "./shaders/pipeline";
import { defTexture } from "./texture";

export const defMultiPass = (opts: MultipassOpts) => {
    const gl = opts.gl;
    const numPasses = opts.passes.length;
    assert(numPasses > 0, "require at least one shader pass");

    const useMainBuffer = !opts.passes[numPasses - 1].outputs.length;
    const textures = initTextures(opts);
    const passes = initPasses(opts, textures);
    const fbos = initBuffers(opts, textures, useMainBuffer);

    const drawPass = (i: number, time: number) => {
        const spec = opts.passes[i];
        const pass = passes[i];
        const shader = pass.shader;
        const size = spec.outputs.length
            ? textures[spec.outputs[0]].size
            : [gl.drawingBufferWidth, gl.drawingBufferHeight];
        shader.uniforms.resolution && (pass.uniforms!.resolution = size);
        shader.uniforms.time && (pass.uniforms!.time = time);
        gl.viewport(0, 0, size[0], size[1]);
        draw(pass);
    };

    const update = (time: number) => {
        for (let i = 0; i < fbos.length; i++) {
            fbos[i].bind();
            drawPass(i, time);
            fbos[i].unbind();
        }
        useMainBuffer && drawPass(numPasses - 1, time);
    };

    const updateRAF = () => {
        update((Date.now() - t0) * 1e-3);
        active && (rafID = requestAnimationFrame(updateRAF));
    };

    let active: boolean;
    let t0 = Date.now();
    let rafID: number;

    const instance: Multipass = {
        start() {
            t0 = Date.now();
            active = true;
            rafID = requestAnimationFrame(updateRAF);
        },
        stop() {
            if (active) {
                active = false;
                cancelAnimationFrame(rafID);
            }
        },
        update(time: number) {
            update(time);
        },
        passes: opts.passes,
        fbos,
        models: passes,
        textures,
    };

    return instance;
};

const initPasses = (opts: MultipassOpts, textures: IObjectOf<ITexture>) => {
    const gl = opts.gl;
    const model = compileModel(gl, defQuadModel({ uv: false }));
    return opts.passes.map((pass) => {
        const m = pass.model ? compileModel(gl, <any>pass.model) : { ...model };
        m.shader = initShader(gl, pass, textures);
        m.uniforms = { ...pass.uniformVals };
        pass.inputs.length > 0 &&
            (m.textures = pass.inputs.map((id) => textures[id]));
        return m;
    });
};

const initShader = (
    gl: WebGLRenderingContext,
    pass: PassOpts,
    textures: IObjectOf<ITexture>
) => {
    const isGL2 = isGL2Context(gl);
    const numIns = pass.inputs.length;
    const numOuts = pass.outputs.length;
    const ext: ExtensionBehaviors = {};
    const spec: ShaderSpec = {
        vs: pass.vs || PASSTHROUGH_VS,
        fs: pass.fs,
        attribs: pass.attribs || {
            position: "vec2",
        },
        varying: pass.varying,
        uniforms: <ShaderUniformSpecs>{
            ...pass.uniforms,
            ...transduce(
                map(
                    (i) =>
                        <[string, UniformDecl]>[`input${i}`, ["sampler2D", i]]
                ),
                assocObj(),
                range(numIns)
            ),
        },
        outputs: numOuts
            ? transduce(
                  map(
                      (i) =>
                          <[string, ShaderOutputSpec]>[
                              `output${i}`,
                              ["vec4", i],
                          ]
                  ),
                  assocObj(),
                  range(numOuts)
              )
            : undefined,
        state: pass.state,
        pre: pass.pre,
        post: pass.post,
        replacePrelude: pass.replacePrelude,
        generateDecls: pass.generateDecls,
        ext,
    };
    const floatIn = some((id) => isFloatTexture(textures[id]), pass.inputs);
    const floatOut = some((id) => isFloatTexture(textures[id]), pass.outputs);
    if (!isGL2) {
        floatIn && (ext.OES_texture_float = "require");
        numOuts > 1 && (ext.WEBGL_draw_buffers = "require");
    }
    if (floatOut) {
        ext[isGL2 ? "EXT_color_buffer_float" : "WEBGL_color_buffer_float"] =
            "require";
    }
    return defShader(gl, spec);
};

const initTextures = (opts: MultipassOpts) =>
    Object.keys(opts.textures).reduce((acc, id) => {
        acc[id] = defTexture(opts.gl, {
            width: opts.width,
            height: opts.height,
            filter: opts.gl.NEAREST,
            wrap: opts.gl.CLAMP_TO_EDGE,
            image: null,
            ...opts.textures[id],
        });
        return acc;
    }, <IObjectOf<ITexture>>{});

const initBuffers = (
    opts: MultipassOpts,
    textures: IObjectOf<ITexture>,
    useMainBuffer: boolean
) =>
    (useMainBuffer
        ? opts.passes.slice(0, opts.passes.length - 1)
        : opts.passes
    ).map((pass) =>
        defFBO(opts.gl, { tex: pass.outputs.map((id) => textures[id]) })
    );

/**
 * Returns a dynamically generated single pass spec ({@link PassOpts}) for use
 * within a larger multipass pipeline spec, and which copies given `src`
 * textures into their respective `dest` textures (e.g. for feedback purposes).
 *
 * @remarks
 * Both arrays must have same length. The first `src` texture is written to the
 * first `dest` tex, etc.
 *
 * WebGL2 only (uses `texelFetch()`)
 *
 * @param src
 * @param dest
 */
export const passCopy = (src: string[], dest: string[]): PassOpts => {
    assert(
        src.length === dest.length,
        `require same number of in/out textures`
    );
    return {
        fs: (gl, unis, _, outs) => [
            defMain(() => [
                ...map(
                    (i) =>
                        assign(
                            outs[`output${i}`],
                            texelFetch(
                                unis[`input${i}`],
                                ivec2($xy(gl.gl_FragCoord)),
                                INT0
                            )
                        ),
                    range(src.length)
                ),
            ]),
        ],
        inputs: src,
        outputs: dest,
    };
};
