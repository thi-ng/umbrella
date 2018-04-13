import { svgdoc } from "@thi.ng/hiccup-svg/doc";
import { polyline } from "@thi.ng/hiccup-svg/polyline";
import { map } from "@thi.ng/iterators/map";
import { range } from "@thi.ng/iterators/range";
import { reduce } from "@thi.ng/iterators/reduce";

import { AppContext } from "../api";

const TAU = Math.PI * 2;

export interface WaveformOpts {
    phase: number;
    freq: number;
    amp: number;
    harmonics: number;
    hstep: number;
    res: number;
    osc: number;
}

export function waveform(ctx: AppContext, opts: WaveformOpts) {
    const phase = opts.phase * Math.PI / 180;
    const amp = opts.amp * 50;
    const fscale = 1 / opts.res * TAU * opts.freq;
    return svgdoc(
        { class: "w-100 h-100", viewBox: `0 -5 ${opts.res} 10` },
        polyline(
            [
                [0, 0],
                ...map(
                    (x) => [x, osc(x, phase, fscale, amp, opts.harmonics, opts.hstep)],
                    range(opts.res)
                ),
                [opts.res, 0]
            ],
            ctx.ui.wave,
        )
    );
}

function osc(x: number, phase: number, fscale: number, amp: number, harmonics: number, hstep: number) {
    const f = x * fscale;
    return reduce(
        (sum, i) => {
            const k = (1 + i * hstep);
            return sum + Math.sin(phase + f * k) * amp / k;
        },
        0,
        range(0, harmonics + 1)
    );
}
