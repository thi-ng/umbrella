import { isMobile } from "@thi.ng/checks";
import { button, div, h1 } from "@thi.ng/hiccup-html";
import { MIME_IMAGE_COMMON } from "@thi.ng/mime/presets";
import { $compile, $replace } from "@thi.ng/rdom";
import {
	compileForm,
	container,
	file,
	radioStr,
	range,
	trigger,
} from "@thi.ng/rdom-forms";
import { reactive, stream, sync } from "@thi.ng/rstream";
import { float } from "@thi.ng/strings";
import { map } from "@thi.ng/transducers";
import type { SortMode } from "./api";
import { cssPalette } from "./components/css";
import { PixelCanvas } from "./components/pixelcanvas";
import { downloadACT } from "./palette";
import { postProcess, processImage } from "./process";

// stream of input files
const imgFile = stream<File>();
// images read from files
const image = stream<HTMLImageElement>();
// number of dominant colors to extract
const num = reactive(6);
// min chromacity of result colors (percent)
const minChroma = reactive(10);
// min cluster area (percent)
const minArea = reactive(0.5);
const sortMode = reactive<SortMode>("hue");
// dummy stream to retrigger updates
const update = reactive(true);

const size = (isMobile() ? 0.5 : 1) * 25;

// stream combinator & image processor
const main = sync({
	src: {
		image,
		num,
		minChroma,
		_: update,
	},
	xform: map((params) =>
		processImage(params.image, params.num, params.minChroma * 0.01)
	),
});

// final result combinator & post-analysis/filtering
const result = sync({
	src: { main, minArea, sortMode },
	xform: map(({ main: { buf, colors }, minArea, sortMode }) => ({
		buf,
		...postProcess(colors, minArea, sortMode),
	})),
});

// new values pushed into `file` will trigger reading file as an image
// once ready, puts image into `image` stream for further processing
imgFile.subscribe({
	next(file) {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			image.next(img);
			URL.revokeObjectURL(url); // house keeping!
		};
		img.src = url;
	},
});

// main UI
$compile(
	div(
		".lh-copy.f6.f5-ns",
		{},
		h1(".mh0.mb3", {}, "Dominant colors"),
		compileForm(
			container(
				{},
				file({
					attribs: { class: "mb3" },
					label: "Image",
					accept: MIME_IMAGE_COMMON,
					value: imgFile,
				}),
				range({
					label: "Max. colors",
					min: 2,
					max: 16,
					value: num,
				}),
				range({
					label: "Min. chroma",
					min: 0,
					max: 100,
					step: 5,
					value: minChroma,
				}),
				range({
					label: "Min. area",
					min: 0,
					max: 25,
					step: 0.5,
					value: minArea,
					vlabel: 1,
				}),
				radioStr({
					label: "Sort colors by:",
					items: ["hue", "luma", "area"],
					value: <any>sortMode,
				}),
				trigger({ label: false, title: "Update", value: update })
			),
			{
				wrapperAttribs: { class: "mb0" },
				labelAttribs: { class: "dib w4 v-top" },
				typeAttribs: {
					rangeLabel: { class: "dib ml3 v-top" },
					rangeWrapper: { class: "dib w5" },
					trigger: { class: "mv3" },
				},
				behaviors: { rangeLabelFmt: 0, radioLabelBefore: true },
			}
		),
		// this part of the UI will be replaced for each new processed image
		$replace(
			result.map((res) =>
				div(
					".mt3",
					{},
					cssPalette(res.colors),
					// resized image as canvas
					new PixelCanvas(res.buf),
					// swatches of dominant colors
					div(
						{},
						`hue range: ${res.hues.map(float(3)).join(" .. ")}`
					),
					// download palette button
					button(
						".db.mv3",
						{
							onclick: () =>
								downloadACT(res.colors.map((c) => c.col)),
						},
						"download .act palette"
					)
				)
			)
		)
	)
).mount(document.getElementById("app")!);
