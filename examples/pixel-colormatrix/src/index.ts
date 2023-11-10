import type { TypedArray } from "@thi.ng/api";
import {
	brightnessMat,
	concat,
	contrastMat,
	exposureMat,
	saturationMat,
	temperatureMat,
	transform,
} from "@thi.ng/color";
import { canvas, div, h3, inputRange, label } from "@thi.ng/hiccup-html";
import { FLOAT_RGBA, floatBufferFromImage, imageFromURL } from "@thi.ng/pixel";
import { $compile, $inputNum } from "@thi.ng/rdom";
import { reactive, sync, type ISubscription } from "@thi.ng/rstream";
import IMG from "./dolomites-960x940.jpg";

// image adjustment params
const temp = reactive(0);
const sat = reactive(1);
const con = reactive(1);
const bri = reactive(0);
const exp = reactive(1);

// UI widgets for a single image param
const ctrl = (
	id: string,
	value: ISubscription<number, number>,
	min: number,
	max: number
) =>
	div(
		{},
		label(".w4.dib", { for: id }, id),
		inputRange(".w4", {
			id,
			min,
			max,
			step: 0.01,
			value,
			oninput: $inputNum(value),
		})
	);

// iterator to segment a typed array buffer into vector views of `size`
function* segmented(buf: TypedArray, size: number, stride = size) {
	for (let i = 0; i < buf.length; i += stride) {
		yield buf.subarray(i, i + size);
	}
}

// main app init
(async () => {
	// create floating point pixel buffer from image
	const srcImg = floatBufferFromImage(await imageFromURL(IMG), FLOAT_RGBA);
	// create working copy
	const destImg = srcImg.copy();
	// pre-create vectors views for each pixel in both src & dest images
	// this helps performance & avoids any other additional memory allocations
	const srcPixels = [...segmented(srcImg.data, 4)];
	const destPixels = [...segmented(destImg.data, 4)];

	// create UI/DOM
	await $compile(
		div(
			{},
			h3(".mb3", {}, "Matrix-based image color adjustments"),
			div(
				".mb3",
				{},
				// UI controls for various image adjustments
				ctrl("exposure", exp, 0, 2),
				ctrl("brightness", bri, -0.5, 0.5),
				ctrl("contrast", con, 0, 2),
				ctrl("saturation", sat, 0, 2),
				ctrl("temperature", temp, -0.25, 0.25)
			),
			canvas({
				id: "preview",
				width: srcImg.width,
				height: srcImg.height,
			})
		)
	).mount(document.getElementById("app")!);
	// keep reference to the preview canvas
	const preview = <HTMLCanvasElement>document.getElementById("preview");

	// combine reactive image params, add subscription to transform image and
	// copy result to canvas
	sync({ src: { exp, bri, con, sat, temp } }).subscribe({
		next({ exp, bri, con, sat, temp }) {
			// compose color transformation matrix from multiple adjustments
			const mat = concat(
				// color temperature (relative, 0.0 = original)
				temperatureMat(temp),
				// saturation (absolute, 1.0 = original)
				saturationMat(sat),
				// contrast (absolute, 1.0 = original)
				contrastMat(con),
				// brightness offset (relative, 0.0 = original)
				brightnessMat(bri),
				// exposure/scale (absolute, 1.0 = original)
				exposureMat(exp)
			);

			// transform pixels using above matrix
			for (let i = 0, n = srcPixels.length; i < n; i++) {
				transform(destPixels[i], mat, srcPixels[i], false);
			}
			// copy result image to canvas
			destImg.blitCanvas(preview);
		},
	});
})();
