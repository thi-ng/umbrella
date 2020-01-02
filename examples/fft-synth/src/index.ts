import { Atom } from "@thi.ng/atom";
import { conjugate, ifft } from "@thi.ng/dsp";
import { canvas } from "@thi.ng/hdom-canvas";
import {
    buttonH,
    DEFAULT_THEME,
    gridLayout,
    GridLayout,
    IMGUI,
    sliderH,
    sliderVGroup,
    textLabel,
    toggle
} from "@thi.ng/imgui";
import { fit, fitClamped } from "@thi.ng/math";
import { weightedRandom } from "@thi.ng/random";
import {
    fromAtom,
    fromDOMEvent,
    fromRAF,
    merge,
    sidechainPartition,
    sync
} from "@thi.ng/rstream";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { float } from "@thi.ng/strings";
import {
    map,
    mapcat,
    mapIndexed,
    range,
    repeat
} from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";

const NUM_BINS = 64;
const WINDOW_LEN = NUM_BINS * 2;
const BIN_AMP = NUM_BINS / 4;
const PITCH_SCALE = 2;
const FMT = float(3);

const PRESETS: any[] = [
    () => [0, 1, ...repeat(0, NUM_BINS - 2)],
    () => [0, ...map((i) => 1 / i, range(1, NUM_BINS))],
    () => [...mapcat((i) => [0, 1 / i], range(1, NUM_BINS + 1, 2))]
];

const weights = [
    ...map(
        (x) => 2 * (Math.exp((-1 / NUM_BINS) * Math.LN2 * x) - 0.5),
        range(NUM_BINS)
    )
];

const rnd = weightedRandom([...range(0, NUM_BINS)], weights);

const DB = new Atom({
    auto: <any>null,
    gain: 0.5,
    decay: 0.99,
    interval: 10,
    bins: [...repeat(0, NUM_BINS)],
    wave: new Float64Array(NUM_BINS * 2),
    size: [window.innerWidth, window.innerHeight]
});

const main = sync<any, any>({
    src: {
        state: fromAtom(DB)
    }
});

let actx: AudioContext | undefined;
let buf: AudioBuffer;
let src: AudioBufferSourceNode;

export const isAudioActive = () => !!actx;

export const initAudio = (size: number) => {
    if (actx) return;
    actx = new AudioContext();
    buf = actx.createBuffer(1, size, actx.sampleRate);
    src = actx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.connect(actx.destination);
    src.start();
    updateAudio();
};

export const stopAudio = () => {
    src.stop();
    actx!.suspend();
    actx = undefined;
};

export const updateAudio = () => {
    const gain = BIN_AMP * DB.value.gain;
    const wave = ifft(conjugate(DB.value.bins.map((i) => i * gain)))[0];
    DB.resetIn("wave", wave);

    if (!actx) return;
    const left = buf.getChannelData(0);
    for (let i = 0, j = 0; i < wave.length; i++, j += PITCH_SCALE) {
        left.fill(wave[i], j, j + PITCH_SCALE);
    }
};

const setGain = (gain: number) => {
    DB.resetIn("gain", gain);
    updateAudio();
};

const clearSpectrum = () => {
    DB.resetIn("bins", [...repeat(0, NUM_BINS)]);
    updateAudio();
};

const setSpectrumPreset = (id: number) => {
    DB.swapIn("bins", PRESETS[id]);
    updateAudio();
};

const updateSpectrum = (bin: number, amp: number) => {
    DB.resetIn(["bins", bin], amp);
    updateAudio();
};

const startAutoMode = () => {
    let i = 0;
    DB.resetIn(
        "auto",
        setInterval(() => {
            const { decay, interval } = DB.value;
            DB.swapIn("bins", (buf: number[]) => buf.map((x) => x * decay));
            i % interval === 0 && updateSpectrum(rnd(), Math.random());
            updateAudio();
            i++;
        }, 16)
    );
};

