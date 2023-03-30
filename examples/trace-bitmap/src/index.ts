import type { Predicate } from "@thi.ng/api";
import { exposeGlobal } from "@thi.ng/expose";
import {
	button,
	div,
	inputColor,
	inputFile,
	inputNumber,
	type InputFileAttribs,
	type InputNumericAttribs,
} from "@thi.ng/hiccup-html";
import { $compile, $list } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { staticDropdown } from "@thi.ng/rdom-components";
import { fromView } from "@thi.ng/rstream";
import {
	DITHER_MODES,
	TRACE_MODES,
	type DitherType,
	type ImageParam,
	type LayerParam,
	type TraceMode,
} from "./api";
import {
	DB,
	addLayer,
	duplicateLayer,
	imageSrc,
	layerOrder,
	moveLayer,
	removeLayer,
	scene,
	setBgColor,
	setImageDither,
	setImageParam,
	updateLayerParam,
} from "./state";

// setLogger(new ConsoleLogger("rs"));

// File import button UI component
const fileButton = (attribs: Partial<InputFileAttribs>, title: string) =>
	div(
		{ class: "relative overflow-hidden" },
		button(
			{ class: "dib h2 w-100 bn bg-dark-gray white" },
			inputFile({
				class: "absolute o-0",
				...attribs,
			}),
			title
		)
	);

const layerControlsForID = (layerID: string) => {
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

const imageParam = (
	id: Exclude<ImageParam, "buf" | "dither">,
	min: number,
	max: number,
	step = 0.05
) =>
	inputNumber({
		class: "dib w-25 mb1",
		min,
		max,
		step,
		placeholder: id,
		value: fromView(DB, { path: ["img", id] }),
		onchange: (e) => setImageParam(id, (<HTMLInputElement>e.target).value),
	});

$compile(
	div(
		{ class: "w-100 vh-100 flex overflow-y-hidden" },
		div(
			{
				class: "dib bg-washed-red vh-100 f7",
				style: { width: "16rem" },
			},
			div(
				{},
				fileButton(
					{
						accept: ["image/jpeg", "image/png", "image/webp"],
						onchange: (e) =>
							imageSrc.next(
								(<HTMLInputElement>e.target).files![0]
							),
					},
					"Load image"
				),
				div(
					{ class: "bg-gray white bb b--dark-gray pa2" },
					imageParam("scale", 0.1, 2),
					imageParam("gamma", 0.1, 4),
					imageParam("low", -1, 1),
					imageParam("high", 0, 2),
					staticDropdown(
						Object.keys(DITHER_MODES),
						fromView(DB, { path: ["img", "dither"] }),
						{
							attribs: {
								class: "w-100 mb1",
								onchange: (e) =>
									setImageDither(
										<DitherType>(
											(<HTMLSelectElement>e.target).value
										)
									),
							},
						}
					),
					inputColor({
						class: "w-100",
						value: fromView(DB, { path: ["bg"] }),
						onchange: (e) =>
							setBgColor((<HTMLSelectElement>e.target).value),
					})
				),
				button(
					{
						class: "dib h2 w-100 bn bg-dark-gray white",
						onclick: () => addLayer(),
					},
					"+ add layer"
				)
			),
			$list(layerOrder, "div", {}, layerControlsForID)
		),
		div(".dib", {}, $canvas(scene, [1000, 1000]))
	)
).mount(document.getElementById("app")!);

exposeGlobal("DB", DB);
