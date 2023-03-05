import { adaptDPI } from "@thi.ng/adapt-dpi";
import type { NumericArray } from "@thi.ng/api";
import { osc, sin } from "@thi.ng/dsp";
import { canvas2d, floatBufferFromCanvas } from "@thi.ng/pixel";
import { defBlendF, drawCircle, drawLine, Shader2D } from "@thi.ng/rasterize";
import { Agent } from "./agent.js";

// create canvas and adapt to screen's DPR
const { canvas } = canvas2d(640, 640, document.body);
adaptDPI(canvas, canvas.width, canvas.height);
// pre-create image data
const data = new ImageData(canvas.width, canvas.height);
// create RGBA floating point pixel buffer for drawing
const img = floatBufferFromCanvas(canvas);

interface Brush {
	agent: Agent;
	shader: Shader2D<NumericArray>;
}

// define "brushes", each with its own agent & color blend function
// see: https://docs.thi.ng/umbrella/rasterize/modules.html#defBlendF
const brushes: Brush[] = [
	{
		agent: new Agent({
			speed: 1 / canvas.width,
		}),
		shader: defBlendF([0, 0, 0, 0.05]),
	},
	{
		agent: new Agent({
			speed: 1 / canvas.width,
			spinRadius: 0.2,
			spinSpeed: 0.02,
		}),
		shader: defBlendF([1, 0, 0.4, 0.05]),
	},
];

// create sine oscillator for brush size modulation
const radius = osc(sin, 0.002, 0.05, 0.07);

const update = () => {
	for (let i = 0; i < 10; i++) {
		brushes.forEach((b, i) => {
			const [px, py] = b.agent.pos;
			let [x, y] = b.agent.update();
			x *= canvas.width;
			y *= canvas.height;
			if (i === 0) {
				// draw 1st agent as circles with modulated radius
				drawCircle(img, x, y, radius.next() * canvas.width, b.shader);
			} else {
				// draw all other agents as line
				drawLine(
					img,
					px * canvas.width,
					py * canvas.height,
					x,
					y,
					b.shader
				);
			}
		});
	}
	// convert floating point image and apply to canvas
	img.blitCanvas(canvas, { data });
	// ∞-loop
	requestAnimationFrame(update);
};

// kick off...
update();
