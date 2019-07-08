import {
    $xy,
    assign,
    defMain,
    FLOAT0,
    FLOAT1,
    vec4
} from "@thi.ng/shader-ast";
import {
    compileModel,
    draw,
    quad,
    shader
} from "@thi.ng/webgl";
import { MainImageFn, ShaderToy, ShaderToyOpts } from "./api";

export const shaderToy = (opts: ShaderToyOpts) => {
    const gl = opts.gl;
    const model = quad(false);
    model.textures = opts.textures || [];
    compileModel(gl, model);

    opts.canvas.addEventListener("mousemove", (e) => {
        const rect = opts.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio;
        model.uniforms!.mouse = [
            (e.clientX - rect.left) * dpr,
            (rect.height - (e.clientY - rect.top)) * dpr
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

    const update = () => {
        const w = gl.drawingBufferWidth;
        const h = gl.drawingBufferHeight;
        model.uniforms!.time = (Date.now() - t0) * 1e-3;
        model.uniforms!.resolution = [w, h];
        gl.viewport(0, 0, w, h);
        draw(model);
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
        recompile(main: MainImageFn) {
            model.shader = shader(gl, {
                vs: (gl, _, ins) => [
                    defMain(() => [
                        assign(
                            gl.gl_Position,
                            vec4(ins.position, FLOAT0, FLOAT1)
                        )
                    ])
                ],
                fs: (gl, unis, _, outputs) => [
                    main,
                    defMain(() => [
                        assign(
                            outputs.fragColor,
                            main(
                                $xy(gl.gl_FragCoord),
                                unis.resolution,
                                unis.mouse,
                                unis.mouseButtons,
                                unis.time
                            )
                        )
                    ])
                ],
                attribs: {
                    position: "vec2"
                },
                uniforms: {
                    resolution: [
                        "vec2",
                        [gl.drawingBufferWidth, gl.drawingBufferHeight]
                    ],
                    mouse: ["vec2", [0, 0]],
                    mouseButtons: ["int", 0],
                    time: "float",
                    ...opts.uniforms
                }
            });
        },
        model
    };
    instance.recompile(opts.main);
    return instance;
};
