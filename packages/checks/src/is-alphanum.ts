export const isAlpha = (x: string) => /^[a-z]+$/i.test(x);

export const isAlphaNum = (x: string) => /^[a-z0-9]+$/i.test(x);

export const isNumeric = (x: string) => /^[0-9]+$/.test(x);
