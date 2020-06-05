import type { IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

export const image = (
    ctx: CanvasRenderingContext2D,
    _: IObjectOf<any>,
    { width, height }: IObjectOf<any>,
    img: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
    dpos: ReadonlyVec,
    spos?: ReadonlyVec,
    ssize?: ReadonlyVec
) => {
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
