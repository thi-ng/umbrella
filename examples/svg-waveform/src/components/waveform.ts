import { defs, linearGradient, polyline, svg } from "@thi.ng/hiccup-svg";
import { map, range, reduce, reducer } from "@thi.ng/transducers";
import type { AppContext } from "../api";

const TAU = Math.PI * 2;

export interface WaveformOpts {
    phase: number;
    freq: number;
    amp: number;
    harmonics: number;
    hstep: number;
    res: number;
    fill1: string;
    fill2: string;
    stroke: string;
}

/**
 * Additive synthesis and waveform visualization as SVG
 *
 * @param opts
 */
export function waveform(ctx: AppContext, opts: WaveformOpts) {
    const phase = (opts.phase * Math.PI) / 180;
    const amp = opts.amp * 50;
    const fscale = (1 / opts.res) * TAU * opts.freq;
    return svg(
        { ...ctx.ui.waveform, viewBox: `0 -5 ${opts.res} 10` },
        defs(
            linearGradient(
                "grad",
                [0, 0],
                [0, 1],
                [
                    [0, opts.fill2],
                    [0.5, opts.fill1],
                    [1, opts.fill2],
                ]
            )
        ),
        polyline(
            [
                [0, 0],
                ...map(
                    (x) => [
                        x,
                        osc(x, phase, fscale, amp, opts.harmonics, opts.hstep),
                    ],
                    range(opts.res)
                ),
                [opts.res, 0],
            ],
            {
                stroke: opts.stroke,
                fill: "url(#grad)",
                "stoke-linejoin": "round",
            }
        )
    );
}

function osc(
    x: number,
    phase: number,
    fscale: number,
    amp: number,
    harmonics: number,
    hstep: number
) {
    const f = x * fscale;
    return reduce(
        reducer<number, number>(
            () => 0,
            (sum, i) => {
                const k = 1 + i * hstep;
                return sum + (Math.sin(phase + f * k) * amp) / k;
            }
        ),
        range(0, harmonics + 1)
    );
}
