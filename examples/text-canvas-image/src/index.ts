import { imagePromise, intBufferFromImage, RGB565 } from "@thi.ng/pixel";
import { canvas, formatCanvas, setAt } from "@thi.ng/text-canvas";
import { FMT_HTML565 } from "@thi.ng/text-format";
import IMG from "./test.png";

// text canvas size
const W = 64;
const H = 48;

(async () => {
	const el = document.getElementById("app")!;
	const img = await imagePromise(IMG);
	const iw = img.width;
	const ih = img.height;
	// create 16bit color buffer from image
	const buf = intBufferFromImage(img, RGB565);
	// create text canvas
	const c = canvas(W, H, 0xffff);
	// define 16bit formatter
	const fmt = FMT_HTML565();
	// precalc charcode for each pixel
	const char = "▓".charCodeAt(0);

	let start = 0;

	const update = (time: number) => {
		if (!start) start = time;
		const t = (time - start) * 0.001;
		for (let y = 0; y < H; y++) {
			const v = y / H;
			for (let x = 0; x < W; x++) {
				// compute texture coordinates
				const u = x / W;
				const uu = (u + 0.1 * Math.cos(u + 20 * v - 8 * t)) * iw;
				const vv = (v + 0.1 * Math.sin(v + 20 * u + 8 * t)) * ih;
				// set pixel w/ color from image
				setAt(c, x, y, char, buf.getAt(uu, vv) || 0xffff);
			}
		}
		// format text canvas as HTML spans
		el.innerHTML = formatCanvas(c, fmt);
		requestAnimationFrame(update);
	};

	requestAnimationFrame(update);
})();
