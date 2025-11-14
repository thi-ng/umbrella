// SPDX-License-Identifier: Apache-2.0
import { timedResult } from "@thi.ng/bench";
import { pixelCanvas2d, type CanvasContext } from "@thi.ng/canvas";
import { button, div, inputFile, main } from "@thi.ng/hiccup-html";
import { GRAY8, IntBuffer, intBuffer } from "@thi.ng/pixel";
import { OpticalFlow } from "@thi.ng/pixel-flow";
import { $attribs, $compile, $wrapEl } from "@thi.ng/rdom";
import { step, type StepFn } from "@thi.ng/transducers";
import { donchian } from "@thi.ng/transducers-stats";
import { mag2, magSq2, normalize2, perpendicularCCW } from "@thi.ng/vectors";

const W = 640;
const H = 480;

class OpticalFlowViz {
	video: HTMLVideoElement;
	flow!: OpticalFlow<IntBuffer>;
	flowCanvas: CanvasContext;
	frameCanvas!: CanvasContext;
	frameBuffer!: IntBuffer;
	prevFrame!: IntBuffer;
	scale!: number;
	movement: StepFn<number, [number, number]>;

	constructor() {
		this.video = document.createElement("video");
		this.video.muted = true;
		this.video.loop = true;
		this.video.controls = true;
		this.flowCanvas = pixelCanvas2d(1, 1);
		// step-wise transducer to record min/max movement in a sliding time window
		this.movement = step(donchian(60));
	}

	start(width: number, height: number, scale = 1) {
		const vw = (this.video.width = (width / scale) | 0);
		const vh = (this.video.height = (height / scale) | 0);
		document.getElementById("panels")!.appendChild(this.video);
		this.scale = scale;
		this.frameBuffer = intBuffer(vw, vh, GRAY8);
		this.prevFrame = intBuffer(vw, vh, GRAY8);
		this.frameCanvas = pixelCanvas2d(vw, vh);
		this.flow = new OpticalFlow(this.grabFrame(), {
			smooth: 0.25,
			threshold: 0.001,
			// windowSize: 3,
			// windowStep: 1,
			mode: "max",
		});
		$attribs(this.flowCanvas.canvas, { width: vw, height: vh });
		this.updateFlow();
	}

	updateFlow() {
		const currFrame = this.grabFrame();
		const [
			{
				data: cells,
				shape: [height, width],
				dir,
			},
			t,
		] = timedResult(() => this.flow.update(currFrame));
		const ctx = this.flowCanvas.ctx;
		ctx.drawImage(this.frameCanvas.canvas, 0, 0);
		ctx.strokeStyle = "#00f";
		ctx.lineWidth = 1 / this.scale;
		const scale = this.flow.step;
		ctx.font = `12px Arial`;
		const amp = 32;
		for (let y = 0, i = 0; y < height; y++) {
			for (let x = 0; x < width; x++, i += 2) {
				const cell = [cells[i], cells[i + 1]];
				if (magSq2(cell) < 0.01) continue;
				ctx.beginPath();
				const sx = x * scale + this.flow.margin;
				const sy = y * scale + this.flow.margin;
				const [cx, cy] = cell;
				const [nx, ny] = normalize2(
					null,
					perpendicularCCW([], cell),
					2
				);
				ctx.moveTo(sx + nx, sy + ny);
				ctx.lineTo(sx + cx * amp, sy + cy * amp);
				ctx.lineTo(sx - nx, sy - ny);
				ctx.stroke();
				// if ((x & 1) != (y & 1)) {
				// 	ctx.fillText(`${cx.toFixed(1)},${cy.toFixed(1)}`, sx, sy);
				// }
			}
		}
		// compute overall movement
		const delta = mag2(dir);
		// update min/max
		const bounds = this.movement(delta);
		ctx.fillStyle = "#000";
		ctx.fillText(`movement: ${delta.toFixed(2)} t: ${t | 0}`, 10, 20);
		if (bounds) {
			const [min, max] = <number[]>bounds;
			ctx.fillText(
				`min: ${min.toFixed(2)} max: ${max.toFixed(2)}`,
				10,
				32
			);
		}
		// draw summed movment vector
		const w2 = this.video.width / 2;
		const h2 = this.video.height / 2;
		ctx.strokeStyle = "#f00";
		ctx.lineWidth = 8 / this.scale;
		ctx.beginPath();
		ctx.moveTo(w2, h2);
		ctx.lineTo(dir[0] * 1000 + w2, dir[1] * 1000 + h2);
		ctx.stroke();

		requestAnimationFrame(this.updateFlow.bind(this));
	}

	grabFrame() {
		const { width, height } = this.video;
		this.frameCanvas.ctx.drawImage(this.video, 0, 0, width, height);
		return this.frameBuffer.setImageData(
			this.frameCanvas.ctx.getImageData(0, 0, width, height)
		);
	}
}

const startCamera = async () => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: { width: { ideal: W }, height: { ideal: H } },
		});
		let scale = 1;
		const settings = stream.getVideoTracks()[0].getSettings();
		while (settings.width! / scale > W || settings.height! / scale > H)
			scale *= 2;
		APP.video.srcObject = stream;
		APP.video.addEventListener("loadedmetadata", () => {
			APP.video.play();
			APP.start(settings.width!, settings.height!, scale);
		});
		document.getElementById("inputs")?.remove();
	} catch (e) {
		alert(e);
	}
};

const startVideoFile = (e: InputEvent) => {
	const source = document.createElement("source");
	source.src = URL.createObjectURL((<HTMLInputElement>e.target).files![0]);
	APP.video.appendChild(source);
	APP.video.load();
	APP.video.play();
	APP.video.addEventListener("loadedmetadata", () => {
		const width = APP.video.videoWidth;
		const height = APP.video.videoHeight;
		let scale = 1;
		while (width! / scale > W || height / scale > H) scale *= 2;
		APP.start(width, height, scale);
	});
	document.getElementById("inputs")?.remove();
};

const APP = new OpticalFlowViz();

$compile(
	div(
		{},
		div(
			"#inputs",
			{},
			button({ onclick: startCamera }, "start camera"),
			inputFile({ onchange: startVideoFile, accept: "video/*" })
		),
		main("#panels", {}, $wrapEl(APP.flowCanvas.canvas))
	)
).mount(document.getElementById("app")!);
