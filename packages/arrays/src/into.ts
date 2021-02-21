/**
 * Appends `max` items (default: all) from `src` iterable to `dest` array.
 * Returns `dest`.
 *
 * @param dest
 * @param src
 * @param max
 */
export const into = <T>(dest: T[], src: Iterable<T>, max = Infinity) => {
    for (let x of src) {
        if (--max < 0) break;
        dest.push(x);
    }
    return dest;
};
