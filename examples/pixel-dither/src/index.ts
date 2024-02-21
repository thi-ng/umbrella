import type { IObjectOf } from "@thi.ng/api";
import {
	GRAY8,
	IntBuffer,
	canvasFromPixelBuffer,
	imageFromURL,
	intBufferFromImage,
} from "@thi.ng/pixel";
import {
	ATKINSON,
	BURKES,
	DIFFUSION_2D,
	DIFFUSION_COLUMN,
	DIFFUSION_ROW,
	FLOYD_STEINBERG,
	JARVIS_JUDICE_NINKE,
	SIERRA2,
	STUCKI,
	THRESHOLD,
	ditherWith,
	type DitherKernel,
} from "@thi.ng/pixel-dither";
import IMG from "./michelangelo.png";

const img = await imageFromURL(IMG);

const root = document.getElementById("app")!;
root.appendChild(img);

const processImage = (buf: IntBuffer, id: string, kernel: DitherKernel) => {
	const canvas = canvasFromPixelBuffer(ditherWith(kernel, buf.copy()), root);
	const ctx = canvas.getContext("2d")!;
	ctx.fillStyle = "white";
	ctx.fillRect(0, buf.height - 12, ctx.measureText(id).width + 8, 12);
	ctx.fillStyle = "red";
	ctx.fillText(id, 4, buf.height - 2);
};

const buf = intBufferFromImage(img, GRAY8);

Object.entries(<IObjectOf<DitherKernel>>{
	ATKINSON,
	BURKES,
	DIFFUSION_ROW,
	DIFFUSION_COLUMN,
	DIFFUSION_2D,
	FLOYD_STEINBERG,
	JARVIS_JUDICE_NINKE,
	SIERRA2,
	STUCKI,
	THRESHOLD,
	CUSTOM: {
		ox: [1],
		oy: [1],
		weights: [1],
		shift: 1,
	},
}).forEach(([id, k]) => processImage(buf, id, k));
