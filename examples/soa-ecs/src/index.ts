import { adaptDPI } from "@thi.ng/adapt-dpi";
import { Type } from "@thi.ng/api";
import { ECS, GroupInfo, GroupTuple } from "@thi.ng/ecs";
import { start } from "@thi.ng/hdom";
import { canvasWebGL } from "@thi.ng/hdom-components";
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
    vec4,
} from "@thi.ng/shader-ast";
import {
    add2,
    addS2,
    magSq2,
    magSqS2,
    mixN2,
    mixNS2,
    mulN2,
    mulNS2,
    normalize,
    normalizeS2,
    randNorm,
    randNormS2,
    rotate,
    rotateS2,
    setVN4,
} from "@thi.ng/vectors";
import {
    BLEND_ADD,
    compileModel,
    defShader,
    draw,
    DrawMode,
    GLMat4,
    GLVec4,
    ModelSpec,
    ShaderSpec,
} from "@thi.ng/webgl";

const BATCH_UPDATE = true;

const NUM = 100000;
const W = 480;
const W2 = W / 2;

const ALPHA = 0.3;
const COLOR = [1, 0.7, 0.1, 0.001];
const COLOR2 = [0.1, 0.9, 1, 0.001];

// component type mapping used to configure ECS and all of its derived types
interface CompSpecs {
    pos: Float32Array;
    vel: Float32Array;
}

const ecs = new ECS<CompSpecs>({ capacity: NUM });

const pos = ecs.defComponent({
    id: "pos",
    type: Type.F32,
    size: 2,
})!;

const vel = ecs.defComponent({
    id: "vel",
    type: Type.F32,
    size: 2,
    default: () => randNormS2([0, 0]),
})!;

const group = ecs.defGroup([pos, vel]);

for (let i = 0; i < NUM; i++) {
    ecs.defEntity([pos, vel]);
}

const dir = [0, 0];

// batch version of `updateSingle` below...
// uses strided vector ops to update the flat component buffers
// on my MBP2015 this is about 1.5 - 2x faster
const updateBatch = (
    info: GroupInfo<CompSpecs, "pos" | "vel">,
    num: number,
    t: number,
    amp: number
) => {
    const { values: pos, stride: ps } = info.pos;
    const { values: vel, stride: vs } = info.vel;
    const invNum = 1 / num;
    for (let i = 0; i < num; i++) {
        const ip = i * ps;
        const iv = i * vs;
        const m = magSqS2(pos, ip);
        rotateS2(pos, pos, m * amp, ip, ip);
        if (m < 4e4) {
            mixNS2(vel, vel, dir, 0.01 + 0.2 * fract((i + t) * invNum), iv, iv);
            normalizeS2(vel, vel, 1, iv, iv);
        } else {
            mulNS2(pos, pos, 0.98, ip, ip);
            randNormS2(vel, 1, undefined, iv);
        }
        addS2(pos, pos, vel, ip, ip, iv);
    }
};

const updateSingle = (
    { pos, vel }: GroupTuple<CompSpecs, "pos" | "vel">,
    i: number,
    t: number,
    amp: number
) => {
    const m = magSq2(pos);
    rotate(pos, pos, m * amp);
    if (m < 4e4) {
        normalize(vel, mixN2(vel, vel, dir, 0.01 + 0.2 * fract((i + t) / NUM)));
    } else {
        mulN2(pos, pos, 0.98);
        randNorm(vel);
    }
    add2(pos, pos, vel);
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
            assign(gl.gl_PointSize, float(2)),
        ]),
    ],
    fs: (gl, unis, ins, outs) => [
        defMain(() => [assign(outs.fragColor, ins.vcol)]),
    ],
    attribs: {
        position: "vec2",
    },
    varying: {
        vcol: "vec4",
    },
    uniforms: {
        proj: "mat4",
        color: "vec4",
        color2: "vec4",
    },
    state: {
        depth: false,
        blend: true,
        blendFn: BLEND_ADD,
    },
};

const app = () => {
    let model: ModelSpec;
    let targetDir = [0, 0];
    const canvas = canvasWebGL({
        init: (_, gl) => {
            model = compileModel(gl, {
                attribs: {
                    position: {
                        data: <Float32Array>pos.packedValues(),
                        size: 2,
                    },
                },
                shader: defShader(gl, pointShader),
                uniforms: {
                    proj: <GLMat4>ortho([], -W2, W2, -W2, W2, 0, 1),
                    color: COLOR,
                    color2: COLOR2,
                },
                num: NUM,
                mode: DrawMode.POINTS,
            });
        },
        update: (el, gl, __, time) => {
            // nothing to be done in first frame
            if (!model) {
                adaptDPI(el, W, W);
                return;
            }
            time *= 0.001;
            mixN2(dir, dir, randNormS2(targetDir), 0.1);

            // animate particles and update WebGL buffer
            BATCH_UPDATE
                ? group.run(updateBatch, time, Math.sin(time / 8) * 4e-7)
                : group.forEach(updateSingle, time, Math.sin(time / 8) * 4e-7);
            model.attribs.position.buffer!.set(model.attribs.position.data!);

            const alpha = Math.pow(Math.min(time / 5, 1), 3) * ALPHA;
            if (alpha < 1) {
                const col1 = <GLVec4>model.uniforms!.color;
                const col2 = <GLVec4>model.uniforms!.color2;
                setVN4(col1, col1, alpha);
                setVN4(col2, col2, alpha);
            }

            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            draw(model);
        },
    });
    return () => [
        "div.bg-black.vh-100.flex.flex-column.items-center.justify-center",
        [canvas, { width: W, height: W }],
    ];
};

start(app());
