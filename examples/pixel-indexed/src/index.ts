import { asInt } from "@thi.ng/color-palettes";
import { srgbIntArgb32 } from "@thi.ng/color/srgb/srgb-int";
import { orderedDither } from "@thi.ng/pixel-dither/ordered";
import { canvas2d, imagePromise } from "@thi.ng/pixel/canvas";
import { dominantColors } from "@thi.ng/pixel/dominant-colors";
import { floatBuffer } from "@thi.ng/pixel/float";
import { ARGB8888 } from "@thi.ng/pixel/format/argb8888";
import { FLOAT_RGB } from "@thi.ng/pixel/format/float-rgb";
import { defIndexed } from "@thi.ng/pixel/format/indexed";
import { IntBuffer, intBufferFromImage } from "@thi.ng/pixel/int";
import IMG from "./test.jpg";

(async () => {
	const img = await imagePromise(IMG);

	const root = document.getElementById("app")!;
	root.appendChild(img);

	const processImage = (buf: IntBuffer, palette: number[]) =>
		orderedDither(buf.copy(), 8, 3)
			.as(defIndexed(palette))
			.blitCanvas(canvas2d(buf.width, buf.height, root).canvas);

	// dither image and convert to indexed color using given palette
	const buf = intBufferFromImage(img, ARGB8888);

	// extract palette from image and use it
	// to create indexed color version
	processImage(
		buf,
		dominantColors(floatBuffer(buf.scale(1 / 4), FLOAT_RGB), 6).map((c) =>
			srgbIntArgb32(c.color)
		)
	);

	// another version using a preset palette
	// see https://github.com/thi-ng/umbrella/tree/develop/packages/color-palettes#all-themes
	processImage(buf, asInt(50));
})();
