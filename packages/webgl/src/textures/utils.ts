import { swizzle8 } from "@thi.ng/binary";

export const canvas2d = (width: number, height = width) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const img = ctx.getImageData(0, 0, width, height);
    const pix = new Uint32Array(img.data.buffer);
    return {
        canvas,
        ctx,
        img,
        pix
    };
};

export const abgr = (argb: number) => swizzle8(argb, 0, 3, 1, 2);
