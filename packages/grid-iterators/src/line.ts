export function* line(ox: number, oy: number, ex: number, ey: number) {
    const dx = Math.abs(ex - ox);
    const dy = -Math.abs(ey - oy);

    let sx = ox < ex ? 1 : -1;
    let sy = oy < ey ? 1 : -1;
    let err = dx + dy;

    while (true) {
        yield [ox, oy];
        if (ox === ex && oy === ey) return;
        let t = err << 1;
        if (t < dx) {
            err += dx;
            oy += sy;
        }
        if (t > dy) {
            err += dy;
            ox += sx;
        }
    }
}
