import { FMT_yyyyMMdd_HHmmss } from "@thi.ng/date";
import { downloadWithMime } from "@thi.ng/dl-asset";
import { map, push, transduce } from "@thi.ng/transducers";
import { PRESETS, type Preset, type PresetID } from "../api";
import { DB } from "./atom";
import { setCanvasBackground } from "./canvas";
import { setImageDither } from "./image";
import { addLayer, removeAllLayers } from "./layers";

export const applyPresetForID = (id: PresetID) => {
	DB.resetIn(["preset"], id);
	if (id !== "Custom") applyPreset(PRESETS[id]);
};

export const applyPreset = (preset: Preset) => {
	setCanvasBackground(preset.bg);
	setImageDither(preset.dither);
	removeAllLayers();
	preset.layers.forEach(addLayer);
};

export const clearPreset = () => DB.resetIn(["preset"], "Custom");

export const savePreset = () => {
	const state = DB.deref();
	const preset: Preset = {
		bg: state.canvas.bg,
		dither: state.img.dither,
		layers: transduce(
			map((id) => state.layers[id].params),
			push(),
			state.order
		),
	};
	downloadWithMime(
		`preset-${FMT_yyyyMMdd_HHmmss()}.json`,
		JSON.stringify(preset),
		{ mime: "application/json" }
	);
};

export const loadPreset = (file: File) => {
	const reader = new FileReader();
	reader.onload = (e) =>
		applyPreset(<Preset>JSON.parse(<string>e.target!.result));
	reader.readAsText(file);
};
