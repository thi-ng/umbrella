import { div, h3, inputFile } from "@thi.ng/hiccup-html";
import { MIME_IMAGE_COMMON } from "@thi.ng/mime/presets";
import {
	FLOAT_RGB,
	IntBuffer,
	Lane,
	canvas2d,
	floatBuffer,
	imageFromFile,
	intBufferFromImage,
} from "@thi.ng/pixel";
import { $attribs, $compile, $replace, type ComponentLike } from "@thi.ng/rdom";
import { stream } from "@thi.ng/rstream";
import { normFrequencies } from "@thi.ng/transducers";

// reactive state values
const file = stream<File>();
const result = stream<ComponentLike>();

// helper function to compute the histogram of a single color channel.
// normFrequencies() returns a Map of encountered values and how
// often they occurred in the input data (normalized to given peak value)
const channelFrequencies = (img: IntBuffer, channel: Lane, peak: number) =>
	normFrequencies(peak, img.getChannel(channel).data);

// create & mount UI/DOM
$compile(
	div(
		{},
		h3({}, "Image RGB waveform"),
		inputFile(".mb3", {
			accept: MIME_IMAGE_COMMON,
			multiple: false,
			onchange: (e) => file.next((<HTMLInputElement>e.target).files![0]),
		}),
		$replace(result)
	)
).mount(document.getElementById("app")!);

// main app logic as subscription to the file stream linked to the file chooser
// in the UI. loads a the file as image, then constructs RGB waveform
file.subscribe({
	next: async (file) => {
		// load image from local file
		const img = await imageFromFile(file);
		// create pixel buffer
		let src = intBufferFromImage(img);
		// if too large, resize to fit window width
		if (src.width > window.innerWidth - 32) {
			src = src.scale((window.innerWidth - 32) / src.width, "nearest");
		}
		// floating point pixel buffer for the RGB waveform
		const wav = floatBuffer(src.width, 256, FLOAT_RGB);
		// (arbitrarily chosen) peak value for histogram normalization
		const peak = src.height / 24;
		// slit scan horizontally through the image
		for (let x = 0; x < src.width; x++) {
			// compute RGB histograms for each pixel column
			const slice = src.getRegion(x, 0, 1, src.height)!;
			const freqR = channelFrequencies(slice, Lane.RED, peak);
			const freqG = channelFrequencies(slice, Lane.GREEN, peak);
			const freqB = channelFrequencies(slice, Lane.BLUE, peak);
			// visualize histograms in the waveform image
			for (let i = 0; i < 256; i++) {
				// use .setAtUnsafe() to skip bounds test, the given pixel
				// coordinate is always valid here...
				wav.setAtUnsafe(x, 255 - i, [
					freqR.get(i) || 0,
					freqG.get(i) || 0,
					freqB.get(i) || 0,
				]);
			}
		}
		// create canvas and copy in waveform
		const { canvas } = canvas2d(wav.width, wav.height);
		wav.blitCanvas(canvas);
		// update UI with new elements
		result.next(
			div(
				{},
				div({}, canvas),
				div({}, $attribs(img, { width: src.width }))
			)
		);
	},
});
