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
    cat,
    map,
    mapIndexed,
    range,
    take
} from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import {
    AllPass1,
    AllPass2,
    comb,
    IGen,
    integrator,
    IProc,
    modOsc,
    normFreq,
    OnePole,
    onepoleHP,
    onepoleLP,
    osc,
    rect,
    saw,
    sawAdditive,
    sin,
    squareAdditive,
    StatelessOscillator,
    tri,
    trigger,
    triggerN
} from "../src";

const FS = 48000;

const FREQS = [5000, 2500, 1000, 500, 250, 125];
const [F1, F2, F3, F4, F5, F6] = FREQS.map((f) => normFreq(f, FS));

const OSC: IObjectOf<StatelessOscillator> = {
    sin,
    saw,
    rect,
    tri,
    comb
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
    num = labels.length - 1
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
                        range(-1, 1.01, 0.25)
                    ),
                    ...map(
                        (y) => label(X - 12, -y * YSCALE, y.toFixed(2)),
                        range(-1, 1.01, 0.25)
                    )
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
                        range(num + 1)
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
    freqs = [F1, F2, F3, F4, F5]
) => {
    for (let id in OSC) {
        write(fname(id), compute(oscFn(OSC[id]), freqs.map(filter)), [
            "orig (1kHz)",
            ...freqs.map((f) => `${(f * FS) | 0}Hz`)
        ]);
    }
};

withFilters((id) => `${id}-lpf-1pole.svg`, onepoleLP);

withFilters((id) => `${id}-hpf-1pole.svg`, onepoleHP);

withFilters(
    (id) => `${id}-allpass1.svg`,
    (f) => new AllPass1(f)
);

withFilters(
    (id) => `${id}-allpass2.svg`,
    (f) => new AllPass2(f, f / 2)
);

withFilters(
    (id) => `fmod-${id}-lpf-1pole.svg`,
    onepoleLP,
    (o) => modOsc(o, osc(sin, F1, 0.1), F3, 0.75)
);

withFilters(
    () => `trigger-lpf.svg`,
    onepoleLP,
    (o) => trigger(1, -1, 16)
);
