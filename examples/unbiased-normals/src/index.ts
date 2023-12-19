import { pixelCanvas2d } from "@thi.ng/canvas";
import { sin } from "@thi.ng/dsp";
import {
	concat,
	lookAt,
	perspective,
	project3,
	rotationX44,
	rotationY44,
	viewport,
	type Mat,
} from "@thi.ng/matrices";
import { GRAY8, IntBuffer, intBufferFromCanvas } from "@thi.ng/pixel";
import { repeatedly } from "@thi.ng/transducers";
import {
	add3,
	randNorm3,
	randNormDistrib3,
	type ReadonlyVec,
} from "@thi.ng/vectors";

// create canvas & pixel buffer
const { canvas, ctx } = pixelCanvas2d(960, 540, document.body);
ctx.font = "18px Arial";
ctx.fillStyle = "yellow";

const img = intBufferFromCanvas(canvas, GRAY8);

const NUM = 25000;
const R = 110;
const OFF_L = [-R - 5, 0, 0];
const OFF_R = [R + 5, 0, 0];

// random point clouds
const points = [
	...repeatedly(
		// biased normals (left)
		() => add3(null, randNorm3([], R), OFF_L),
		NUM
	),
	...repeatedly(
		// unbiased normals (right)
		() => add3(null, randNormDistrib3([], R), OFF_R),
		NUM
	),
];

let frame = 0;

/**
 * Combines given matrices into a single Model-View-Projection matrix.
 */
const defMVP = (model: Mat, view: Mat, proj: Mat) =>
	concat([], proj, view, model);

const drawPointCloud = (
	img: IntBuffer,
	mvp: Mat,
	screen: Mat,
	points: ReadonlyVec[],
	color: number
) => {
	points.forEach((p) => {
		const screenPos = project3([], mvp, screen, p);
		screenPos && img.setAt(screenPos[0], screenPos[1], color);
	});
};

const drawLabel3D = (
	ctx: CanvasRenderingContext2D,
	mvp: Mat,
	screen: Mat,
	pos: ReadonlyVec,
	text: string
) => {
	const screenPos = project3([], mvp, screen, pos);
	screenPos && ctx.fillText(text, screenPos[0], screenPos[1]);
};

const update = () => {
	const mvp = defMVP(
		concat(
			[],
			rotationY44([], sin(frame, 0.001, Math.PI / 6)),
			rotationX44([], frame * 0.01)
		),
		lookAt([], [0, 0, 200], [0, 0, 0], [0, 1, 0]),
		perspective([], 90, img.width / img.height, 0.1, 100)
	);
	const screen = viewport([], 0, img.width - 1, img.height - 1, 0);

	img.data.fill(0);
	drawPointCloud(img, mvp, screen, points, 0xff);
	img.blitCanvas(canvas);

	drawLabel3D(ctx, mvp, screen, OFF_L, "biased");
	drawLabel3D(ctx, mvp, screen, OFF_R, "UNbiased");

	frame++;
};

setInterval(update, 16);
