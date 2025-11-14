// SPDX-License-Identifier: Apache-2.0
import { div } from "@thi.ng/hiccup-html";
import { PRESETS, type PresetID } from "../api.js";
import { applyPresetForID, loadPreset, savePreset } from "../state/presets.js";
import { button, dropdown, fileButton, title } from "./common.js";

export const presetControls = div(
	{},
	title("Presets"),
	div(
		{ class: "flex" },
		fileButton(
			{
				accept: ["application/json"],
				onchange: (e) =>
					loadPreset((<HTMLInputElement>e.target).files![0]),
			},
			"small",
			"Load preset"
		),
		button("small", savePreset, "Save Preset")
	),
	div(
		".section",
		{},
		dropdown(
			Object.keys(PRESETS),
			["preset"],
			(x) => applyPresetForID(<PresetID>x),
			"preset"
		)
	)
);
