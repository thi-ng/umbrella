import { Fn, IObjectOf } from "@thi.ng/api";
import {
    asSvg,
    group,
    line,
    polyline,
    rect as grect,
    svgDoc
} from "@thi.ng/geom";
import { IHiccupShape } from "@thi.ng/geom-api";
import {
    fit,
    fit11,
    fitClamped,
    PI
} from "@thi.ng/math";
import {
    map,
    mapIndexed,
    range,
    take
} from "@thi.ng/transducers";
import { addN, mulN } from "@thi.ng/vectors";
import { writeFileSync } from "fs";
import {
    adsr,
    AllPass1,
    Biquad,
    biquadBP,
    biquadHiShelf,
    biquadHP,
    biquadLoShelf,
    biquadLP,
    biquadNotch,
    biquadPeak,
    comb,
    curve,
    dcblocker,
    dsf,
    filterResponse,
    FilterType,
    freqMs,
    freqRange,
    IGen,
    impulseTrainT,
    IProc,
    modOsc,
    msFrames,
    normFreq,
    onepoleHP,
    onepoleLP,
    osc,
    PinkNoise,
    rect,
    saw,
    sawAdditive,
    sin,
    StatelessOscillator,
    SVF,
    svfLP,
    tri,
    wavetable,
    WhiteNoise
} from "../src";
import { waveShaper, WaveShaper, waveshapeSin } from "../src/proc/waveshaper";

const FS = 48000;

const FREQS = [5000, 2500, 1000, 500, 250, 125];
const [F1, F2, F3, F4, F5] = FREQS.map((f) => normFreq(f, FS));

const env = adsr(16, 32, 0.5, 48, 0.001, 0.1);

const OSC: IObjectOf<StatelessOscillator> = {
    sin,
    saw,
    rect,
    tri,
    comb,
    dsf: dsf(0.4, 3),
    sawa: sawAdditive(10),
    wt: wavetable(curve(1, -1, 127).take(128)),
    wt2: wavetable([...env.take(80), ...(env.release(), env.take(48))])
};

const BASE_DIR = "export/";

const X = 30;
const YSCALE = 50;

const label = (x: number, y: number, body: string) =>
    <IHiccupShape>{
        toHiccup() {
            return ["text", { stroke: "none" }, [x, y + 2], body];
        }
    };

const color = (i: number) => [1 - i, i * 0.75, i];

const write = (
    fname: string,
    pts: number[][],
    labels: string[],
    yticks: number[] = [...range(-1, 1.01, 0.25)],
    yfmt: Fn<number, string> = (y) => y.toFixed(2),
    num = labels.length
) =>
    writeFileSync(
        BASE_DIR + fname,
        asSvg(
            svgDoc(
                {
                    viewBox: `-10 -${YSCALE + 10} 570 ${2 * YSCALE + 40}`,
                    "font-family": "Inconsolata",
                    "font-size": "9px",
                    "text-anchor": "end"
                    // "dominant-baseline": "middle"
                },
                // axis & labels
                group({ stroke: "#000" }, [
                    line([X - 10, 0], [pts.length * 4 + X + 10, 0]),
                    line([X, -YSCALE], [X, YSCALE]),
                    ...mapIndexed(
                        (i, y) =>
                            line(
                                [i & 1 ? X - 5 : X - 10, y * YSCALE],
                                [X, y * YSCALE]
                            ),
                        yticks
                    ),
                    ...map((y) => label(X - 12, -y * YSCALE, yfmt(y)), yticks)
                ]),
                // waveforms
                group({ translate: [X + 5, 0] }, [
                    ...map(
                        (id) =>
                            polyline(
                                [
                                    ...mapIndexed(
                                        (i, y) => [i * 4, -y[id] * YSCALE],
                                        pts
                                    )
                                ],
                                {
                                    stroke: color(id / num)
                                }
                            ),
                        range(num)
                    )
                ]),
                // legend
                grect([-10, YSCALE + 10], [570, 20], { fill: "#fff" }),
                ...mapIndexed(
                    (i, txt) =>
                        group(
                            {
                                translate: [X + 10 + i * 70, YSCALE + 20],
                                "text-anchor": "start"
                            },
                            [
                                grect([0, -1], [10, 2], {
                                    fill: color(i / num)
                                }),
                                label(12, 0, txt)
                            ]
                        ),
                    labels
                )
            )
        )
    );

