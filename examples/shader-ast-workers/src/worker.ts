import { timedResult } from "@thi.ng/bench";
import { hueRgba } from "@thi.ng/color";
import {
    add,
    defn,
    float,
    FloatSym,
    mul,
    program,
    ret,
    sym,
    vec2,
    Vec2Sym,
    vec4
} from "@thi.ng/shader-ast";
import { renderPixels, targetJS } from "@thi.ng/shader-ast-js";
import {
    additive,
    aspectCorrectedUV,
    fit1101,
    snoise2
} from "@thi.ng/shader-ast-stdlib";
import {
    comp,
    map,
    normRange,
    slidingWindow,
    step
} from "@thi.ng/transducers";
import { sma } from "@thi.ng/transducers-stats";
import { WorkerJob, WorkerResult } from "./api";

// color table to tint each worker's region
const COLORS = [
    ...map((i) => hueRgba([], i), normRange(navigator.hardwareConcurrency))
];

// see shader-ast-noise example
const mainImage = defn(
    "vec4",
    "mainImage",
    ["vec2", "vec2", "float", "vec3"],
    (fragCoord, res, time, col) => {
        let uv: Vec2Sym;
        let n: FloatSym;
        return [
            (uv = sym(aspectCorrectedUV(fragCoord, res))),
            (n = sym(
                additive("vec2", snoise2, 2)(add(uv, time), vec2(2), float(0.5))
            )),
            ret(vec4(mul(col, fit1101(n)), 1))
        ];
    }
);

// compile shader AST function to JS
const shaderProgram = targetJS().compile(program([mainImage])).mainImage;

const stats = step(comp(sma(10), slidingWindow(24)));

const $self: Worker = <any>self;
self.addEventListener("message", (e) => {
    const job = <WorkerJob>e.data;
    const h = job.y2 - job.y1;
    const [buf, time] = timedResult(() =>
        renderPixels(
            (frag) =>
                shaderProgram(
                    frag,
                    [job.width, job.height],
                    job.time,
                    COLORS[job.id]
                ),
            new Uint32Array(job.width * h),
            job.width,
            h,
            0,
            0,
            job.width,
            h,
            0,
            job.y1,
            job.height
        )
    );
    $self.postMessage(<WorkerResult>{ buf, stats: stats(time) }, [buf.buffer]);
});
