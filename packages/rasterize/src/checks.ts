import type { IGrid2D } from "@thi.ng/api";

export const isInBounds2D = (
    { size }: IGrid2D<any, any>,
    x: number,
    y: number
) => x >= 0 && x < size[0] && y >= 0 && y < size[1];