const compute = (gen: IGen<number>, procs: IProc<number, number>[]) => [
    ...take(
        128,
        map((x) => [x, ...map((p) => p.next(x), procs)], gen)
    )
];

const withFilters = (
    fname: Fn<string, string>,
    filter: Fn<number, IProc<number, number>>,
    oscFn: Fn<StatelessOscillator, IGen<number>> = (x) => osc(x, F3, 0.75),
    freqs = [F1, F2, F3, F4, F5],
    labels: string[] = ["orig (1kHz)", ...freqs.map((f) => `${(f * FS) | 0}Hz`)]
) => {
    for (let id in OSC) {
        write(
            fname(id),
            compute(
                oscFn(OSC[id]),
                freqs.map((f) => filter(f))
            ),
            labels
        );
    }
};

withFilters(
    (id) => `${id}-wshape-sigmoid.svg`,
    (k) => new WaveShaper(k, true),
    undefined,
    [0.5, 1, 2, 4, 8],
    ["orig", ...[0.5, 1, 2, 4, 8].map((k) => `k=${k}`)]
);

withFilters(
    (id) => `${id}-wshape-sin.svg`,
    (k) => new WaveShaper(k, 1, waveshapeSin),
    undefined,
    [0.5, 1, 2, 4, 8],
    ["orig", ...[0.5, 1, 2, 4, 8].map((k) => `k=${k}`)]
);

withFilters(
    () => `pnoise.svg`,
    svfLP,
    () => new PinkNoise(2),
    [12000 / FS, 8000 / FS, F1, F2, F3]
);

withFilters(
    () => `wnoise.svg`,
    svfLP,
    () => new WhiteNoise(),
    [12000 / FS, 8000 / FS, F1, F2, F3]
);

withFilters((id) => `${id}-svf-lp.svg`, svfLP);

withFilters((id) => `${id}-lpf-1pole.svg`, onepoleLP);

withFilters((id) => `${id}-dcblock.svg`, dcblocker);

withFilters((id) => `${id}-hpf-1pole.svg`, onepoleHP);

withFilters((id) => `${id}-bq-lpf.svg`, biquadLP);

withFilters((id) => `${id}-bq-hpf.svg`, biquadHP);

withFilters((id) => `${id}-bq-bpf.svg`, biquadBP);

withFilters((id) => `${id}-bq-notch.svg`, biquadNotch);

withFilters((id) => `${id}-bq-peak.svg`, biquadPeak);

withFilters((id) => `${id}-bq-lsh.svg`, biquadLoShelf);

withFilters((id) => `${id}-bq-hsh.svg`, biquadHiShelf);

withFilters(
    (id) => `${id}-allpass1.svg`,
    (f) => new AllPass1(f)
);

withFilters(
    (id) => `fmod-${id}-lpf-1pole.svg`,
    onepoleLP,
    (o) => modOsc(o, F3, osc(sin, F1, 0.1), 0.75)
);

withFilters(
    () => `train-lpf.svg`,
    onepoleLP,
    () => impulseTrainT(1, -1, msFrames(freqMs(FREQS[2]), FS))
);

withFilters(
    () => `fmam-osc.svg`,
    onepoleLP,
    (o) => modOsc(saw, F3, osc(saw, F1, 0.3), osc(saw, F4))
);

withFilters(
    (id) => `${id}-allpass-high.svg`,
    (f) => {
        let flt = new AllPass1(f);
        return <any>{
            next(x: number) {
                return flt.high(x);
            }
        };
    }
);

const fc = biquadLP(5000 / FS).filterCoeffs();

write(
    `bq-lpf-resp.svg`,
    freqRange(24 / FS, 0.499, 128).map((f) => {
        const r = filterResponse(fc, f, true);
        return [fitClamped(r.mag, -60, 0, -1, 1), fit(r.phase, -PI, PI, -1, 1)];
    }),
    ["mag", "phase"],
    [...range(-1, 1.01, 0.5)],
    (y) => (fit11(y, -60, 0) | 0) + " dB"
);
