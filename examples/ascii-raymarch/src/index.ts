import { fiber } from "@thi.ng/fibers";
import { GRAY8, RGB565, intBuffer } from "@thi.ng/pixel";
import { renderBuffer, rgbaRgb565 } from "@thi.ng/shader-ast-js";
import { interpolate } from "@thi.ng/strings";
import {
	BARS_H,
	BARS_V,
	SHADES_ASCII_10,
	SHADES_ASCII_16,
	SHADES_BLOCK,
	SHADES_BLOCK_ALT,
	canvas,
	formatCanvas,
	image,
	imageRawFmtOnly,
} from "@thi.ng/text-canvas";
import { FMT_HTML565 } from "@thi.ng/text-format";
import {
	benchmark,
	comp,
	cycle,
	duplicate,
	map,
	step,
} from "@thi.ng/transducers";
import { sma } from "@thi.ng/transducers-stats";
import { normalize3, rotateZ } from "@thi.ng/vectors";
import { main } from "./shader.js";

const W = 128;
const H = 48;
const SIZE = [W, H];

const HEADER = `ASCII art raymarching via thi.ng/shader-ast & thi.ng/text-canvas (fps: {0})
hotkeys: c = toggle color, t = toggle theme switch, space = toggle update\n\n`;

// pixel buffer for render
const img = intBuffer(W, H, RGB565);
// dummy buffer for non-colored mode
const solidWhite = new Uint16Array(W * H).fill(0xffff);
// text canvas setup
const textCanvas = canvas(W, H);
// canvas formatter for 16bit colors (RGB565)
const fmt = FMT_HTML565();
// DOM element (<pre>)
const el = document.getElementById("app")!;

// character selection: infinite cyclic generator changing char selection
// (theme) every 30 frames
const charSel = cycle(
	duplicate(30, [
		SHADES_ASCII_10,
		SHADES_BLOCK,
		SHADES_ASCII_16,
		BARS_H,
		BARS_V,
		SHADES_BLOCK_ALT,
	])
);

// state flags
let isColor = true;
let isUpdate = true;
let autoThemeSwitch = true;
let isRerender = false;

// main loop
fiber(function* () {
	let time = 0;
	let chars = charSel.next().value!;
	// compose FPS counter from various transducers
	let fps = step(
		comp(
			// measure time since last input
			benchmark(),
			// simple moving average (period=30)
			sma(30),
			// convert time into frequency (fsp), format
			map((x) => (1000 / x).toFixed(1))
		)
	);
	// infinite loop
	while (true) {
		if (isUpdate || isRerender) {
			if (!isRerender) time += 1 / 30;
			if (autoThemeSwitch) chars = charSel.next().value!;
			// camera position
			const eyePos = [
				Math.cos(time) * 2.5,
				Math.cos(time / 2) * 0.7,
				Math.sin(time) * 2.5,
			];
			// camera up direction
			const upDir = rotateZ(
				null,
				[0, 1, 0],
				Math.sin(time * 0.1) * (Math.PI / 3)
			);
			// normalized light direction
			const lightDir = normalize3(null, [1, 1, 0]);

			// render compiled shader to 16bit RGB565 pixel buffer
			renderBuffer(
				// this function is called for each pixel (to supply additional args)
				(frag) => main(frag, SIZE, eyePos, upDir, lightDir),
				img,
				{ fmt: rgbaRgb565 }
			);
			// convert to text
			image(textCanvas, 0, 0, W, H, img.as(GRAY8).data, { chars });
			// apply img to manipulate character colors only
			imageRawFmtOnly(
				textCanvas,
				0,
				0,
				W,
				H,
				isColor ? img.data : solidWhite
			);
			// apply to DOM
			el.innerHTML =
				interpolate(HEADER, fps(0) || "[sampling]") +
				formatCanvas(textCanvas, fmt);
			isRerender = false;
		}
		// wait for next frame
		yield;
	}
}).run();

window.addEventListener("keydown", (e) => {
	switch (e.key.toLowerCase()) {
		case "c":
			isColor = !isColor;
			isRerender = true;
			break;
		case "t":
			autoThemeSwitch = !autoThemeSwitch;
			isRerender = true;
			break;
		case " ":
			isUpdate = !isUpdate;
			break;
	}
});
