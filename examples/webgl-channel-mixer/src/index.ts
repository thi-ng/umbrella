import {
	button,
	div,
	h4,
	inputFile,
	main,
	type InputFileAttribs,
} from "@thi.ng/hiccup-html";
import { MIME_IMAGE_COMMON } from "@thi.ng/mime/presets";
import { $compile, $inputTrigger } from "@thi.ng/rdom";
import { inputVectorCoord, staticDropdown } from "@thi.ng/rdom-components";
import { Stream, reactive, stream, sync } from "@thi.ng/rstream";
import { map, range } from "@thi.ng/transducers";
import { DEFAULT_B, DEFAULT_G, DEFAULT_R, STYLE_BT, type Vec2 } from "./api";
import { WebGLImageCanvas } from "./canvas";
import {
	PRESETS,
	downloadPreset,
	setPresetFromID,
	setPresetFromObj,
} from "./presets";

// reactive state variables
const src = stream<File>();
const image = stream<HTMLImageElement>();
const download = reactive(false);
const controls = {
	r: reactive(DEFAULT_R),
	g: reactive(DEFAULT_G),
	b: reactive(DEFAULT_B),
	exposure: reactive<Vec2>([0, 0]),
};

// subscribe to File stream, load as image and place result into the image
// stream which the editor component is subscribed to (see further below)
src.subscribe({
	next(file) {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			image.next(img);
			URL.revokeObjectURL(url);
		};
		img.src = url;
	},
});

// stream of preset ID changes
const preset = stream<string>();
// add subscription to apply new preset
preset.subscribe({ next: (id) => setPresetFromID(controls, id) });

// File import button UI component
const fileButton = (attribs: Partial<InputFileAttribs>, title: string) =>
	div(
		"relative.overflow-hidden",
		{},
		button(
			STYLE_BT,
			{},
			inputFile({
				class: "absolute o-0",
				...attribs,
			}),
			title
		)
	);

/**
 * Creates reactive component tree of all controls for a single color channel.
 *
 * @remarks
 * Generates a slider input for each color channel using a numeric input
 * component from the thi.ng/rdom-components package
 *
 * @param ctrl
 * @param name
 */
const channelControls = <T extends number[]>(
	ctrl: Stream<T>,
	size: number,
	name: string
) =>
	div(
		{},
		h4(".fw4.mv1", {}, name),
		...map(
			(i: number) =>
				inputVectorCoord(size, i, <Stream<any>>ctrl, {
					type: "range",
					class: "w-100 range",
					min: -1,
					max: 1,
					step: 0.01,
				}),
			range(size)
		)
	);

// compile & mount the entire UI component tree
$compile(
	main(
		{},
		// side bar
		div(
			".vh-100.bg-near-black.white.pa2.f7",
			{},
			fileButton(
				{
					accept: MIME_IMAGE_COMMON,
					onchange: (e) =>
						src.next((<HTMLInputElement>e.target).files![0]),
				},
				"Load image"
			),
			div(".mb1"),
			fileButton(
				{
					accept: ["application/json"],
					onchange: (e) => {
						const reader = new FileReader();
						reader.onload = (e) =>
							setPresetFromObj(
								controls,
								JSON.parse(<string>e.target!.result)
							);
						reader.readAsText(
							(<HTMLInputElement>e.target).files![0]
						);
					},
				},
				"Load preset"
			),
			staticDropdown(["Presets", ...Object.keys(PRESETS)], preset, {
				attribs: { class: "db w-100 mv2" },
			}),
			channelControls(controls.r, 4, "Red"),
			channelControls(controls.g, 4, "Green"),
			channelControls(controls.b, 4, "Blue"),
			channelControls(controls.exposure, 2, "Exposure"),
			button(
				STYLE_BT + ".mt2",
				{
					onclick: () => setPresetFromID(controls, "<default>"),
				},
				"Reset controls"
			),
			button(
				STYLE_BT + ".mt1",
				{
					onclick: () => downloadPreset(controls),
				},
				"Download preset"
			),
			button(
				STYLE_BT + ".mt1",
				{
					onclick: $inputTrigger(download),
				},
				"Download JPEG"
			)
		),
		// image canvas
		new WebGLImageCanvas(image, sync({ src: controls }), download)
	)
).mount(document.body);
