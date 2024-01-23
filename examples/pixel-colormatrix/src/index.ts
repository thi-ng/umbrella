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
import { canvas, div, h3 } from "@thi.ng/hiccup-html";
import { FLOAT_RGBA, floatBufferFromImage, imageFromURL } from "@thi.ng/pixel";
import { $compile } from "@thi.ng/rdom";
import { compileForm, container, range } from "@thi.ng/rdom-forms";
import { reactive, sync, type ISubscription } from "@thi.ng/rstream";
import IMG from "./dolomites-960x940.jpg";
import { percent } from "@thi.ng/strings";

// image adjustment params
const saturation = reactive(1);
const contrast = reactive(1);
const brightness = reactive(0);
const exposure = reactive(1);
// color temperature (blue/yellow and green/magenta)
const tempBY = reactive(0);
const tempGM = reactive(0);
// preview A/B split position
const split = reactive(0);

// UI slider widget for a single image param
const ctrl = (
	label: string,
	value: ISubscription<number, number>,
	min: number,
	max: number
) =>
	range({
		label,
		min,
		max,
		step: 0.01,
		list: [(min + max) / 2], // create a tick mark for center position
		value,
	});

// iterator to segment a typed array buffer into vector views of `size`
function* mapBuffer(buf: TypedArray, size: number, stride = size) {
	for (let i = 0; i < buf.length; i += stride) {
		yield buf.subarray(i, i + size);
	}
}

// extract local X position from mouse event and update split pos (for A/B comparison)
const setSplitPos = (e: MouseEvent) =>
	split.next(
		e.clientX - (<HTMLElement>e.target).getBoundingClientRect().left
	);

// main app init

// create floating point pixel buffer from image
const srcImg = floatBufferFromImage(await imageFromURL(IMG), FLOAT_RGBA);
// create working copy
const destImg = srcImg.copy();
// pre-create vectors views for each pixel in both src & dest images
// this helps performance & avoids any other additional memory allocations
const srcPixels = [...mapBuffer(srcImg.data, 4)];
const destPixels = [...mapBuffer(destImg.data, 4)];

// create UI/DOM
await $compile(
	div(
		{},
		h3(".mb3", {}, "Matrix-based image color adjustments"),
		compileForm(
			container(
				{ class: "mb3" },
				ctrl("exposure", exposure, 0, 2),
				ctrl("brightness", brightness, -0.25, 0.25),
				ctrl("contrast", contrast, 0, 2),
				ctrl("saturation", saturation, 0, 2),
				ctrl("temp (blue/yellow)", tempBY, -0.25, 0.25),
				ctrl("temp (green/magenta)", tempGM, -0.25, 0.25)
			),
			{
				labelAttribs: { class: "dib w5 v-top" },
				typeAttribs: {
					range: { class: "dib w4 w5-l" },
					rangeLabel: { class: "ml3 v-top" },
					rangeWrapper: { class: "dib" },
				},
				behaviors: {
					rangeLabelFmt: percent(0),
				},
			}
		),
		canvas("#preview.pointer", {
			width: srcImg.width,
			height: srcImg.height,
			title: "Click & drag to set split position",
			onmousedown: setSplitPos,
			onmousemove: (e) => {
				if (e.buttons & 1) setSplitPos(e);
			},
		})
	)
).mount(document.getElementById("app")!);
// keep reference to the preview canvas
const preview = <HTMLCanvasElement>document.getElementById("preview");

// initialize split display position to 50% (for A/B comparison)
split.next(srcImg.width >> 1);

// combine reactive image params, transform image whenever any param changes
// and return tuple of [src image, result image]
const images = sync({
	src: { exposure, brightness, contrast, saturation, tempBY, tempGM },
}).map(({ exposure, brightness, contrast, saturation, tempBY, tempGM }) => {
	// compose color transformation matrix from multiple adjustments
	const mat = concat(
		// color temperature (relative, 0.0 = original)
		temperatureMat(tempBY, tempGM),
		// saturation (absolute, 1.0 = original)
		saturationMat(saturation),
		// contrast (absolute, 1.0 = original)
		contrastMat(contrast),
		// brightness offset (relative, 0.0 = original)
		brightnessMat(brightness),
		// exposure/scale (absolute, 1.0 = original)
		exposureMat(exposure)
	);
	// transform pixels using above matrix
	for (let i = 0, n = srcPixels.length; i < n; i++) {
		transform(destPixels[i], mat, srcPixels[i], false);
	}
	// return tuple of images
	return [srcImg, destImg];
});

// combine transformed result with split pos and copy images to canvas (with
// A/B region split). we keep this as a separate processing step so that
// when only the split position is changed, we DON'T needlessly recompute
// the transformed image...
sync({ src: { images, split } }).subscribe({
	next({ images: [src, dest], split }) {
		// show transformed on the LHS
		dest.getRegion(0, 0, split, dest.height)?.blitCanvas(preview);
		// show original on the RHS
		src.getRegion(split, 0, src.width - split, src.height)?.blitCanvas(
			preview,
			{ x: split }
		);
	},
});
