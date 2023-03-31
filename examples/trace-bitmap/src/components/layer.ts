import type { Predicate } from "@thi.ng/api";
import {
	button,
	div,
	inputColor,
	inputNumber,
	type InputNumericAttribs,
} from "@thi.ng/hiccup-html";
import { staticDropdown } from "@thi.ng/rdom-components";
import { TRACE_MODES, type LayerParam, type TraceMode } from "../api";
import { DB } from "../state";
import {
	duplicateLayer,
	moveLayer,
	removeLayer,
	updateLayerParam,
} from "../state/layers";
import { layerOrder } from "../state/process";

export const layerControlsForID = (layerID: string) => {
	const { ctrls } = DB.deref().layers[layerID];
	const moveButton = (dir: -1 | 1, tx: Predicate<string[]>) =>
		button(
			{
				class: "w-25",
				onclick: () => moveLayer(layerID, dir),
				disabled: layerOrder.map(tx),
			},
			dir > 0 ? "↓" : "↑"
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
	const layerParam = (
		pid: Exclude<LayerParam, "dir" | "color">,
		min: number,
		max: number,
		attribs?: Partial<InputNumericAttribs>
	) =>
		inputNumber({
			...attribs,
			class: "dib w-25",
			step: 1,
			min,
			max,
			value: ctrls[pid],
			onchange: onchange(pid, true),
		});
	return div(
		{ class: "bg-gray white bb b--dark-gray pa2" },
		div(
			{ class: "mb1" },
			button(
				{
					class: "w-25",
					onclick: () => removeLayer(layerID),
				},
				"-"
			),
			button(
				{
					class: "w-25",
					onclick: () => duplicateLayer(layerID),
				},
				"dup"
			),
			moveButton(-1, (order) => order.indexOf(layerID) === 0),
			moveButton(
				1,
				(order) => order.indexOf(layerID) === order.length - 1
			)
		),
		staticDropdown(Object.keys(TRACE_MODES).sort(), ctrls.dir, {
			label: (x) => TRACE_MODES[<TraceMode>x].label,
			attribs: {
				class: "db w-100 mb1",
				onchange: onchange("dir"),
			},
		}),
		inputColor({
			class: "db w-100 pa0 mb1",
			onchange: onchange("color"),
			value: ctrls.color,
		}),
		layerParam("min", 1, 1000, {
			disabled: ctrls.dir.map((id) => TRACE_MODES[id].points),
		}),
		layerParam("max", 1, 1000, {
			disabled: ctrls.dir.map((id) => TRACE_MODES[id].points),
		}),
		layerParam("slope", 1, 16, {
			disabled: ctrls.dir.map(
				(id) => !TRACE_MODES[id].slope || TRACE_MODES[id].points
			),
		}),
		layerParam("skip", 0, 16, {
			disabled: ctrls.dir.map((id) => !TRACE_MODES[id].skip),
		})
	);
};
