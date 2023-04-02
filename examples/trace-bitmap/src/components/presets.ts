import { div } from "@thi.ng/hiccup-html";
import { PRESETS, THEME, type PresetID } from "../api";
import { applyPresetForID, loadPreset, savePreset } from "../state/presets";
import { button, dropdown, fileButton } from "./form";

export const presetControls = div(
	{},
	div(
		{ class: "flex" },
		fileButton(
			{
				accept: ["application/json"],
				onchange: (e) =>
					loadPreset((<HTMLInputElement>e.target).files![0]),
			},
			THEME.fileButton.small,
			"Load preset"
		),
		button("small", savePreset, "Save Preset")
	),
	div(
		{ class: THEME.sideBar.section },
		dropdown(Object.keys(PRESETS), ["preset"], (x) =>
			applyPresetForID(<PresetID>x)
		)
	)
);
