export const intersectRectCircle = (
    rx: number,
    ry: number,
    w: number,
    h: number,
    cx: number,
    cy: number,
    r: number
) =>
    (rcAxis(cx, rx, w) + rcAxis(cy, ry, h)) <= r * r;

export const intersectAABBSphere = (
    rx: number,
    ry: number,
    rz: number,
    w: number,
    h: number,
    d: number,
    cx: number,
    cy: number,
    cz: number,
    r: number
) => (
    rcAxis(cx, rx, w) +
    rcAxis(cy, ry, h) +
    rcAxis(cz, rz, d)
) <= r * r;

const rcAxis = (a: number, b: number, c: number) =>
    a < b ?
        Math.pow(a - b, 2) :
        a > b + c ?
            Math.pow(a - b - c, 2) :
            0;
