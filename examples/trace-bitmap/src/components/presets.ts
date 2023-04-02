import { button, div } from "@thi.ng/hiccup-html";
import { THEME } from "../api";
import { loadPreset, savePreset } from "../state/process";
import { fileButton } from "./button";

export const presetControls = div(
	{ class: "flex" },
	fileButton(
		{
			accept: ["application/json"],
			onchange: (e) => loadPreset((<HTMLInputElement>e.target).files![0]),
		},
		THEME.fileButton.small,
		"Load preset"
	),
	button(
		{
			class: THEME.button.small,
			onclick: savePreset,
		},
		"Save Preset"
	)
);
