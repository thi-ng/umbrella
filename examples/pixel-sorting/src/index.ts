import { timed } from "@thi.ng/bench";
import { abgr32, luminanceAbgr32, sortMapped } from "@thi.ng/color";
import { div, h1 } from "@thi.ng/hiccup-html";
import { closedOpen, intersection } from "@thi.ng/intervals";
import { MIME_IMAGE_COMMON } from "@thi.ng/mime/presets";
import {
	ABGR8888,
	imageFromFile,
	intBufferFromImage,
	type IntBuffer,
} from "@thi.ng/pixel";
import { SYSTEM } from "@thi.ng/random";
import { $compile, $replace, Component, type NumOrElement } from "@thi.ng/rdom";
import {
	compileForm,
	container,
	file,
	range,
	toggle,
} from "@thi.ng/rdom-forms";
import { CloseMode, reactive, stream, sync } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";

interface ProcessParams {
	iter: number;
	horizontal: boolean;
	reverse: boolean;
	min: number;
	max: number;
}

/**
 * Takes a ABGR pixel buffer and performs randomized pixel sorting based on
 * given config options.
 *
 * @param buf -
 * @param param1 -
 */
const pixelSortBuffer = (
	buf: IntBuffer,
	{ iter, horizontal, reverse, min, max }: ProcessParams
) => {
	const { data, width, height } = buf;
	const row = closedOpen(0, width);
	const column = closedOpen(0, height);
	for (let i = iter; i-- > 0; ) {
		const num = SYSTEM.minmax(min, max) | 0;
		const n2 = num >> 1;
		// random start/pixel position in image
		const x = SYSTEM.minmax(horizontal ? -n2 : 0, width) | 0;
		const y = SYSTEM.minmax(horizontal ? 0 : -n2, height) | 0;
		// build & clamp intervals so that depending on process direction
		// we're not reading beyond RHS of selected row or bottom of selected column
		const ix = intersection(closedOpen(x, x + num), row)!;
		const iy = intersection(closedOpen(y, y + num), column)!;
		// skip if interval is empty
		if (!(ix && iy && ix.size && iy.size)) continue;
		// memory map selected pixels in either horizontal or vertical order
		// `mapBuffer()` returns an array of sRGB views of the underlying pixel buffer.
		// if vertical order, there will be `width` elements between each selected pixel
		const strip = abgr32.mapBuffer(
			// buffer to map
			data,
			// num pixels to map
			(horizontal ? ix : iy).size,
			// start index in pixel buffer
			iy.l * width + ix.l,
			// channel stride (ignored in our case)
			1,
			// pixel stride
			horizontal ? 1 : width
		);
		// now we're sorting these selected pixels in place (i.e. directly
		// within the pixel buffer) and by luminance
		sortMapped(strip, luminanceAbgr32, reverse);
		// mark sorted pixels
		// strip.forEach((x) => ((x[0] += 0.05), x.clamp()));
	}
	return buf;
};

const processImage = (img: HTMLImageElement, opts: ProcessParams) =>
	timed(() => pixelSortBuffer(intBufferFromImage(img, ABGR8888), opts));

// stream of input files
const imgFile = stream<File>();
// images read from files
const image = stream<HTMLImageElement>();

// processing params
// number of iterations
const iter = reactive(1000);
// sort slice min pixel width
const min = reactive(50);
// sort slice max pixel width
const max = reactive(200);
// sort pixels horizontally
const horizontal = reactive(true);
// sort pixels in reverse order (bright -> dark)
const reverse = reactive(false);

// stream combinator & image processor
const result = sync({
	src: {
		image,
		iter,
		horizontal,
		reverse,
		min,
		max,
	},
	closeOut: CloseMode.NEVER,
	xform: map((params) => processImage(params.image, params)),
});

// triggers reading file as an image
// once ready, puts image into `image` stream for further processing
imgFile.subscribe({
	next: async (file) => {
		image.next(await imageFromFile(file));
	},
});

// thi.ng/rdom UI component
// creates a canvas element and blits given pixel buffer into it
// when the component mounts
class PixelCanvas extends Component {
	constructor(protected buffer: IntBuffer) {
		super();
	}

	async mount(parent: Element, index?: NumOrElement) {
		const buf = this.buffer;
		this.el = this.$el(
			"canvas",
			{ width: buf.width, height: buf.height },
			null,
			parent,
			index
		);
		buf.blitCanvas(<HTMLCanvasElement>this.el);
		return this.el;
	}
}

// compile & mount main UI
$compile(
	div(
		{},
		h1({}, "Glitch my pic!"),
		compileForm(
			container(
				{ class: "mb2" },
				file({
					label: "Image",
					accept: MIME_IMAGE_COMMON,
					value: imgFile,
				}),
				range({
					label: "Iterations",
					min: 0,
					max: 50000,
					step: 1000,
					value: iter,
				}),
				range({
					label: "Min. scatter",
					min: 0,
					max: 200,
					step: 5,
					value: min,
				}),
				range({
					label: "Max. scatter",
					min: 0,
					max: 200,
					step: 5,
					value: max,
				}),
				toggle({ label: "Horizontal", value: horizontal }),
				toggle({ label: "Reverse order", value: reverse })
			),
			{
				labelAttribs: { class: "dib w4 v-top" },
				wrapperAttribs: { class: "mb2" },
				typeAttribs: {
					range: { class: "w4 w5-l" },
					rangeWrapper: { class: "dib" },
					rangeLabel: { class: "ml3 v-top" },
				},
				behaviors: { rangeLabelFmt: 0 },
			}
		),
		div({}, $replace(result.map((buf) => new PixelCanvas(buf))))
	)
).mount(document.getElementById("app")!);
