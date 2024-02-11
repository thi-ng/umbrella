import { fract } from "@thi.ng/math";
import type { Ramp } from "@thi.ng/ramp";

let actx: AudioContext | undefined;
let buf: AudioBuffer;
let src: AudioBufferSourceNode;

export const isAudioActive = () => !!actx;

export const initAudio = (freq: number) => {
	if (actx) return;
	actx = new AudioContext();
	buf = actx.createBuffer(2, actx.sampleRate / freq, actx.sampleRate);
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

export const updateAudio = (ramp: Ramp<number>, detune = 0.01) => {
	if (!actx) return;
	const left = buf.getChannelData(0);
	const right = buf.getChannelData(1);
	const f4 = 1 + detune;
	const f5 = 2 + detune;
	const f6 = 4 + detune;
	for (let i = 0, n = left.length; i < n; i++) {
		let t = i / n;
		const y1 = ramp.at(t);
		const y2 = ramp.at(t * 2);
		const y3 = ramp.at(t * 4);
		const y4 = ramp.at(fract(t * f4));
		const y5 = ramp.at(fract(t * f5));
		const y6 = ramp.at(fract(t * f6));
		left[i] = y1 * 0.5 + y5 * 0.2 + y3 * 0.3 - 1;
		right[i] = y4 * 0.5 + y2 * 0.3 + y6 * 0.2 - 1;
	}
};
