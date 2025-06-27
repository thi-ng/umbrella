// SPDX-License-Identifier: Apache-2.0
import {
	buttonH,
	DEFAULT_THEME,
	IMGUI,
	sliderH,
	sliderVGroup,
	textLabel,
	toggle,
} from "@thi.ng/imgui";
import { gridLayout, GridLayout } from "@thi.ng/layout";
import { initAudio, isAudioActive, stopAudio } from "./audio.js";
import { toggleAutoMode } from "./automode.js";
import {
	BIN_LABELS,
	FMT,
	FMT_PERCENT,
	NUM_BINS,
	PITCH_SCALE,
	WINDOW_LEN,
} from "./config.js";
import {
	clearSpectrum,
	DB,
	setGain,
	setSpectrumPreset,
	updateSpectrumBin,
} from "./state.js";

export const gui = new IMGUI({
	theme: {
		...DEFAULT_THEME,
		globalBg: "#ccc",
		font: "10px 'IBM Plex Mono'",
		charWidth: 5,
	},
});

export const updateGUI = (draw: boolean) => {
	const state = DB.deref();
	const width = state.size[0] - 20;
	const grid = gridLayout(10, 10, width, 1, 16, 4);
	let inner: GridLayout;
	let res: any;

	gui.begin(draw);

	// audio ctrls

	inner = grid.nest(2);

	if (
		buttonH({
			gui,
			layout: inner,
			id: "audioToggle",
			label: `Turn audio ${isAudioActive() ? "off" : "on"}`,
		})
	) {
		isAudioActive() ? stopAudio() : initAudio(WINDOW_LEN * PITCH_SCALE);
	}

	gui.beginDisabled(!isAudioActive());

	res = sliderH({
		gui,
		layout: inner,
		id: "gain",
		min: 0,
		max: 1,
		step: 0.001,
		value: state.gain,
		label: "Gain",
		info: "Master volume",
		fmt: FMT,
	});
	res !== undefined && setGain(res);

	gui.endDisabled();

	// auto sequencer mode

	grid.next();
	inner = grid.nest(5);
	toggle({
		gui,
		layout: inner,
		id: "autoMode",
		value: !!state.auto,
		label: "Auto mode",
		info: "Randomized spectrum sequencer",
	}) !== undefined && toggleAutoMode();

	gui.beginDisabled(!state.auto);

	res = sliderH({
		gui,
		layout: inner,
		id: "decay",
		min: 0.5,
		max: 0.999,
		step: 0.001,
		value: state.decay,
		label: "Decay",
		info: "Bin gain decay factor",
		fmt: FMT_PERCENT,
	});
	res !== undefined && DB.resetIn(["decay"], res);

	res = sliderH({
		gui,
		layout: inner,
		id: "attenuate",
		min: 0,
		max: 0.05,
		step: 0.0001,
		value: state.attenuate,
		label: "Attentuation",
		info: "Bin decay attenuation factor",
		fmt: FMT_PERCENT,
	});
	res !== undefined && DB.resetIn(["attenuate"], res);

	res = sliderH({
		gui,
		layout: inner,
		id: "feedback",
		min: 0,
		max: 0.95,
		step: 0.01,
		value: state.feedback,
		label: "Feedback",
		info: "Delay line feedback",
		fmt: FMT_PERCENT,
	});
	res !== undefined && DB.resetIn(["feedback"], res);

	res = sliderH({
		gui,
		layout: inner,
		id: "delay",
		min: 1,
		max: 100,
		step: 1,
		value: state.interval,
		label: "Interval",
		info: "Trigger interval",
		fmt: FMT,
	});
	res !== undefined && DB.resetIn(["interval"], res);

	gui.endDisabled();

	// presets

	inner = grid.nest(4);
	buttonH({
		gui,
		layout: inner,
		id: "clear",
		label: "Clear",
		info: "Clear all bins",
	}) && clearSpectrum();
	buttonH({
		gui,
		layout: inner,
		id: "presetSin",
		label: "Sine",
		info: "Apply preset",
	}) && setSpectrumPreset(0);
	buttonH({
		gui,
		layout: inner,
		id: "presetSaw",
		label: "Saw",
		info: "Apply preset",
	}) && setSpectrumPreset(1);
	buttonH({
		gui,
		layout: inner,
		id: "presetSq",
		label: "Square",
		info: "Apply preset",
	}) && setSpectrumPreset(2);

	// FFT bins

	textLabel(gui, grid, "Frequency bins");
	res = sliderVGroup({
		gui,
		layout: grid,
		id: "bins",
		min: 0,
		max: 1,
		step: 0.001,
		value: state.bins.slice(0, Math.min(width / 16, NUM_BINS)),
		rows: 8,
		label: [],
		info: BIN_LABELS,
		fmt: FMT,
	});
	res && updateSpectrumBin(res[0], res[1]);

	textLabel(gui, grid, "Waveform");
	gui.end();
};
