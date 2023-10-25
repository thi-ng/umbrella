import {
	ABGR8888,
	canvas2d,
	imageFromURL,
	intBufferFromCanvas,
	intBufferFromImage,
} from "@thi.ng/pixel";
import {
	DEST_ATOP_I,
	DEST_I,
	DEST_IN_I,
	DEST_OUT_I,
	DEST_OVER_I,
	PLUS_I,
	SRC_ATOP_I,
	SRC_I,
	SRC_IN_I,
	SRC_OUT_I,
	SRC_OVER_I,
	XOR_I,
} from "@thi.ng/porter-duff";
import IMG2 from "./plus.png";
import IMG from "./ring.png";

const MODES = {
	SRC: SRC_I,
	DEST: DEST_I,
	SRC_OVER: SRC_OVER_I,
	DEST_OVER: DEST_OVER_I,
	SRC_IN: SRC_IN_I,
	DEST_IN: DEST_IN_I,
	SRC_OUT: SRC_OUT_I,
	DEST_OUT: DEST_OUT_I,
	SRC_ATOP: SRC_ATOP_I,
	DEST_ATOP: DEST_ATOP_I,
	XOR: XOR_I,
	PLUS: PLUS_I,
};

const IDS = <(keyof typeof MODES)[]>Object.keys(MODES);

Promise.all([IMG, IMG2].map((x) => imageFromURL(x)))
	.then(([circle, plus]) => {
		const srcBuf = intBufferFromImage(circle, ABGR8888).premultiply();
		const destBuf = intBufferFromImage(plus, ABGR8888).premultiply();

		const ctx = canvas2d(destBuf.width * 4, (destBuf.height + 20) * 3);
		document.getElementById("app")!.appendChild(ctx.canvas);

		const res = intBufferFromCanvas(ctx.canvas);

		for (let y = 0, i = 0; y < 3; y++) {
			for (let x = 0; x < 4; x++, i++) {
				const dx = x * destBuf.width;
				const dy = y * (destBuf.height + 20);
				destBuf.blit(res, { dx, dy });
				srcBuf.blend(MODES[IDS[i]], res, { dx, dy });
			}
		}

		res.postmultiply();
		res.blitCanvas(ctx.canvas);

		ctx.ctx.fillStyle = "black";
		ctx.ctx.font = "12px Arial";
		ctx.ctx.textAlign = "center";

		for (let y = 0, i = 0; y < 3; y++) {
			for (let x = 0; x < 4; x++, i++) {
				ctx.ctx.fillText(
					IDS[i],
					(x + 0.5) * destBuf.width,
					(y + 1) * (destBuf.height + 20) - 6
				);
			}
		}
	})
	.catch((e) => console.log(e));
