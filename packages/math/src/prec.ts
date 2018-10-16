/**
 * Returns `a - b * floor(a/b)`
 *
 * @param a
 * @param b
 */
export const fmod = (a: number, b: number) =>
    a - b * Math.floor(a / b);

export const fract = (x: number) =>
    x - Math.floor(x);

export const trunc = (x: number) =>
    x < 0 ? Math.ceil(x) : Math.floor(x);

export const roundTo = (x: number, prec = 1) =>
    Math.round(x / prec) * prec;
