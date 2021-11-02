// thing:no-export
/**
 * Swaps XY in-place.
 *
 * @param p
 *
 * @internal
 */
export const swapxy = (p: number[]) => {
    const t = p[0];
    p[0] = p[1];
    p[1] = t;
    return p;
};
