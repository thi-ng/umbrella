export const testRectRect =
    (ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) =>
        !((ax > bx + bw) ||
            (bx > ax + aw) ||
            (ay > by + bh) ||
            (by > ay + ah));
