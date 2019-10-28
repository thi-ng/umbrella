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
    magSq2,
    mixN2,
    mulN2,
    normalize,
    randNorm,
    rotateZ,
    setS2
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
    // cache: new LRU<Float32Array>(NUM)
});

const vel = defComponent("vel", NUM, {
    size: 2,
    default: () => randNorm([0, 0])
    // cache: new LRU<Float32Array>(NUM)
});

const group = new Group([pos, vel]);

for (let i = 0; i < NUM; i++) {
    pos.add(i);
    vel.add(i);
}

const tmp = [0, 0];
const tmp2 = [0, 0];
const dir = [0, 0];

const moveBatch = (
    { pos, vel }: IObjectOf<ComponentInfo>,
    num: number,
    t: number,
    amp: number
) => {
    const { buffer: pbuf, stride: pstride } = pos;
    const { buffer: vbuf, stride: vstride } = vel;
    for (let i = 0; i < num; i++) {
        const ip = i * pstride;
        const iv = i * vstride;
        setS2(tmp, pbuf, 0, ip);
        setS2(tmp2, vbuf, 0, iv);
        normalize(
            null,
            mixN2(null, tmp2, dir, 0.01 + 0.2 * fract((i + t) / num))
        );
        const m = magSq2(tmp);
        rotateZ(null, tmp, m * amp);
        if (m >= 4e4) {
            mulN2(null, tmp, 0.98);
            randNorm(tmp2);
        }
        setS2(pbuf, tmp, ip);
        setS2(vbuf, tmp2, iv);
        addS2(pbuf, pbuf, vbuf, ip, ip, iv);
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
            const amp = Math.sin(time / 8) * 4e-7;
            mixN2(dir, dir, randNorm([0, 0]), 0.1);
            moveBatch(group.info, group.n, time, amp);
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
