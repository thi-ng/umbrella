import { IRamp } from "@thi.ng/ramp";

let actx: AudioContext | undefined;
let buf: AudioBuffer;
let src: AudioBufferSourceNode;

export const isAudioActive = () => !!actx;

export const initAudio = (freq: number) => {
    if (actx) return;
    actx = new AudioContext();
    buf = actx.createBuffer(1, actx.sampleRate / freq, actx.sampleRate);
    src = actx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.connect(actx.destination);
    src.start();
};

export const stopAudio = () => {
    src.stop();
    actx!.suspend();
    actx = undefined;
};

export const updateAudio = (ramp: IRamp, osc2freq = 2) => {
    if (!actx) return;
    const bufData = buf.getChannelData(0);
    for (let i = 0, n = bufData.length; i < n; i++) {
        const t = i / n;
        const y1 = ramp.at(t);
        const y2 = ramp.at(t * osc2freq);
        bufData[i] = y1 + y2 - 1;
    }
};
