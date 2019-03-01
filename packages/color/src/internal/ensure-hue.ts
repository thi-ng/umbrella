export const ensureHue = (x: number) => ((x = x % 1), x < 0 ? x + 1 : x);
