/**
 * Filters points from `src` iterable to remove any falling outside the rect
 * defined by `left,top`..`right,bottom`.
 *
 * @param src
 * @param left
 * @param top
 * @param right
 * @param bottom
 */
export function* clipped(
    src: Iterable<number[]>,
    left: number,
    top: number,
    right: number,
    bottom: number
) {
    for (let p of src) {
        if (p[0] >= left && p[0] < right && p[1] >= top && p[1] < bottom)
            yield p;
    }
}
