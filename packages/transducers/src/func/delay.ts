export function delay<T>(x: T, t: number) {
    return new Promise((resolve) => setTimeout(() => resolve(x), t));
}
