import { EPS, sign } from "@thi.ng/math";
import {
    clockwise2,
    distSq,
    magSq,
    ReadonlyVec,
    signedArea2
} from "@thi.ng/vectors";

export const pointInSegment2 = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    eps = EPS
) => {
    const ax = a[0];
    const ay = a[1];
    const tx = (p[0] - ax) / (b[0] - ax);
    const ty = (p[1] - ay) / (b[1] - ay);
    return Math.abs(tx - ty) <= eps && !(tx < 0 || tx > 1 || ty < 0 || ty > 1);
};

export const pointInCircle = (p: ReadonlyVec, pos: ReadonlyVec, r: number) =>
    distSq(pos, p) <= r * r;

export const pointInSphere = pointInCircle;

export const classifyPointInCircle = (
    p: ReadonlyVec,
    pos: ReadonlyVec,
    r: number,
    eps = EPS
) => sign(r * r - distSq(pos, p), eps);

export const pointInCircumCircle = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec
) =>
    magSq(a) * signedArea2(b, c, d) -
        magSq(b) * signedArea2(a, c, d) +
        magSq(c) * signedArea2(a, b, d) -
        magSq(d) * signedArea2(a, b, c) >
    0;

export const pointInTriangle2 = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec
) => {
    const s = clockwise2(a, b, c) ? 1 : -1;
    return (
        s * signedArea2(a, c, p) >= 0 &&
        s * signedArea2(b, a, p) >= 0 &&
        s * signedArea2(c, b, p) >= 0
    );
};

export const classifyPointInTriangle2 = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    eps = EPS
) => {
    const s = clockwise2(a, b, c) ? 1 : -1;
    return sign(
        Math.min(
            s * signedArea2(a, c, p),
            s * signedArea2(b, a, p),
            s * signedArea2(c, b, p)
        ),
        eps
    );
};

export const pointInPolygon2 = (p: ReadonlyVec, pts: ReadonlyVec[]) => {
    const n = pts.length - 1;
    const px = p[0];
    const py = p[1];
    let a = pts[n];
    let b = pts[0];
    let inside = 0;
    for (let i = 0; i <= n; a = b, b = pts[++i]) {
        inside = classifyPointPolyPair(px, py, a[0], a[1], b[0], b[1], inside);
    }
    return inside;
};

export const classifyPointPolyPair = (
    px: number,
    py: number,
    ax: number,
    ay: number,
    bx: number,
    by: number,
    inside: number
) =>
    ((ay < py && by >= py) || (by < py && ay >= py)) && (ax <= px || bx <= px)
        ? inside ^ (ax + ((py - ay) / (by - ay)) * (bx - ax) < px ? 1 : 0)
        : inside;

export const pointInAABB = (
    [x, y, z]: ReadonlyVec,
    pos: ReadonlyVec,
    size: ReadonlyVec
) =>
    x >= pos[0] &&
    x <= pos[0] + size[0] &&
    y >= pos[1] &&
    y <= pos[1] + size[1] &&
    z >= pos[2] &&
    z <= pos[2] + size[2];

export const pointInRect = (
    [x, y]: ReadonlyVec,
    pos: ReadonlyVec,
    size: ReadonlyVec
) =>
    x >= pos[0] &&
    x <= pos[0] + size[0] &&
    y >= pos[1] &&
    y <= pos[1] + size[1];
