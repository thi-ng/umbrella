export function* hline(x: number, y: number, len: number) {
    for (const xmax = x + len; x < xmax; x++) {
        yield [x, y];
    }
}

export function* vline(x: number, y: number, len: number) {
    for (const ymax = y + len; y < ymax; y++) {
        yield [x, y];
    }
}
