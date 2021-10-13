import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defMain, defn } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, FLOAT1, vec4 } from "@thi.ng/shader-ast/ast/lit";
import type { DefShaderOpts } from "@thi.ng/webgl";
import { compileModel } from "@thi.ng/webgl/buffer";
import { draw } from "@thi.ng/webgl/draw";
import { defQuadModel } from "@thi.ng/webgl/geo/quad";
import { defShader } from "@thi.ng/webgl/shader";
import type {
    MainImageFn,
    ShaderToy,
    ShaderToyOpts,
    ShaderToyUniforms,
} from "./api.js";

export const shaderToy = <U extends ShaderToyUniforms>(
    opts: ShaderToyOpts<U>
) => {
    const gl = opts.gl;

    const model = defQuadModel({ uv: false });
    model.textures = opts.textures || [];
    compileModel(gl, model);

    opts.canvas.addEventListener("mousemove", (e) => {
        const rect = opts.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio;
        model.uniforms!.mouse = [
            (e.clientX - rect.left) * dpr,
            (rect.height - (e.clientY - rect.top)) * dpr,
        ];
    });
    opts.canvas.addEventListener("mousedown", (e) => {
        model.uniforms!.mouseButtons = e.buttons;
    });
    opts.canvas.addEventListener("mouseup", (e) => {
        model.uniforms!.mouseButtons = e.buttons;
    });

    let active: boolean;
    let t0: number;

    const update = (time: number) => {
        const w = gl.drawingBufferWidth;
        const h = gl.drawingBufferHeight;
        model.uniforms!.time = time;
        model.uniforms!.resolution = [w, h];

        gl.viewport(0, 0, w, h);
        draw(model);
    };

    const updateRAF = () => {
        update((Date.now() - t0) * 1e-3);
        active && requestAnimationFrame(updateRAF);
    };

    const instance: ShaderToy<U> = {
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
        recompile(main: MainImageFn<U>, shaderOpts?: Partial<DefShaderOpts>) {
            if (model.shader) {
                model.shader.release();
            }
            model.shader = defShader(
                gl,
                {
                    vs: (gl, _, ins) => [
                        defMain(() => [
                            assign(
                                gl.gl_Position,
                                vec4(ins.position, FLOAT0, FLOAT1)
                            ),
                        ]),
                    ],
                    fs: (gl, unis, _, outputs) => [
                        defMain(() => [
                            assign(
                                outputs.fragColor,
                                defn("vec4", "mainImage", [], () =>
                                    main(gl, <any>unis)
                                )()
                            ),
                        ]),
                    ],
                    attribs: {
                        position: "vec2",
                    },
                    uniforms: {
                        resolution: "vec2",
                        mouse: ["vec2", [0, 0]],
                        mouseButtons: ["int", 0],
                        time: "float",
                        ...opts.uniforms,
                    },
                },
                shaderOpts || opts.opts
            );
        },
        model,
    };
    instance.recompile(opts.main);
    return instance;
};
