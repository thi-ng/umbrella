export const delayed =
    <T>(x: T, t: number) =>
        new Promise((resolve) => setTimeout(() => resolve(x), t));
