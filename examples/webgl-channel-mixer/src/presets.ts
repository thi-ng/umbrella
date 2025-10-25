// SPDX-License-Identifier: Apache-2.0
import { downloadWithMime } from "@thi.ng/dl-asset";
import { randomID } from "@thi.ng/random";
import {
	DEFAULT_B,
	DEFAULT_G,
	DEFAULT_R,
	type Controls,
	type ReactiveControls,
} from "./api.js";

export const PRESETS: Record<string, Controls> = {
	"<default>": {
		r: DEFAULT_R,
		g: DEFAULT_G,
		b: DEFAULT_B,
		exposure: [0, 0],
	},
	"RGB → RBG": {
		r: DEFAULT_R,
		g: DEFAULT_B,
		b: DEFAULT_G,
		exposure: [0, 0],
	},
	"RGB → GBR": {
		r: DEFAULT_G,
		g: DEFAULT_B,
		b: DEFAULT_R,
		exposure: [0, 0],
	},
	"RGB → GRB": {
		r: DEFAULT_G,
		g: DEFAULT_R,
		b: DEFAULT_B,
		exposure: [0, 0],
	},
	"RGB → BRG": {
		r: DEFAULT_B,
		g: DEFAULT_R,
		b: DEFAULT_G,
		exposure: [0, 0],
	},
	"RGB → BGR": {
		r: DEFAULT_B,
		g: DEFAULT_G,
		b: DEFAULT_R,
		exposure: [0, 0],
	},
	Dolomites: {
		r: [1, 0.26, -0.14, 0.11],
		g: [0.16, 1, 0, 0.02],
		b: [0.17, -0.02, 1, -0.06],
		exposure: [-0.1, 0.08],
	},
	Heat: {
		r: [1, 1, -1, 0.23],
		g: [0.03, 1, 0.04, 0.04],
		b: [-0.02, 0, 1, 0.01],
		exposure: [-0.19, 0.08],
	},
	Heat2: {
		r: [1, 1, -1, 0.23],
		g: [0.08, 1, 0.11, 0.04],
		b: [0.12, 0.09, 1, 0.01],
		exposure: [-0.19, 0.08],
	},
	PNW: {
		r: [1, 0.11, 0, -0.04],
		g: [-0.05, 1, 0.02, 0.07],
		b: [0.02, -0.02, 1, 0.04],
		exposure: [-0.24, -0.16],
	},
};

export const setPresetFromID = (controls: ReactiveControls, id: string) => {
	const preset = PRESETS[id];
	if (preset) setPresetFromObj(controls, preset);
};

export const setPresetFromObj = (
	controls: ReactiveControls,
	preset: Controls
) => {
	controls.r.next(preset.r);
	controls.g.next(preset.g);
	controls.b.next(preset.b);
	controls.exposure.next(preset.exposure);
};

export const downloadPreset = (controls: ReactiveControls) =>
	downloadWithMime(
		`preset-${randomID()}.json`,
		JSON.stringify({
			r: controls.r.deref(),
			g: controls.g.deref(),
			b: controls.b.deref(),
			exposure: controls.exposure.deref(),
		}),
		{ mime: "application/json" }
	);
