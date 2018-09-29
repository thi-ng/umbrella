import { Vec2 } from "@thi.ng/vectors/vec2";

export const circumCenter = (a: Readonly<Vec2>, b: Readonly<Vec2>, c: Readonly<Vec2>) => {
    let m1, m2, mx1, mx2, my1, my2, xc, yc;
    const deltaAB = Math.abs(a.y - b.y),
        deltaBC = Math.abs(b.y - c.y);

    if (deltaAB < 1e-6 && deltaBC < 1e-6) {
        return null;
    }
    const ax = a.x, ay = a.y,
        bx = b.x, by = b.y,
        cx = c.x, cy = c.y;
    if (deltaAB < 1e-6) {
        m2 = - (cx - bx) / (cy - by);
        mx2 = (bx + cx) / 2;
        my2 = (by + cy) / 2;
        xc = (bx + ax) / 2;
        yc = m2 * (xc - mx2) + my2;
    } else if (deltaBC < 1e-6) {
        m1 = - (bx - ax) / (by - ay);
        mx1 = (ax + bx) / 2;
        my1 = (ay + by) / 2;
        xc = (cx + bx) / 2;
        yc = m1 * (xc - mx1) + my1;
    } else {
        m1 = - (bx - ax) / (by - ay);
        m2 = - (cx - bx) / (cy - by);
        mx1 = (ax + bx) / 2;
        my1 = (ay + by) / 2;
        mx2 = (bx + cx) / 2;
        my2 = (by + cy) / 2;
        xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
        if (deltaAB > deltaBC) {
            yc = m1 * (xc - mx1) + my1;
        } else {
            yc = m2 * (xc - mx2) + my2;
        }
    }
    return new Vec2(xc, yc);
}