const stopAutoMode = () => {
    clearInterval(DB.value.auto);
    DB.resetIn("auto", null);
};

const toggleAutoMode = () =>
    DB.value.auto == null ? startAutoMode() : stopAutoMode();

const app = () => {
    const gui = new IMGUI({
        theme: { ...DEFAULT_THEME, globalBg: "#ccc", font: "10px Inconsolata" }
    });

    const _canvas = {
        ...canvas,
        init(canv: HTMLCanvasElement) {
            main.add(
                merge<any, any>({
                    src: [
                        gestureStream(canv, {}).subscribe({
                            next(e) {
                                gui.setMouse([...e[1].pos], e[1].buttons);
                            }
                        }),
                        fromDOMEvent(window, "resize").subscribe({
                            next() {
                                DB.resetIn("size", [
                                    window.innerWidth,
                                    window.innerHeight
                                ]);
                            }
                        })
                    ]
                })
            );
        }
    };

    const updateGUI = (draw: boolean) => {
        const state = DB.deref();
        const width = state.size[0] - 20;
        const grid = gridLayout(10, 10, width, 1, 16, 4);
        let inner: GridLayout;
        let res: any;

        gui.begin(draw);

        // prettier-ignore
        if (buttonH(gui, grid, "audioToggle", `Turn audio ${isAudioActive() ? "off":"on"}`)) {
            isAudioActive() ? stopAudio() : initAudio(DB.value.bins.length * 2 * PITCH_SCALE);
        }

        grid.next();
        inner = grid.nest(4);
        // prettier-ignore
        res = sliderH(gui, inner, "gain", 0, 1, 0.001, 0.5, "Gain", FMT);
        res !== undefined && setGain(res);

        toggle(gui, inner, "autoMode", !!state.auto, false, "Auto mode") !==
            undefined && toggleAutoMode();

        !state.auto && gui.beginDisabled(true);

        // prettier-ignore
        res=sliderH(gui, inner, "decay", 0.5, 0.999, 0.001, state.decay, "Decay", FMT);
        res !== undefined && DB.resetIn("decay", res);

        // prettier-ignore
        res=sliderH(gui, inner, "delay", 1, 50, 1, state.interval, "Interval", FMT);
        res !== undefined && DB.resetIn("interval", res);

        !state.auto && gui.endDisabled();

        inner = grid.nest(4);
        buttonH(gui, inner, "clear", "Clear") && clearSpectrum();
        buttonH(gui, inner, "presetSin", "Sine") && setSpectrumPreset(0);
        buttonH(gui, inner, "presetSaw", "Saw") && setSpectrumPreset(1);
        buttonH(gui, inner, "presetSquare", "Square") && setSpectrumPreset(2);

        textLabel(gui, grid, "Frequency bins");
        // prettier-ignore
        res = sliderVGroup(gui, grid, "bins", 0, 1, 0.001, state.bins.slice(0, Math.min(width/16, NUM_BINS)), 8, [], FMT);
        res && updateSpectrum(res[0], res[1]);

        textLabel(gui, grid, "Waveform");
        gui.end();
    };

    return () => {
        const width = window.innerWidth;
        const height = 500;
        const iwidth = width - 20;

        updateGUI(false);
        updateGUI(true);

        return [
            _canvas,
            {
                width,
                height,
                style: { background: gui.theme.globalBg, cursor: gui.cursor },
                ...gui.attribs
            },
            gui,
            // waveform display
            [
                "polyline",
                { stroke: "red" },
                [
                    ...mapIndexed(
                        (i, y) => [
                            fit(i, 0, WINDOW_LEN, 10, iwidth),
                            fitClamped(y, -1, 1, 490, 290)
                        ],
                        DB.value.wave
                    )
                ]
            ]
        ];
    };
};

main.subscribe(sidechainPartition<any, number>(fromRAF())).transform(
    map(app()),
    updateDOM()
);
