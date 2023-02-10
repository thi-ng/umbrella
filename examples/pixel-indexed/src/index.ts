import { asInt, NUM_THEMES } from "@thi.ng/color-palettes";
import { ATKINSON, ditherWith } from "@thi.ng/pixel-dither";
import { orderedDither } from "@thi.ng/pixel-dither/ordered";
import { canvas2d, imagePromise } from "@thi.ng/pixel/canvas";
import { ARGB8888 } from "@thi.ng/pixel/format/argb8888";
import { defIndexed } from "@thi.ng/pixel/format/indexed";
import { IntBuffer, intBufferFromImage } from "@thi.ng/pixel/int";
import { range } from "@thi.ng/pixel/range";
import IMG from "./test.jpg";

const ORDERED = false;

(async () => {
	const img = await imagePromise(IMG);

	const root = document.getElementById("app")!;
	root.appendChild(img);

	const processImage = (buf: IntBuffer, id: number) => {
		const { canvas, ctx } = canvas2d(buf.width, buf.height, root);
		const theme = asInt(id);
		const dithered = ORDERED
			? orderedDither(buf.copy(), 8, 3)
			: ditherWith(ATKINSON, buf.copy(), {});
		dithered.as(defIndexed(theme)).blitCanvas(canvas);
		ctx.font = "14px sans-serif";
		ctx.fillText("theme: " + id, 10, 20);
	};

	// dither image and convert to indexed color using given palette
	const buf = intBufferFromImage(img, ARGB8888).scale(0.5, "cubic");

	// extract palette from image and use it
	// to create indexed color version
	// processImage(
	// 	buf,
	// 	dominantColors(floatBuffer(buf.scale(1 / 4), FLOAT_RGB), 6).map((c) =>
	// 		srgbIntArgb32(c.color)
	// 	)
	// );

	// another version using a preset palette
	// see https://github.com/thi-ng/umbrella/tree/develop/packages/color-palettes#all-themes
	const themes = range(NUM_THEMES);
	const addImage = () => {
		const next = themes.next();
		if (next.value !== undefined) {
			processImage(buf, next.value);
			setTimeout(addImage, 16);
		}
	};
	addImage();
})();
