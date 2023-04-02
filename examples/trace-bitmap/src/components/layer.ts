import type { Predicate } from "@thi.ng/api";
import {
	div,
	inputColor,
	inputNumber,
	type InputNumericAttribs,
} from "@thi.ng/hiccup-html";
import { $list } from "@thi.ng/rdom";
import {
	THEME,
	TRACE_MODE_ORDER,
	TRACE_MODES,
	type LayerParam,
	type TraceMode,
} from "../api";
import { DB } from "../state/atom";
import {
	addLayer,
	duplicateLayer,
	moveLayer,
	removeLayer,
	setLayerMode,
	updateLayerParam,
} from "../state/layers";
import { layerOrder } from "../state/process";
import { button, dropdown } from "./form";

const layerControlsForID = (layerID: string) => {
	const { ctrls } = DB.deref().layers[layerID];
	const moveButton = (dir: -1 | 1, tx: Predicate<string[]>) =>
		button(
			"col4",
			() => moveLayer(layerID, dir),
			dir > 0 ? "↓" : "↑",
			layerOrder.map(tx)
		);
	const onchange =
		(param: LayerParam, isNum = false) =>
		(e: Event) =>
			updateLayerParam(
				layerID,
				param,
				isNum
					? parseInt((<HTMLInputElement>e.target).value)
					: (<HTMLInputElement>e.target).value
			);
	const param = (
		pid: Exclude<LayerParam, "mode" | "color">,
		min: number,
		max: number,
		attribs?: Partial<InputNumericAttribs>
	) =>
		inputNumber({
			onchange: onchange(pid, true),
			class: "w-25",
			step: 1,
			min,
			max,
			...attribs,
			value: ctrls[pid],
		});
	return div(
		{ class: THEME.sideBar.section },
		div(
			{ class: THEME.sideBar.control },
			button("col4", () => removeLayer(layerID), "-"),
			button("col4", () => duplicateLayer(layerID), "dup"),
			moveButton(-1, (order) => order.indexOf(layerID) === 0),
			moveButton(
				1,
				(order) => order.indexOf(layerID) === order.length - 1
			)
		),
		dropdown(
			TRACE_MODE_ORDER,
			ctrls.mode,
			(x) => setLayerMode(layerID, <TraceMode>x),
			{ label: (x) => TRACE_MODES[<TraceMode>x].label }
		),
		inputColor({
			class: THEME.sideBar.control,
			oninput: onchange("color"),
			value: ctrls.color,
		}),
		param("min", 0, 1000, {
			min: ctrls.mode.map((id) => (TRACE_MODES[id].points ? 0 : 2)),
			disabled: ctrls.mode.map((id) => TRACE_MODES[id].points),
		}),
		param("max", 0, 1000, {
			min: ctrls.mode.map((id) => (TRACE_MODES[id].points ? 0 : 1)),
		}),
		param("slope", 1, 16, {
			disabled: ctrls.mode.map(
				(id) => !TRACE_MODES[id].slope || TRACE_MODES[id].points
			),
		}),
		param("skip", 0, 16, {
			disabled: ctrls.mode.map((id) => !TRACE_MODES[id].skip),
		})
	);
};

export const layerControls = div(
	{},
	button("large", () => addLayer(), "+ add layer"),
	$list(layerOrder, "div", {}, layerControlsForID)
);
