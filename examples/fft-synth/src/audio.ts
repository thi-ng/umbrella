import type { NumericArray } from "@thi.ng/api";
import { Delay } from "@thi.ng/dsp/proc/delay";
import { conjugate, ifft } from "@thi.ng/dsp/fft/fft";
import { BIN_AMP, NUM_BINS, PITCH_SCALE } from "./config";
import { DB } from "./state";

export const makeBins = () => new Array(NUM_BINS).fill(0);

let actx: AudioContext | undefined;
let buf: AudioBuffer;
let src: AudioBufferSourceNode;
let delay = new Delay<NumericArray>(80, makeBins());

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
    let { auto, bins, gain, feedback } = DB.value;
    gain *= BIN_AMP;
    if (auto != null) {
        const pbins = [0, ...delay.deref().slice(0, NUM_BINS - 1)];
        bins = bins.map((x, i) => x * gain + pbins[i] * feedback);
    } else {
        bins = bins.map((x) => x * gain);
    }
    delay.next(bins);
    const wave = ifft(conjugate(bins))[0];
    DB.resetIn(["wave"], <Float64Array>wave);

    if (!actx) return;
    const left = buf.getChannelData(0);
    if (PITCH_SCALE > 1) {
        for (let i = 0, j = 0; i < wave.length; i++, j += PITCH_SCALE) {
            left.fill(wave[i], j, j + PITCH_SCALE);
        }
    } else {
        left.set(wave);
    }
};
