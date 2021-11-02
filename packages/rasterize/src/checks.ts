import type { IGrid2D } from "@thi.ng/api";

export const isInBounds2D = (
    { width, height }: IGrid2D<any, any>,
    x: number,
    y: number
) => x >= 0 && x < width && y >= 0 && y < height;
