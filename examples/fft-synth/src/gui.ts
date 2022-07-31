import { DEFAULT_THEME } from "@thi.ng/imgui/api";
import { buttonH } from "@thi.ng/imgui/components/button";
import { sliderH } from "@thi.ng/imgui/components/sliderh";
import { sliderVGroup } from "@thi.ng/imgui/components/sliderv";
import { textLabel } from "@thi.ng/imgui/components/textlabel";
import { toggle } from "@thi.ng/imgui/components/toggle";
import { IMGUI } from "@thi.ng/imgui/gui";
import { gridLayout, GridLayout } from "@thi.ng/layout/grid-layout";
import { initAudio, isAudioActive, stopAudio } from "./audio";
import { toggleAutoMode } from "./automode";
import {
	BIN_LABELS,
	FMT,
	FMT_PERCENT,
	NUM_BINS,
	PITCH_SCALE,
	WINDOW_LEN,
} from "./config";
import {
	clearSpectrum,
	DB,
	setGain,
	setSpectrumPreset,
	updateSpectrumBin,
} from "./state";

export const gui = new IMGUI({
	theme: {
		...DEFAULT_THEME,
		globalBg: "#ccc",
		font: "10px Inconsolata",
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
		buttonH(
			gui,
			inner,
			"audioToggle",
			`Turn audio ${isAudioActive() ? "off" : "on"}`
		)
	) {
		isAudioActive() ? stopAudio() : initAudio(WINDOW_LEN * PITCH_SCALE);
	}

	gui.beginDisabled(!isAudioActive());

	res = sliderH(
		gui,
		inner,
		"gain",
		0,
		1,
		0.001,
		state.gain,
		"Gain",
		FMT,
		"Master volume"
	);
	res !== undefined && setGain(res);

	gui.endDisabled();

	// auto sequencer mode

	grid.next();
	inner = grid.nest(5);
	toggle(
		gui,
		inner,
		"autoMode",
		!!state.auto,
		false,
		"Auto mode",
		"Randomized spectrum sequencer"
	) !== undefined && toggleAutoMode();

	gui.beginDisabled(!state.auto);

	res = sliderH(
		gui,
		inner,
		"decay",
		0.5,
		0.999,
		0.001,
		state.decay,
		"Decay",
		FMT_PERCENT,
		"Bin gain decay factor"
	);
	res !== undefined && DB.resetIn(["decay"], res);

	res = sliderH(
		gui,
		inner,
		"attenuate",
		0,
		0.05,
		0.0001,
		state.attenuate,
		"Attentuation",
		FMT_PERCENT,
		"Bin decay attenuation factor"
	);
	res !== undefined && DB.resetIn(["attenuate"], res);

	res = sliderH(
		gui,
		inner,
		"feedback",
		0,
		0.95,
		0.01,
		state.feedback,
		"Feedback",
		FMT_PERCENT,
		"Delay line feedback"
	);
	res !== undefined && DB.resetIn(["feedback"], res);

	res = sliderH(
		gui,
		inner,
		"delay",
		1,
		100,
		1,
		state.interval,
		"Interval",
		FMT,
		"Trigger interval"
	);
	res !== undefined && DB.resetIn(["interval"], res);

	gui.endDisabled();

	// presets

	inner = grid.nest(4);
	buttonH(gui, inner, "clear", "Clear", undefined, "Clear all bins") &&
		clearSpectrum();
	buttonH(gui, inner, "presetSin", "Sine", undefined, "Apply preset") &&
		setSpectrumPreset(0);
	buttonH(gui, inner, "presetSaw", "Saw", undefined, "Apply preset") &&
		setSpectrumPreset(1);
	buttonH(gui, inner, "presetSq", "Square", undefined, "Apply preset") &&
		setSpectrumPreset(2);

	// FFT bins

	textLabel(gui, grid, "Frequency bins");
	res = sliderVGroup(
		gui,
		grid,
		"bins",
		0,
		1,
		0.001,
		state.bins.slice(0, Math.min(width / 16, NUM_BINS)),
		8,
		[],
		FMT,
		BIN_LABELS
	);
	res && updateSpectrumBin(res[0], res[1]);

	textLabel(gui, grid, "Waveform");
	gui.end();
};
