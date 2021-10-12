/** @internal */
export const __scale8bit = (x: number, shift = 0) =>
    ((x < 0 ? 0 : x > 1 ? 1 : x) * 0xff + 0.5) << shift;
