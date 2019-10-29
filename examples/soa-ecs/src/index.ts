import { IObjectOf } from "@thi.ng/api";
import { ComponentInfo, defComponent, Group } from "@thi.ng/ecs";
import { start } from "@thi.ng/hdom";
import { adaptDPI, canvasWebGL } from "@thi.ng/hdom-components";
import { fract } from "@thi.ng/math";
import { ortho } from "@thi.ng/matrices";
import {
    $y,
    assign,
    defMain,
    float,
    Mat4Sym,
    mix,
    mul,
    Vec2Sym,
    vec4
} from "@thi.ng/shader-ast";
import {
    addS2,
    magSqS2,
    mixN2,
    mixNS2,
    mulNS2,
    normalizeS2,
    randNorm,
    randNormS2,
    rotateS2
} from "@thi.ng/vectors";
import {
    BLEND_ADD,
    compileModel,
    draw,
    GLMat4,
    ModelSpec,
    shader,
    ShaderSpec
} from "@thi.ng/webgl";

const NUM = 100000;
const W = 480;
const W2 = W / 2;

const ALPHA = 0.3;
const COLOR = [1, 0.7, 0.1];
const COLOR2 = [0.1, 0.9, 1];

const pos = defComponent("pos", NUM, {
    size: 2
});

const vel = defComponent("vel", NUM, {
    size: 2,
    default: () => randNormS2([0, 0])
});

const group = new Group([pos, vel]);

for (let i = 0; i < NUM; i++) {
    pos.add(i);
    vel.add(i);
}

const dir = [0, 0];

const moveBatch = (
    info: IObjectOf<ComponentInfo>,
    num: number,
    t: number,
    amp: number
) => {
    const { buffer: pos, stride: ps } = info.pos;
    const { buffer: vel, stride: vs } = info.vel;
    for (let i = 0; i < num; i++) {
        const ip = i * ps;
        const iv = i * vs;
        normalizeS2(
            vel,
            mixNS2(vel, vel, dir, 0.01 + 0.2 * fract((i + t) / num), iv, iv, 0),
            1,
            iv,
            iv
        );
        const m = magSqS2(pos, ip);
        rotateS2(pos, pos, m * amp, ip, ip);
        if (m >= 4e4) {
            mulNS2(pos, pos, 0.98, ip, ip);
            randNormS2(vel, 1, undefined, iv);
        }
        addS2(pos, pos, vel, ip, ip, iv);
    }
};

const pointShader: ShaderSpec = {
    vs: (gl, unis, ins, outs) => [
        defMain(() => [
            assign(
                outs.vcol,
                mix(
                    unis.color,
                    unis.color2,
                    mul(0.006, $y(<Vec2Sym>ins.position))
                )
            ),
            assign(
                gl.gl_Position,
                mul(<Mat4Sym>unis.proj, vec4(<Vec2Sym>ins.position, 0, 1))
            ),
            assign(gl.gl_PointSize, float(2))
        ])
    ],
    fs: (gl, unis, ins, outs) => [
        defMain(() => [assign(outs.fragColor, ins.vcol)])
    ],
    attribs: {
        position: "vec2"
    },
    varying: {
        vcol: "vec4"
    },
    uniforms: {
        proj: "mat4",
        color: "vec4",
        color2: "vec4"
    },
    state: {
        depth: false,
        blend: true,
        blendFn: BLEND_ADD
    }
};

const app = () => {
    let model: ModelSpec;
    const canvas = canvasWebGL({
        init: (_, gl) => {
            model = compileModel(gl, {
                attribs: {
                    position: {
                        data: pos.packedValues(),
                        size: 2
                    }
                },
                shader: shader(gl, pointShader),
                uniforms: {
                    proj: <GLMat4>ortho([], -W2, W2, -W2, W2, 0, 1),
                    color: [...COLOR, 0.001],
                    color2: [...COLOR2, 0.001]
                },
                num: NUM,
                mode: gl.POINTS
            });
        },
        update: (el, gl, __, time) => {
            if (!model) return;
            time *= 0.001;
            mixN2(dir, dir, randNormS2([0, 0]), 0.1);
            moveBatch(group.info, group.n, time, Math.sin(time / 8) * 4e-7);
            model.attribs.position.buffer!.set(model.attribs.position.data!);

            const alpha = Math.pow(Math.min(time / 5, 1), 3) * ALPHA;
            model.uniforms!.color = [...COLOR, alpha];
            model.uniforms!.color2 = [...COLOR2, alpha];

            adaptDPI(el, W, W);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            draw(model);
        }
    });
    return () => [
        "div.bg-black.vh-100.flex.flex-column.items-center.justify-center",
        [canvas, { width: W, height: W }]
    ];
};

start(app());
