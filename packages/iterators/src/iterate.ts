export function* iterate<T>(fn: (x: T) => T, seed: T) {
    while (true) {
        yield seed;
        seed = fn(seed);
    }
}
