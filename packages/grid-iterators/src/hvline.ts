import { asInt } from "./utils";

export function* hline(x: number, y: number, len: number) {
    [x, y, len] = asInt(x, y, len);
    for (const xmax = x + len; x < xmax; x++) {
        yield [x, y];
    }
}

export function* vline(x: number, y: number, len: number) {
    [x, y, len] = asInt(x, y, len);
    for (const ymax = y + len; y < ymax; y++) {
        yield [x, y];
    }
}
