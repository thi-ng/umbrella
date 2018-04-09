let PRECISION = 2;

const setPrecision = (n: number) => (PRECISION = n);

const ff = (x: number) => x.toFixed(PRECISION);

const point = (p: ArrayLike<number>) => ff(p[0]) + "," + ff(p[1]);

const points = (pts: ArrayLike<number>[], sep = " ") => pts ? pts.map(point).join(sep) : "";

export {
    ff,
    point,
    points,
    setPrecision,
}
