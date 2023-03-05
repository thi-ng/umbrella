import { defAtom } from "@thi.ng/atom";
import { repeat } from "@thi.ng/transducers";
import { makeBins, updateAudio } from "./audio";
import { NUM_BINS, PRESETS } from "./config";

export const DB = defAtom({
	auto: <any>null,
	gain: 0.5,
	decay: 0.999,
	attenuate: 0.004,
	interval: 70,
	feedback: 0.66,
	bins: [...repeat(0, NUM_BINS)],
	wave: new Float64Array(NUM_BINS * 2),
	size: [window.innerWidth, window.innerHeight],
});

export const setGain = (gain: number) => {
	DB.resetIn(["gain"], gain);
	updateAudio();
};

export const clearSpectrum = () => {
	DB.resetIn(["bins"], makeBins());
	updateAudio();
};

export const setSpectrumPreset = (id: number) => {
	DB.swapIn(["bins"], PRESETS[id]);
	updateAudio();
};

export const updateSpectrumBin = (bin: number, amp: number) => {
	DB.resetIn(["bins", bin], amp);
	updateAudio();
};
