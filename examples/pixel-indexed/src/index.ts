import { asInt, NUM_THEMES } from "@thi.ng/color-palettes";
import {
	ARGB8888,
	canvas2d,
	defIndexed,
	imagePromise,
	IntBuffer,
	intBufferFromImage,
	range,
} from "@thi.ng/pixel";
import { ATKINSON, ditherWith, orderedDither } from "@thi.ng/pixel-dither";
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
