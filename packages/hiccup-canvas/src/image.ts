import type { IObjectOf } from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { IToImageData } from "@thi.ng/pixel";
import type { ReadonlyVec } from "@thi.ng/vectors";

export const image = (
	ctx: CanvasRenderingContext2D,
	_: IObjectOf<any>,
	{ width, height }: IObjectOf<any>,
	img:
		| HTMLImageElement
		| HTMLCanvasElement
		| HTMLVideoElement
		| ImageBitmap
		| ImageData
		| IToImageData,
	dpos: ReadonlyVec,
	spos?: ReadonlyVec,
	ssize?: ReadonlyVec
) => {
	if (implementsFunction(img, "toImageData")) {
		img = img.toImageData();
	}
	if (img instanceof ImageData) {
		ctx.putImageData(img, dpos[0], dpos[1]);
		return;
	}
	width = width || img.width;
	height = height || img.height;
	spos
		? ctx.drawImage(
				img,
				spos[0],
				spos[1],
				ssize ? ssize[0] : width,
				ssize ? ssize[1] : height,
				dpos[0],
				dpos[1],
				width,
				height
		  )
		: ctx.drawImage(img, dpos[0], dpos[1], width, height);
};
