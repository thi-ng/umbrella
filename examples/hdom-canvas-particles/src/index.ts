import { partial } from "@thi.ng/compose/partial";
import type { Cubic } from "@thi.ng/geom";
import { cubic } from "@thi.ng/geom/cubic";
import { pointAt } from "@thi.ng/geom/point-at";
import { canvas } from "@thi.ng/hdom-canvas";
import { start } from "@thi.ng/hdom/start";
import { cossin } from "@thi.ng/math/angle";
import { wrap01 } from "@thi.ng/math/interval";
import { SYSTEM } from "@thi.ng/random/system";
import { map } from "@thi.ng/transducers/map";
import { range } from "@thi.ng/transducers/range";
import { ZERO2 } from "@thi.ng/vectors/api";
import { sub2 } from "@thi.ng/vectors/sub";

// num curves (should be odd number)
const NUMC = 21;
// num particles
const NUMP = 100;

interface Particle {
    curve: Cubic;
    pos: number;
    vel: number;
}

const makeCurve = (i: number) =>
    cubic(
        [0, i * 30],
        [100 - Math.abs(i) * 10, 0],
        [300, i * 6],
        [600, i * 6],
        { id: i }
    );

const initCurves = () => [
    ...map(makeCurve, range(-(NUMC >> 1), (NUMC >> 1) + 1)),
];

const updateCurves = (curves: Cubic[], t: number) => {
    for (let i = curves.length; i-- > 0; ) {
        const crv = curves[i];
        const pts = crv.points;
        const id = crv.attribs!.id;
        const [c, s] = cossin(t + id * 0.07);
        const c2 = Math.cos(t * 0.25 - id * 0.05);
        pts[0][1] = (1 - Math.abs(c2)) * id * 30;
        pts[2][0] = s * 100 + 300;
        pts[2][1] = c * 150 + id * 6;
        pts[3][1] = id * Math.abs(c * 12);
    }
};

const makeParticle = (curves: Cubic[]) => ({
    curve: curves[SYSTEM.int() % curves.length],
    pos: 0,
    vel: SYSTEM.minmax(0.002, 0.01),
});

const updateParticles = (particles: Particle[]) => {
    for (let i = particles.length; i-- > 0; ) {
        const p = particles[i];
        p.pos = wrap01(p.pos + p.vel);
    }
};

const particle = (p: Particle) => {
    // compute point on cubic bezier
    const pos = pointAt(p.curve, p.pos)!;
    // need to use translate here only because of gradient
    return [
        "line",
        { translate: pos },
        // compute 2nd end point in local space
        sub2(null, pointAt(p.curve, p.pos - 0.05)!, pos),
        ZERO2,
    ];
};

// gradient definition (using RGBA)
const GRAD = [
    "defs",
    {},
    // gradient for curves
    [
        "linearGradient",
        { id: "curve", from: [0, 0], to: [600, 0] },
        [
            [0, [0.6, 0.01, 0]],
            [1, [0.2, 0, 0.6]],
        ],
    ],
    // for particles
    [
        "linearGradient",
        { id: "part", from: [-20, 0], to: [0, 0] },
        [
            [0, [1, 0, 0, 0]],
            [1, [1, 0.8, 0.5, 0.8]],
        ],
    ],
];

const app = () => {
    const curves = initCurves();
    const particles = [...map(partial(makeParticle, curves), range(NUMP))];
    let t = 0;
    return () => {
        updateCurves(curves, (t += 0.02));
        updateParticles(particles);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scale = width / 600;
        return [
            canvas,
            { width, height, __diff: false },
            GRAD,
            [
                "g",
                {
                    translate: [0, height / 2],
                    scale,
                    stroke: "$curve",
                    compose: "screen",
                },
                ...curves,
                [
                    "g",
                    { stroke: "$part", weight: 2 },
                    ...map(particle, particles),
                ],
            ],
        ];
    };
};

start(app());
