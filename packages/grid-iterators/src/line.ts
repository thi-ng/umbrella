import { asInt } from "./utils.js";

export function* line(ax: number, ay: number, bx: number, by: number) {
    [ax, ay, bx, by] = asInt(ax, ay, bx, by);
    const dx = Math.abs(bx - ax);
    const dy = -Math.abs(by - ay);
    const sx = ax < bx ? 1 : -1;
    const sy = ay < by ? 1 : -1;
    let err = dx + dy;

    while (true) {
        yield [ax, ay];
        if (ax === bx && ay === by) return;
        let t = err << 1;
        if (t < dx) {
            err += dx;
            ay += sy;
        }
        if (t > dy) {
            err += dy;
            ax += sx;
        }
    }
}
